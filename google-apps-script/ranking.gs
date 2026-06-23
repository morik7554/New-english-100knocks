const OVERALL_RAW_SHEET_NAME = 'overall_ranking';
const COURSE_RAW_SHEET_NAME = 'course_ranking';
const OVERALL_CACHE_SHEET_NAME = 'overall_top_cache';
const COURSE_CACHE_SHEET_NAME = 'course_top_cache';
const OVERALL_LIMIT = 50;
const COURSE_LIMIT = 30;
const ADMIN_TOKEN_PROPERTY = 'ADMIN_TOKEN';
const DEFAULT_ADMIN_PASSWORD = '4761';

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const mode = String(params.mode || 'overall');

  if (mode === 'overall') {
    const limit = clampLimit_(params.limit, OVERALL_LIMIT);
    const entries = getOverallCacheEntries_(limit);
    return jsonOutput_({ ok: true, entries: entries });
  }

  if (mode === 'course') {
    const courseId = String(params.courseId || '').trim();
    if (!courseId) {
      return jsonOutput_({ ok: false, message: 'courseId is required' });
    }
    const limit = clampLimit_(params.limit, COURSE_LIMIT);
    const entries = getCourseCacheEntries_(courseId, limit);
    return jsonOutput_({ ok: true, entries: entries });
  }

  if (mode === 'adminOverall') {
    if (!isValidAdminToken_(params.adminToken)) {
      return jsonOutput_({ ok: false, message: 'invalid admin token' });
    }
    const limit = clampLimit_(params.limit, OVERALL_LIMIT);
    return jsonOutput_({ ok: true, entries: getOverallRawEntries_().slice(0, limit) });
  }

  if (mode === 'adminCourse') {
    if (!isValidAdminToken_(params.adminToken)) {
      return jsonOutput_({ ok: false, message: 'invalid admin token' });
    }
    const courseId = String(params.courseId || '').trim();
    if (!courseId) {
      return jsonOutput_({ ok: false, message: 'courseId is required' });
    }
    const limit = clampLimit_(params.limit, COURSE_LIMIT);
    return jsonOutput_({ ok: true, entries: getCourseRawEntriesByCourseId_(courseId).slice(0, limit) });
  }

  return jsonOutput_({ ok: false, message: 'unsupported mode' });
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (String(payload.action || '') === 'deletePlayer') {
      if (!isValidAdminToken_(payload.adminToken)) {
        return jsonOutput_({ ok: false, message: 'invalid admin token' });
      }
      const anonymousIdToDelete = String(payload.anonymousId || '').trim();
      if (!anonymousIdToDelete) {
        return jsonOutput_({ ok: false, message: 'anonymousId is required' });
      }
      deletePlayer_(anonymousIdToDelete);
      return jsonOutput_({ ok: true });
    }

    const anonymousId = String(payload.anonymousId || '').trim();
    const nickname = String(payload.nickname || 'Player').trim().slice(0, 20);
    const totalScore = Number(payload.totalScore || 0);
    const rankTitle = String(payload.rankTitle || '').trim().slice(0, 40);
    const lastPlayedCourse = String(payload.lastPlayedCourse || '').trim().slice(0, 60);
    const updatedAt = String(payload.updatedAt || new Date().toISOString()).trim();
    const courseBestScores = Array.isArray(payload.courseBestScores) ? payload.courseBestScores : [];

    if (!anonymousId || !Number.isFinite(totalScore) || totalScore < 0) {
      return jsonOutput_({ ok: false, message: 'invalid payload' });
    }
    const nicknameError = validateNickname_(nickname);
    if (nicknameError) {
      return jsonOutput_({ ok: false, message: nicknameError });
    }

    upsertOverallRawRow_({
      anonymousId: anonymousId,
      nickname: nickname || 'Player',
      totalScore: totalScore,
      rankTitle: rankTitle,
      lastPlayedCourse: lastPlayedCourse,
      updatedAt: updatedAt
    });

    const touchedCourseIds = upsertCourseRawRows_(anonymousId, nickname || 'Player', updatedAt, courseBestScores);

    rebuildOverallCache_();
    rebuildCourseCacheForIds_(touchedCourseIds);

    return jsonOutput_({ ok: true });
  } catch (error) {
    return jsonOutput_({ ok: false, message: error.message });
  }
}

function clampLimit_(value, maxValue) {
  const num = Number(value || maxValue);
  if (!Number.isFinite(num) || num <= 0) return maxValue;
  return Math.min(num, maxValue);
}

function isValidAdminToken_(token) {
  const expected = PropertiesService.getScriptProperties().getProperty(ADMIN_TOKEN_PROPERTY);
  const actual = String(token || '').trim();
  if (expected) {
    return actual === String(expected).trim();
  }
  return actual === DEFAULT_ADMIN_PASSWORD;
}

