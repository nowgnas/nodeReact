const mongoose = require("mongoose");

// DB 스키마 만들기
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    unique: 1,
  },
  email: {
    tyepe: String,
    // todo: trim error 확인해보기
    // trim: true,
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
