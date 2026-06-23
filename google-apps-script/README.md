# Ranking Setup

1. Google スプレッドシートを新規作成します。
2. `拡張機能` -> `Apps Script` を開きます。
3. [ranking.gs](/Users/morikazuya/Desktop/アプリ/English-100Knocks/google-apps-script/ranking.gs) の内容を貼り付けます。
4. 管理用パスワードは初期設定で `4761` です。
5. 変更したい場合だけ `プロジェクトの設定` -> `スクリプト プロパティ` に `ADMIN_TOKEN` を追加して上書きします。
6. `デプロイ` -> `新しいデプロイ` -> `ウェブアプリ` を選びます。
7. 次の設定で公開します。
   - 実行するユーザー: `自分`
   - アクセスできるユーザー: `全員`
8. 発行された `https://script.google.com/.../exec` のURLをコピーします。
9. アプリの `ランキング` 画面で `接続先URL` に貼り付けて保存します。
10. 管理画面を使うときは、アプリ内の `管理者用` からパスワード `4761` を入れます。

これで次のランキングが見られます。

- `全体`: 累計スコア上位50人
- `中学1年 / 2年 / 3年`: 文法項目一覧
- 各文法項目: その項目の上位30人

設計は少し強めにしています。

- `overall_ranking` / `course_ranking`
  - 保存用の生データ
- `overall_top_cache` / `course_top_cache`
  - 表示用の軽いキャッシュ

ランキング画面では基本的にキャッシュを読むので、参加者が増えても表示が重くなりにくい構成です。
その代わり、スコア送信時にキャッシュを更新します。

保存されるのは次の項目です。

- 総合ランキング用
  - `anonymousId`
  - `nickname`
  - `totalScore`
  - `rankTitle`
  - `lastPlayedCourse`
  - `updatedAt`
- 項目別ランキング用
  - `courseId`
  - `grade`
  - `category`
  - `bestScore`

メールアドレスや本名は保存しません。
ニックネームはアプリ側と Apps Script 側の両方でチェックし、不適切な名前や個人情報らしい名前は送信できないようにしています。

既に以前の `ranking.gs` を使っている場合は、Apps Script 側をこの最新版に差し替えてから再デプロイしてください。
