const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// データ定義（家計簿データ）
let kakeiboList = [
  { id: 1, date: "2025-01-01", category: "食費", amount: 1200, memo: "ランチセット" },
  { id: 2, date: "2025-01-02", category: "交通費", amount: 400, memo: "電車代" }
];

// 一覧表示
app.get("/kakeibos", (req, res) => {
  res.render('kakeibos', {data: kakeiboList} );
});

// 新規登録フォーム表示
app.get("/kakeibos/create", (req, res) => {
  res.redirect('/public/kakeibos_new.html');
});

// 詳細表示 (Read)
app.get("/kakeibos/:number", (req, res) => {
  const number = req.params.number;
  const detail = kakeiboList[number];
  res.render('kakeibos_detail', {id: number, data: detail} );
});

// 削除処理 (Delete)
app.get("/kakeibos/delete/:number", (req, res) => {
  kakeiboList.splice( req.params.number, 1 );
  res.redirect('/kakeibos' );
});

// 新規登録処理 (Create)
app.post("/kakeibos", (req, res) => {
  const id = kakeiboList.length + 1;
  const date = req.body.date;
  const category = req.body.category;
  const amount = req.body.amount;
  const memo = req.body.memo;

  kakeiboList.push({ 
    id: id, 
    date: date, 
    category: category, 
    amount: amount, 
    memo: memo 
  });
  
  // 確認用
  // console.log(kakeiboList);

  res.render('kakeibos', {data: kakeiboList} );
});

// 編集フォーム表示 (Edit)
app.get("/kakeibos/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = kakeiboList[ number ];
  res.render('kakeibos_edit', {id: number, data: detail} );
});

// 更新処理 (Update)
app.post("/kakeibos/update/:number", (req, res) => {
  kakeiboList[req.params.number].date = req.body.date;
  kakeiboList[req.params.number].category = req.body.category;
  kakeiboList[req.params.number].amount = req.body.amount;
  kakeiboList[req.params.number].memo = req.body.memo;
  // 確認用
  // console.log(kakeiboList);
  res.redirect('/kakeibos' );
});

app.listen(8080, () => console.log("Kakeibo App listening on port 8080!"));