function validateNickname_(nickname) {
  const value = String(nickname || '').trim();
  if (value.length < 2) return 'nickname too short';
  if (value.length > 12) return 'nickname too long';

  const bannedPatterns = [
    /死ね/i,
    /しね/i,
    /sex/i,
    /sexy/i,
    /ちんこ/i,
    /まんこ/i,
    /おっぱい/i,
    /fuck/i,
    /shit/i,
    /bitch/i
  ];
  const personalInfoPatterns = [
    /@/,
    /https?:\/\//i,
    /\d{7,}/,
    /学校|小学校|中学校|高校|大学|クラス|組|出席番号|電話|line|インスタ|instagram|tiktok|住所|本名/i
  ];

  if (bannedPatterns.some(function(pattern) { return pattern.test(value); })) {
    return 'inappropriate nickname';
  }
  if (personalInfoPatterns.some(function(pattern) { return pattern.test(value); })) {
    return 'personal information is not allowed';
  }
  return '';
}

function getSheet_(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
  }
  return sheet;
}

function getOverallRawSheet_() {
  return getSheet_(OVERALL_RAW_SHEET_NAME, ['anonymousId', 'nickname', 'totalScore', 'rankTitle', 'lastPlayedCourse', 'updatedAt']);
}

function getCourseRawSheet_() {
  return getSheet_(COURSE_RAW_SHEET_NAME, ['entryKey', 'anonymousId', 'nickname', 'courseId', 'grade', 'category', 'bestScore', 'updatedAt']);
}

function getOverallCacheSheet_() {
  return getSheet_(OVERALL_CACHE_SHEET_NAME, ['anonymousId', 'nickname', 'totalScore', 'rankTitle', 'lastPlayedCourse', 'updatedAt']);
}

function getCourseCacheSheet_() {
  return getSheet_(COURSE_CACHE_SHEET_NAME, ['courseId', 'anonymousId', 'nickname', 'grade', 'category', 'bestScore', 'updatedAt']);
}

function upsertOverallRawRow_(entry) {
  const sheet = getOverallRawSheet_();
  const lastRow = sheet.getLastRow();
  const values = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 6).getValues() : [];
  let targetRow = -1;

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === entry.anonymousId) {
      targetRow = i + 2;
      break;
    }
  }

  const row = [
    entry.anonymousId,
    entry.nickname,
    entry.totalScore,
    entry.rankTitle,
    entry.lastPlayedCourse,
    entry.updatedAt
  ];

  if (targetRow === -1) {
    sheet.appendRow(row);
    return;
  }

  const currentScore = Number(sheet.getRange(targetRow, 3).getValue() || 0);
  if (entry.totalScore >= currentScore) {
    sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
  }
}

function upsertCourseRawRows_(anonymousId, nickname, updatedAt, courseBestScores) {
  if (!courseBestScores.length) return [];

  const sheet = getCourseRawSheet_();
  const lastRow = sheet.getLastRow();
  const values = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 8).getValues() : [];
  const rowIndexByKey = {};
  const touchedCourseIds = {};

  for (let i = 0; i < values.length; i++) {
    rowIndexByKey[String(values[i][0])] = i + 2;
  }

  courseBestScores.forEach(function(item) {
    const courseId = String(item.courseId || '').trim();
    const grade = String(item.grade || '').trim();
    const category = String(item.category || '').trim();
    const bestScore = Number(item.bestScore || 0);
    if (!courseId || !grade || !category || !Number.isFinite(bestScore) || bestScore <= 0) return;

    const entryKey = `${anonymousId}::${courseId}`;
    const row = [
      entryKey,
      anonymousId,
      nickname,
      courseId,
      grade,
      category,
      bestScore,
      updatedAt
    ];

    touchedCourseIds[courseId] = true;
    const targetRow = rowIndexByKey[entryKey];
    if (!targetRow) {
      sheet.appendRow(row);
      return;
    }

    const currentScore = Number(sheet.getRange(targetRow, 7).getValue() || 0);
    if (bestScore >= currentScore) {
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    }
  });

  return Object.keys(touchedCourseIds);
}

