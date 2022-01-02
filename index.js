// express 모듈 가져오기
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
// cookie parser
app.use(cookieParser());

const mongoose = require("mongoose");
const req = require("express/lib/request");
const { application } = require("express");
mongoose
  .connect(config.mongoURI)
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

app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터 베이스에서 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다",
      });
    }
    // 요청한 이메일이 있으면 비밀번호 같은지 확인
    // (err, ##)은 callback function
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        // 비번이 틀렸을 때
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      user.generateToken((err, user) => {
        if (err) {
          res.status(400).send(err);
        }
        // 토큰을 저장한다 쿠키나 로컬저장소, session에 저장 가능
        // 쿠키에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
  // 비밀번호도 맞으면 user를 위한 token 생성
});

// 앱을 실행
app.listen(port, () => console.log(`example port ${port}!`));
