const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// データ定義
let partyList = [
  { 
    id: 1, 
    name: "S1 砂パ展開", 
    p1_name: "バンギラス", p1_info: "慎重 HD252 A4 / すなおこし / ステロ, 岩封, 叩き, 吠える", 
    p2_name: "ドリュウズ", p2_info: "陽気 AS252 B4 / すなかき / 地震, アイヘ, 岩雪崩, 剣舞", 
    p3_name: "ボーマンダ", p3_info: "臆病 CS252 H4 / 威嚇 / 流星群, 大文字, ドロポン, 暴風"
  }
];

// 一覧表示
app.get("/teams", (req, res) => {
  res.render('teams', {data: partyList} );
});

// 新規登録フォーム表示
app.get("/teams/create", (req, res) => {
  res.redirect('/public/teams_new.html');
});

// 詳細表示 (Read)
app.get("/teams/:number", (req, res) => {
  const number = req.params.number;
  const detail = partyList[number];
  res.render('teams_detail', {id: number, data: detail} );
});

// 削除処理 (Delete)
app.get("/teams/delete/:number", (req, res) => {
  partyList.splice( req.params.number, 1 );
  res.redirect('/teams' );
});

// 新規登録処理 (Create)
app.post("/teams", (req, res) => {
  const id = partyList.length + 1;
  const name = req.body.name;
  const p1_name = req.body.p1_name;
  const p1_info = req.body.p1_info;
  const p2_name = req.body.p2_name;
  const p2_info = req.body.p2_info;
  const p3_name = req.body.p3_name;
  const p3_info = req.body.p3_info;

  partyList.push({ 
    id: id, 
    name: name, 
    p1_name: p1_name, p1_info: p1_info, 
    p2_name: p2_name, p2_info: p2_info, 
    p3_name: p3_name, p3_info: p3_info 
  });
  //確認用
  // console.log( partyList ); 
  res.render('teams', {data: partyList} );
});

// 編集フォーム表示 (Edit)
app.get("/teams/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = partyList[ number ];
  res.render('teams_edit', {id: number, data: detail} );
});

// 更新処理 (Update)
app.post("/teams/update/:number", (req, res) => {
  partyList[req.params.number].name = req.body.name;
  partyList[req.params.number].p1_name = req.body.p1_name;
  partyList[req.params.number].p1_info = req.body.p1_info;
  partyList[req.params.number].p2_name = req.body.p2_name;
  partyList[req.params.number].p2_info = req.body.p2_info;
  partyList[req.params.number].p3_name = req.body.p3_name;
  partyList[req.params.number].p3_info = req.body.p3_info;
  // 確認用
  // console.log( partyList );
  res.redirect('/teams' );
});

app.listen(8080, () => console.log("Pokemon App listening on port 8080!"));