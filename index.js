// express 모듈 가져오기
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:0376@nodereact.jqwxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

// root dir에 출력
app.get("/", (req, res) => res.send("hello"));

// 회원가입을 위한 route 만들기
app.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다

  const user = new User(req.body);

  // mongoDB method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 앱을 실행
app.listen(port, () => console.log(`example port ${port}!`));
