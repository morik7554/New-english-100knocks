/**
 * Basic sentence bank.
 * Unit numbers are intentionally not stored. Edit grade / english / japanese / context only.
 */
const basicSentencesGrade1 = [
    { grade: 1, english: "I’m Eri.", japanese: "私はエリです。" },
    { grade: 1, english: "I’m a student there.", japanese: "私はそこの生徒です。" },
    { grade: 1, english: "I’m from Japan.", japanese: "私は日本出身です。" },
    { grade: 1, english: "I like spring.", japanese: "私は春が好きです。" },
    { grade: 1, english: "I don’t like spring.", japanese: "私は春が好きではありません。" },
    { grade: 1, english: "I can play the drums.", japanese: "私はドラムを演奏できます。" },
    { grade: 1, english: "I can’t play the drums.", japanese: "私はドラムを演奏できません。" },
    { grade: 1, english: "You are a new student.", japanese: "あなたは新入生です。" },

    { grade: 1, english: "Are you a new student?", japanese: "あなたは新入生ですか。" },
    { grade: 1, english: "Yes, I am.", japanese: "はい、そうです。", context: "Are you a new student?" },
    { grade: 1, english: "No, I’m not.", japanese: "いいえ、違います。", context: "Are you a new student?" },

    { grade: 1, english: "Do you play an instrument?", japanese: "あなたは楽器を演奏しますか。" },
    { grade: 1, english: "Yes, I do.", japanese: "はい、します。", context: "Do you play an instrument?" },
    { grade: 1, english: "No, I don’t.", japanese: "いいえ、しません。", context: "Do you play an instrument?" },

    { grade: 1, english: "Can you read it?", japanese: "それを読めますか。" },
    { grade: 1, english: "Yes, I can.", japanese: "はい、読めます。", context: "Can you read it?" },
    { grade: 1, english: "No, I can’t.", japanese: "いいえ、読めません。", context: "Can you read it?" },

    { grade: 1, english: "What do you do during the summer vacation?", japanese: "夏休みの間は何をしますか。" },
    { grade: 1, english: "I usually visit my grandparents.", japanese: "たいてい、祖父母を訪ねます。", context: "What do you do during the summer vacation?" },

    { grade: 1, english: "I like dancing.", japanese: "私は踊るのが好きです。" },
    { grade: 1, english: "Do you like dancing?", japanese: "あなたは踊るのが好きですか。" },
    { grade: 1, english: "I want to get that blue one.", japanese: "あの青いのを取りたいです。" },
    { grade: 1, english: "Do you want to try it?", japanese: "やってみたいですか。" },
    { grade: 1, english: "This is Ms. Thui.", japanese: "こちらはツシ先生です。" },
    { grade: 1, english: "She’s our English teacher.", japanese: "彼女は私たちの英語の先生です。" },
    { grade: 1, english: "That’s Mr. Hoshino.", japanese: "あちらは星野先生です。" },
    { grade: 1, english: "He’s our P.E. teacher.", japanese: "彼は私たちの体育の先生です。" },

    { grade: 1, english: "Who’s that?", japanese: "あれは誰ですか。" },
    { grade: 1, english: "He’s a new student.", japanese: "彼は新入生です。", context: "Who’s that?" },

    { grade: 1, english: "Is this our classroom?", japanese: "これは私たちの教室ですか。" },
    { grade: 1, english: "Yes, it is.", japanese: "はい、そうです。", context: "Is this our classroom?" },
    { grade: 1, english: "No, it isn’t.", japanese: "いいえ、違います。", context: "Is this our classroom?" },

    { grade: 1, english: "This is not our classroom.", japanese: "これは私たちの教室ではありません。" },
    { grade: 1, english: "Whose pencil case is that?", japanese: "あれは誰の筆箱ですか。" },
    { grade: 1, english: "Whose is it?", japanese: "それは誰のものですか。" },
    { grade: 1, english: "Turn on your camera.", japanese: "カメラをオンにしてください。" },
    { grade: 1, english: "Don’t be shy.", japanese: "恥ずかしがらないでください。" },
    { grade: 1, english: "Let’s begin.", japanese: "始めましょう。" },

    { grade: 1, english: "Where’s the science lab?", japanese: "理科室はどこですか。" },
    { grade: 1, english: "It’s on the first floor.", japanese: "1階です。", context: "Where’s the science lab?" },

    { grade: 1, english: "Where do you have lunch?", japanese: "あなたは昼食をどこで食べますか。" },
    { grade: 1, english: "We usually eat in the cafeteria.", japanese: "たいていカフェテリアで食べます。", context: "Where do you have lunch?" },

    { grade: 1, english: "When’s your next match?", japanese: "次の試合はいつですか。" },
    { grade: 1, english: "It’s next month.", japanese: "来月です。", context: "When’s your next match?" },

    { grade: 1, english: "When do you practice?", japanese: "いつ練習しますか。" },
    { grade: 1, english: "After school and on weekends.", japanese: "放課後と週末です。", context: "When do you practice?" },

    { grade: 1, english: "Can I have the spaghetti?", japanese: "スパゲッティをください。" },
    { grade: 1, english: "Which would you like, tomato spaghetti or basil spaghetti?", japanese: "トマトスパゲッティとバジルスパゲッティ、どちらがよろしいですか。" },
    { grade: 1, english: "I’d like tomato spaghetti, please.", japanese: "トマトスパゲッティをお願いします。", context: "Which would you like, tomato spaghetti or basil spaghetti?" },
    { grade: 1, english: "How much is it?", japanese: "いくらですか。" },
    { grade: 1, english: "How many pieces do you want?", japanese: "いくつ欲しいですか。" },
    { grade: 1, english: "She likes singing and dancing.", japanese: "彼女は歌うことと踊ることが好きです。" },

    { grade: 1, english: "Does she have a cold?", japanese: "彼女は風邪をひいていますか。" },
    { grade: 1, english: "Yes, she does.", japanese: "はい、ひいています。", context: "Does she have a cold?" },
    { grade: 1, english: "No, she doesn’t.", japanese: "いいえ、ひいていません。", context: "Does she have a cold?" },

    { grade: 1, english: "She doesn’t go to school.", japanese: "彼女は学校に行きません。" },
    { grade: 1, english: "What time does the next bus come?", japanese: "次のバスは何時に来ますか。" },
    { grade: 1, english: "How can I get to Honcho Station?", japanese: "本町駅へはどうやって行けばよいですか。" },
    { grade: 1, english: "How long does it take from here?", japanese: "ここからどれくらい時間がかかりますか。" },
    { grade: 1, english: "I went to a temple on New Year’s Eve.", japanese: "私は大みそかにお寺に行きました。" },
    { grade: 1, english: "I watched TV with my family.", japanese: "私は家族とテレビを見ました。" },

    { grade: 1, english: "Did you eat any traditional food?", japanese: "何か伝統的な料理を食べましたか。" },
    { grade: 1, english: "Yes, I did.", japanese: "はい、食べました。", context: "Did you eat any traditional food?" },
    { grade: 1, english: "No, I didn’t.", japanese: "いいえ、食べませんでした。", context: "Did you eat any traditional food?" },

    { grade: 1, english: "I didn’t eat any traditional food.", japanese: "伝統的な料理は何も食べませんでした。" },
    { grade: 1, english: "It was fun.", japanese: "楽しかったです。" },
    { grade: 1, english: "The traditional buildings were beautiful.", japanese: "伝統的な建物は美しかったです。" },
    { grade: 1, english: "I’m baking a cake now.", japanese: "今、ケーキを焼いているところです。" },

    { grade: 1, english: "Are you baking a cake?", japanese: "ケーキを焼いているところですか。" },
    { grade: 1, english: "Yes, I am.", japanese: "はい、そうです。", context: "Are you baking a cake?" },
    { grade: 1, english: "No, I’m not.", japanese: "いいえ、違います。", context: "Are you baking a cake?" },

    { grade: 1, english: "What are you doing?", japanese: "何をしているところですか。" },
    { grade: 1, english: "We are decorating the cake now.", japanese: "私たちは今、ケーキに飾り付けをしているところです。", context: "What are you doing?" },
    { grade: 1, english: "What were you doing?", japanese: "何をしていましたか。" },
    { grade: 1, english: "I was shopping.", japanese: "買い物をしていました。", context: "What were you doing?" }
];

