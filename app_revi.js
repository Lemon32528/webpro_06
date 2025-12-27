const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 学食レビュー用データ
let reviewList = [
  { id: 1, menu: "A定食（唐揚げ）", price: 350, stars: 5, comment: "揚げたてで美味しい！コスパ最強。" },
  { id: 2, menu: "カツカレー", price: 350, stars: 4, comment: "ボリューム満点。少し辛め。" }
];

// 一覧表示
app.get("/reviews", (req, res) => {
  res.render('reviews', {data: reviewList} );
});

// 新規登録フォーム表示
app.get("/reviews/create", (req, res) => {
  res.redirect('/public/reviews_new.html');
});

// 詳細表示
app.get("/reviews/:number", (req, res) => {
  const number = req.params.number;
  const detail = reviewList[number];
  res.render('reviews_detail', {id: number, data: detail} );
});

// 削除処理
app.get("/reviews/delete/:number", (req, res) => {
  reviewList.splice( req.params.number, 1 );
  res.redirect('/reviews' );
});

// 新規登録処理
app.post("/reviews", (req, res) => {
  const id = reviewList.length + 1;
  const menu = req.body.menu;
  const price = req.body.price;
  const stars = req.body.stars; // 星の数
  const comment = req.body.comment;

  reviewList.push({ id: id, menu: menu, price: price, stars: stars, comment: comment });
  // 確認用
  // console.log(reviewList);
  res.render('reviews', {data: reviewList} );
});

// 編集フォーム表示
app.get("/reviews/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = reviewList[ number ];
  res.render('reviews_edit', {id: number, data: detail} );
});

// 更新処理
app.post("/reviews/update/:number", (req, res) => {
  reviewList[req.params.number].menu = req.body.menu;
  reviewList[req.params.number].price = req.body.price;
  reviewList[req.params.number].stars = req.body.stars;
  reviewList[req.params.number].comment = req.body.comment;
  // 確認用
  // console.log(reviewList);
  res.redirect('/reviews' );
});

app.listen(8080, () => console.log("Pokemon App listening on port 8080!"));