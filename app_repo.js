const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


//  データ定義


// ポケモン用データ
let partyList = [
  { 
    id: 1, 
    name: "S1 砂パ展開", 
    p1_name: "バンギラス", p1_info: "慎重 HD252 A4 / すなおこし / ステロ, 岩封, 叩き, 吠える", 
    p2_name: "ドリュウズ", p2_info: "陽気 AS252 B4 / すなかき / 地震, アイヘ, 岩雪崩, 剣舞", 
    p3_name: "ボーマンダ", p3_info: "臆病 CS252 H4 / 威嚇 / 流星群, 大文字, ドロポン, 暴風"
  }
];

// 家計簿用データ
let kakeiboList = [
  { id: 1, date: "2025-01-01", category: "食費", amount: 1000, memo: "ランチ" },
  { id: 2, date: "2025-01-02", category: "交通費", amount: 400, memo: "電車代" }
];

// 学食レビュー用データ
let reviewList = [
  { id: 1, menu: "唐揚げ丼", price: 350, stars: 5, comment: "うますぎ" },
  { id: 2, menu: "カレー", price: 250, stars: 4, comment: "コスパ最強" }
];

//  ルーティング処理

// トップページ
app.get("/", (req, res) => {
  res.render('top');
});

//  システム1：ポケモン構築管理 (/teams)
app.get("/teams", (req, res) => {
  res.render('teams', {data: partyList} );
});

app.get("/teams/create", (req, res) => {
  res.redirect('/public/teams_new.html');
});

app.get("/teams/:number", (req, res) => {
  const number = req.params.number;
  const detail = partyList[number];
  res.render('teams_detail', {id: number, data: detail} );
});

app.get("/teams/delete/:number", (req, res) => {
  partyList.splice( req.params.number, 1 );
  res.redirect('/teams' );
});

app.post("/teams", (req, res) => {
  const id = partyList.length + 1;
  const name = req.body.name;
  const p1_name = req.body.p1_name;
  const p1_info = req.body.p1_info;
  const p2_name = req.body.p2_name;
  const p2_info = req.body.p2_info;
  const p3_name = req.body.p3_name;
  const p3_info = req.body.p3_info;

  partyList.push({ id: id, name: name, p1_name, p1_info, p2_name, p2_info, p3_name, p3_info });
  res.render('teams', {data: partyList} );
});

app.get("/teams/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = partyList[ number ];
  res.render('teams_edit', {id: number, data: detail} );
});

app.post("/teams/update/:number", (req, res) => {
  partyList[req.params.number].name = req.body.name;
  partyList[req.params.number].p1_name = req.body.p1_name;
  partyList[req.params.number].p1_info = req.body.p1_info;
  partyList[req.params.number].p2_name = req.body.p2_name;
  partyList[req.params.number].p2_info = req.body.p2_info;
  partyList[req.params.number].p3_name = req.body.p3_name;
  partyList[req.params.number].p3_info = req.body.p3_info;
  res.redirect('/teams' );
});



//  システム2：家計簿アプリ (/kakeibos)
app.get("/kakeibos", (req, res) => {
  res.render('kakeibos', {data: kakeiboList} );
});

app.get("/kakeibos/create", (req, res) => {
  res.redirect('/public/kakeibos_new.html');
});

app.get("/kakeibos/:number", (req, res) => {
  const number = req.params.number;
  const detail = kakeiboList[number];
  res.render('kakeibos_detail', {id: number, data: detail} );
});

app.get("/kakeibos/delete/:number", (req, res) => {
  kakeiboList.splice( req.params.number, 1 );
  res.redirect('/kakeibos' );
});

app.post("/kakeibos", (req, res) => {
  const id = kakeiboList.length + 1;
  const date = req.body.date;
  const category = req.body.category;
  const amount = req.body.amount;
  const memo = req.body.memo;

  kakeiboList.push({ id: id, date: date, category: category, amount: amount, memo: memo });
  res.render('kakeibos', {data: kakeiboList} );
});

app.get("/kakeibos/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = kakeiboList[ number ];
  res.render('kakeibos_edit', {id: number, data: detail} );
});

app.post("/kakeibos/update/:number", (req, res) => {
  kakeiboList[req.params.number].date = req.body.date;
  kakeiboList[req.params.number].category = req.body.category;
  kakeiboList[req.params.number].amount = req.body.amount;
  kakeiboList[req.params.number].memo = req.body.memo;
  res.redirect('/kakeibos' );
});

//  システム3：学食レビュー
app.get("/reviews", (req, res) => {
  res.render('reviews', {data: reviewList} );
});

app.get("/reviews/create", (req, res) => {
  res.redirect('/public/reviews_new.html');
});

app.get("/reviews/:number", (req, res) => {
  const number = req.params.number;
  const detail = reviewList[number];
  res.render('reviews_detail', {id: number, data: detail} );
});

app.get("/reviews/delete/:number", (req, res) => {
  reviewList.splice( req.params.number, 1 );
  res.redirect('/reviews' );
});

app.post("/reviews", (req, res) => {
  const id = reviewList.length + 1;
  const menu = req.body.menu;
  const price = req.body.price;
  const stars = req.body.stars;
  const comment = req.body.comment;

  reviewList.push({ id: id, menu: menu, price: price, stars: stars, comment: comment });
  res.render('reviews', {data: reviewList} );
});

app.get("/reviews/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = reviewList[ number ];
  res.render('reviews_edit', {id: number, data: detail} );
});

app.post("/reviews/update/:number", (req, res) => {
  reviewList[req.params.number].menu = req.body.menu;
  reviewList[req.params.number].price = req.body.price;
  reviewList[req.params.number].stars = req.body.stars;
  reviewList[req.params.number].comment = req.body.comment;
  res.redirect('/reviews' );
});

//  サーバー起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));