const basicSentencesGrade2 = [
    { grade: 2, english: "I went to Busan.", japanese: "私はプサンへ行きました。" },
    { grade: 2, english: "I visited my grandparents.", japanese: "私は祖父母を訪ねました。" },
    { grade: 2, english: "How was your trip to Korea?", japanese: "韓国への旅はどうでしたか。" },
    { grade: 2, english: "They were really interested in Japan.", japanese: "彼らはとても日本に興味がありました。" },
    { grade: 2, english: "When I have free time, I study Japanese.", japanese: "私は暇なとき、日本語の勉強をします。" },
    { grade: 2, english: "They looked happy.", japanese: "彼らはうれしそうでした。" },
    { grade: 2, english: "It sounds exciting.", japanese: "おもしろそうです。" },
    { grade: 2, english: "This is Jack.", japanese: "ジャックです。" },
    { grade: 2, english: "Can you be there at one o’clock?", japanese: "1時にそこに来られますか。" },
    { grade: 2, english: "I don’t like playing basketball.", japanese: "私はバスケットボールをするのが好きではありません。" },
    { grade: 2, english: "I’m not good at passing the ball.", japanese: "私はボールをパスするのが得意ではありません。" },
    { grade: 2, english: "Passing the ball isn’t easy.", japanese: "ボールをパスするのは簡単ではありません。" },
    { grade: 2, english: "Hajin wants to shoot.", japanese: "ハジンはシュートしたがっています。" },
    { grade: 2, english: "The important thing is to pass the ball to Hajin.", japanese: "大切なことは、ハジンにボールをパスすることです。" },
    { grade: 2, english: "I think that you did a great job.", japanese: "きみたちはよくやったと思うよ。" },
    { grade: 2, english: "I’m sure that you like playing basketball now.", japanese: "きっときみは、今はバスケットボールをするのが好きだね。" },
    { grade: 2, english: "I’m going to visit my cousins in Okinawa.", japanese: "私は沖縄にいるいとこを訪ねるつもりです。" },

    { grade: 2, english: "Are you going to visit your cousins?", japanese: "あなたはいとこを訪ねるつもりですか。" },
    { grade: 2, english: "Yes, I am.", japanese: "はい、そうです。", context: "Are you going to visit your cousins?" },
    { grade: 2, english: "No, I’m not.", japanese: "いいえ、訪ねません。", context: "Are you going to visit your cousins?" },

    { grade: 2, english: "It will be hot next week.", japanese: "来週は暑くなるでしょう。" },
    { grade: 2, english: "Will it be hot next week?", japanese: "来週は暑くなりますか。" },
    { grade: 2, english: "Yes, it will.", japanese: "はい、なるでしょう。", context: "Will it be hot next week?" },
    { grade: 2, english: "No, it won’t.", japanese: "いいえ、ならないでしょう。", context: "Will it be hot next week?" },

    { grade: 2, english: "If you’re tired, we can go straight home.", japanese: "あなたが疲れているのなら、そのまま家に帰ってもいいですよ。" },
    { grade: 2, english: "Shall I take your order?", japanese: "ご注文を承りましょうか。" },
    { grade: 2, english: "Would you like a drink?", japanese: "お飲み物はいかがですか。" },
    { grade: 2, english: "There is a big garden near there.", japanese: "その近くに大きな庭園があります。" },

    { grade: 2, english: "Is there a big garden near there?", japanese: "その近くに大きな庭園がありますか。" },
    { grade: 2, english: "Yes, there is.", japanese: "はい、あります。", context: "Is there a big garden near there?" },
    { grade: 2, english: "No, there isn’t.", japanese: "いいえ、ありません。", context: "Is there a big garden near there?" },

    { grade: 2, english: "There are several Merlions.", japanese: "いくつかのマーライオンがあります。" },
    { grade: 2, english: "Show me your guidebook.", japanese: "あなたのガイドブックを見せてください。" },
    { grade: 2, english: "I’ll give you a message.", japanese: "あなたにメッセージを送ります。" },
    { grade: 2, english: "You need something to cover your shoulders.", japanese: "あなたは何か肩を覆うものが必要です。" },
    { grade: 2, english: "You must check the location of the evacuation shelters.", japanese: "避難所の場所を確認しなければなりません。" },
    { grade: 2, english: "You must not forget to include information about shelters.", japanese: "避難所についての情報を含めるのを忘れてはいけません。" },
    { grade: 2, english: "We have to protect ourselves.", japanese: "私たちは自分の身を守る必要があります。" },
    { grade: 2, english: "You don’t have to evacuate.", japanese: "避難する必要はありません。" },
    { grade: 2, english: "It’s important to prepare well for emergencies.", japanese: "緊急事態によく備えることは大切です。" },
    { grade: 2, english: "May I ask you something?", japanese: "ちょっとよろしいですか。" },
    { grade: 2, english: "Could you tell me the way to Sapporo Maruyama Zoo?", japanese: "札幌円山動物園への行き方を教えていただけますか。" },
    { grade: 2, english: "Do you know how to buy a subway ticket?", japanese: "地下鉄の切符の買い方がわかりますか。" },
    { grade: 2, english: "I think you should take a rest.", japanese: "あなたは休んだほうがよいと思います。" },
    { grade: 2, english: "She’s here to help Fred.", japanese: "彼女はフレッドを手助けするためにここにいます。" },
    { grade: 2, english: "I study English to travel abroad.", japanese: "海外旅行をするために英語を勉強します。" },
    { grade: 2, english: "They also learn basic social rules because it’s essential for guide dogs.", japanese: "盲導犬は、社会の基本的な決まりも学びます。なぜなら決まりを学ぶことが盲導犬にとって必要不可欠だからです。" },
    { grade: 2, english: "I’m glad to hear that.", japanese: "それを聞いてうれしいです。" },
    { grade: 2, english: "This festival is bigger than the Honcho Summer Festival.", japanese: "この催しは本町夏祭りより大きいです。" },
    { grade: 2, english: "This festival is the biggest event of the year.", japanese: "この催しは1年でいちばん大きなイベントです。" },
    { grade: 2, english: "A school in space is more exciting than a normal one.", japanese: "宇宙の学校は、普通の学校よりわくわくします。" },
    { grade: 2, english: "Teamwork is the most important thing.", japanese: "チームワークはいちばん大事なことです。" },
    { grade: 2, english: "We’re as tired as Kota.", japanese: "私たちはコウタと同じくらい疲れています。" },
    { grade: 2, english: "We’re not as tired as Kota.", japanese: "私たちはコウタほど疲れていません。" },
    { grade: 2, english: "We’re trying as hard as Kota.", japanese: "私たちはコウタと同じくらい一生懸命やっています。" },
    { grade: 2, english: "I want you to help me.", japanese: "私はあなたに手伝ってほしいです。" },
    { grade: 2, english: "That makes me nervous.", japanese: "それは私を緊張させます。" },
    { grade: 2, english: "We call our cat Felix.", japanese: "私たちは自分たちのネコをフェリックスと呼びます。" },
    { grade: 2, english: "It was well received by everyone.", japanese: "それはみんなから好評でした。" },
    { grade: 2, english: "It’s made of chocolate.", japanese: "それはチョコレートでできています。" }
];

