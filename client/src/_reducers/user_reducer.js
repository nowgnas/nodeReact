import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function us(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      // action.payload에 모든 사용자 정보가 들어가 있다
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
