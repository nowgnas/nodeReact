// express 모듈 가져오기
const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:0376@nodereact.jqwxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

// root dir에 출력
app.get("/", (req, res) => res.send("hello"));

// 앱을 실행
app.listen(port, () => console.log(`example port ${port}!`));