const basicSentencesGrade3 = [
    { grade: 3, english: "English is spoken as an official language.", japanese: "英語は公用語として話されています。" },
    { grade: 3, english: "Let me show you something interesting.", japanese: "おもしろいものをお見せしましょう。" },
    { grade: 3, english: "This footprint will help us find the elephant.", japanese: "この足跡は、私たちがゾウを見つけるのに役立ちます。" },
    { grade: 3, english: "Ms. Thui told us that you also do conservation.", japanese: "ツシ先生は、あなたが保護活動もしていることを私たちに教えてくれました。" },
    { grade: 3, english: "We have finally reached Kiyomizu-dera Temple.", japanese: "私たちはようやく清水寺に到着しました。" },

    { grade: 3, english: "Have you checked your photos yet?", japanese: "もう写真をチェックしましたか。" },
    { grade: 3, english: "Yes, I have.", japanese: "はい、しました。", context: "Have you checked your photos yet?" },
    { grade: 3, english: "No, I haven’t.", japanese: "いいえ、していません。", context: "Have you checked your photos yet?" },

    { grade: 3, english: "The bus hasn’t left yet.", japanese: "バスはまだ出発していません。" },

    { grade: 3, english: "Have you ever seen him like that?", japanese: "あんなふうな彼を見たことがありますか。" },
    { grade: 3, english: "Yes, I have.", japanese: "はい、あります。", context: "Have you ever seen him like that?" },
    { grade: 3, english: "No, never.", japanese: "いいえ、ありません。", context: "Have you ever seen him like that?" },

    { grade: 3, english: "I’ve never seen such a beautiful sunset.", japanese: "私はあんなに美しい夕日を今まで見たことがありません。" },
    { grade: 3, english: "The dome has been like this for about 80 years.", japanese: "原爆ドームはおよそ80年間このような状態です。" },

    { grade: 3, english: "How long have you been a volunteer?", japanese: "ボランティアになってどのくらいですか。" },
    { grade: 3, english: "I’ve been a volunteer since 2000.", japanese: "2000年からずっとボランティアをしています。", context: "How long have you been a volunteer?" },

    { grade: 3, english: "I’ve been thinking about our trip to Hiroshima.", japanese: "私は広島への旅行のことをずっと考えています。" },
    { grade: 3, english: "We learned how to work for world peace from her.", japanese: "私たちは、世界平和のために取り組む方法を彼女から学びました。" },
    { grade: 3, english: "She showed us how to work for world peace.", japanese: "彼女は、世界平和のために取り組む方法を私たちに教えてくれました。" },
    { grade: 3, english: "Our teacher told us what to see in Hiroshima.", japanese: "私たちの先生は、広島で見るべきものを私たちに教えてくれました。" },
    { grade: 3, english: "Smartphones which respond to voice commands are common these days.", japanese: "音声指示に応じるスマートフォンは、最近では一般的です。" },
    { grade: 3, english: "I have an uncle who runs a Japanese restaurant.", japanese: "私には日本料理店を経営する叔父がいます。" },
    { grade: 3, english: "Learning a language is a valuable experience that will help us broaden our world view.", japanese: "言語を学ぶことは、私たちの世界観を広げてくれる、価値のある経験です。" },
    { grade: 3, english: "Look at this picture which I found on the internet.", japanese: "私がインターネットで見つけたこの写真を見てください。" },
    { grade: 3, english: "The presentation that you gave was great!", japanese: "あなたがしたプレゼンテーションはすばらしかったです。" },
    { grade: 3, english: "Being a puppy walker was another great experience I had.", japanese: "パピーウォーカーになったことは、私がしたもう1つのすばらしい経験でした。" },
    { grade: 3, english: "There are two people playing one piano.", japanese: "1台のピアノを弾いている2人の人がいます。" },
    { grade: 3, english: "They’re wearing T-shirts designed by Tina.", japanese: "彼らはティナがデザインしたTシャツを着ています。" },
    { grade: 3, english: "Tell us why you’re leaving.", japanese: "どうして行ってしまうのか私たちに教えて。" },
    { grade: 3, english: "Do you know when you’re leaving?", japanese: "いつ出発するかわかっているのですか。" },
    { grade: 3, english: "If you were in my place, you would feel the same.", japanese: "もしあなたが私の立場だったら、同じように感じるでしょう。" },
    { grade: 3, english: "If I could speak to that worried girl, I would say, “Don’t worry.”", japanese: "もし私がその不安そうな少女に話しかけられるのなら、「心配することはないよ。」と言うでしょうに。" },
    { grade: 3, english: "I wish I could stay here with all of you.", japanese: "みんなといっしょに、ここにいられたらいいのに。" }
];

const BASIC_SENTENCES = [
    ...basicSentencesGrade1,
    ...basicSentencesGrade2,
    ...basicSentencesGrade3,
];
