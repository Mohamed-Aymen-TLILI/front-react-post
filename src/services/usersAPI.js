import axios from "axios";
import { SIGNUP_API } from "../config";

function register(user) {
  return axios.post(SIGNUP_API, user);
}

export default register;