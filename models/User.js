const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// DB 스키마 만들기
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    tyepe: String,
    // todo: trim error 확인해보기
    // trim: true,
    // unique: 1,
  },
  password: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    //   토큰 사용 기간
    tyepe: Number,
  },
});

// 유저 정보를 저장하기 전에 동작
userSchema.pre("save", function (next) {
  // const user는 위에 있는 userSchema를 가리킨다
  var user = this;

  // 비밀번호를 바꿀 때만 암호화 하기
  if (user.isModified("password")) {
    // 비밀번호 암호화 시키기
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // next()를 하면 바로 회원가입 route로 보낸다
      if (err) return next("gensalt");

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next("hash");

        // hash된 비밀번호로 변경해 준다
        user.password = hash;
        next();
      });
    });
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