function rebuildOverallCache_() {
  const entries = getOverallRawEntries_().slice(0, OVERALL_LIMIT);
  const sheet = getOverallCacheSheet_();
  resetSheetBody_(sheet);
  if (!entries.length) return;

  const rows = entries.map(function(entry) {
    return [
      entry.anonymousId,
      entry.nickname,
      entry.totalScore,
      entry.rankTitle,
      entry.lastPlayedCourse,
      entry.updatedAt
    ];
  });
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function rebuildCourseCacheForIds_(courseIds) {
  if (!courseIds || !courseIds.length) return;

  const cacheSheet = getCourseCacheSheet_();
  const lastRow = cacheSheet.getLastRow();
  const existingRows = lastRow > 1 ? cacheSheet.getRange(2, 1, lastRow - 1, 7).getValues() : [];
  const keepRows = existingRows.filter(function(row) {
    return courseIds.indexOf(String(row[0] || '')) === -1;
  });

  resetSheetBody_(cacheSheet);

  const newRows = keepRows.slice();
  courseIds.forEach(function(courseId) {
    const topRows = getCourseRawEntriesByCourseId_(courseId).slice(0, COURSE_LIMIT).map(function(entry) {
      return [
        entry.courseId,
        entry.anonymousId,
        entry.nickname,
        entry.grade,
        entry.category,
        entry.bestScore,
        entry.updatedAt
      ];
    });
    Array.prototype.push.apply(newRows, topRows);
  });

  if (!newRows.length) return;
  cacheSheet.getRange(2, 1, newRows.length, newRows[0].length).setValues(newRows);
}

function deletePlayer_(anonymousId) {
  const overallSheet = getOverallRawSheet_();
  const courseSheet = getCourseRawSheet_();
  const touchedCourseIds = [];

  deleteRowsByPredicate_(overallSheet, 6, function(row) {
    return String(row[0] || '') === anonymousId;
  });

  const courseValues = courseSheet.getLastRow() > 1 ? courseSheet.getRange(2, 1, courseSheet.getLastRow() - 1, 8).getValues() : [];
  courseValues.forEach(function(row) {
    if (String(row[1] || '') === anonymousId) {
      touchedCourseIds.push(String(row[3] || ''));
    }
  });
  deleteRowsByPredicate_(courseSheet, 8, function(row) {
    return String(row[1] || '') === anonymousId;
  });

  rebuildOverallCache_();
  rebuildCourseCacheForIds_(Array.from(new Set(touchedCourseIds.filter(Boolean))));
}

function deleteRowsByPredicate_(sheet, width, predicate) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const values = sheet.getRange(2, 1, lastRow - 1, width).getValues();
  const keepRows = values.filter(function(row) {
    return !predicate(row);
  });

  resetSheetBody_(sheet);
  if (!keepRows.length) return;
  sheet.getRange(2, 1, keepRows.length, keepRows[0].length).setValues(keepRows);
}

function getOverallRawEntries_() {
  const sheet = getOverallRawSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  return values
    .map(function(row) {
      return {
        anonymousId: String(row[0] || ''),
        nickname: String(row[1] || 'Player'),
        totalScore: Number(row[2] || 0),
        rankTitle: String(row[3] || ''),
        lastPlayedCourse: String(row[4] || ''),
        updatedAt: String(row[5] || '')
      };
    })
    .sort(function(a, b) {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
}

function getCourseRawEntriesByCourseId_(courseId) {
  const sheet = getCourseRawSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  return values
    .filter(function(row) {
      return String(row[3] || '') === courseId;
    })
    .map(function(row) {
      return {
        anonymousId: String(row[1] || ''),
        nickname: String(row[2] || 'Player'),
        courseId: String(row[3] || ''),
        grade: String(row[4] || ''),
        category: String(row[5] || ''),
        bestScore: Number(row[6] || 0),
        updatedAt: String(row[7] || '')
      };
    })
    .sort(function(a, b) {
      if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
}

function getOverallCacheEntries_(limit) {
  const sheet = getOverallCacheSheet_();
  if (sheet.getLastRow() <= 1) {
    rebuildOverallCache_();
  }
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const values = sheet.getRange(2, 1, Math.min(lastRow - 1, limit), 6).getValues();
  return values.map(function(row) {
    return {
      anonymousId: String(row[0] || ''),
      nickname: String(row[1] || 'Player'),
      totalScore: Number(row[2] || 0),
      rankTitle: String(row[3] || ''),
      lastPlayedCourse: String(row[4] || ''),
      updatedAt: String(row[5] || '')
    };
  });
}

function getCourseCacheEntries_(courseId, limit) {
  const cacheSheet = getCourseCacheSheet_();
  if (cacheSheet.getLastRow() <= 1) {
    rebuildCourseCacheForIds_([courseId]);
  }

  const lastRow = cacheSheet.getLastRow();
  const values = lastRow > 1 ? cacheSheet.getRange(2, 1, lastRow - 1, 7).getValues() : [];
  let rows = values.filter(function(row) {
    return String(row[0] || '') === courseId;
  });

  if (!rows.length) {
    rebuildCourseCacheForIds_([courseId]);
    const refreshedLastRow = cacheSheet.getLastRow();
    const refreshedValues = refreshedLastRow > 1 ? cacheSheet.getRange(2, 1, refreshedLastRow - 1, 7).getValues() : [];
    rows = refreshedValues.filter(function(row) {
      return String(row[0] || '') === courseId;
    });
  }

  return rows.slice(0, limit).map(function(row) {
    return {
      courseId: String(row[0] || ''),
      anonymousId: String(row[1] || ''),
      nickname: String(row[2] || 'Player'),
      grade: String(row[3] || ''),
      category: String(row[4] || ''),
      bestScore: Number(row[5] || 0),
      updatedAt: String(row[6] || '')
    };
  });
}

function resetSheetBody_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }
}

function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
