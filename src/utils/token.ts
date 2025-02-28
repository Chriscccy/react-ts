// 封装和token相关的方法 存 取 删

const TOKENKEY = "token_key";

function setToken(token: string) {
  localStorage.setItem(TOKENKEY, token);
}

function getToken() {
  return localStorage.getItem(TOKENKEY);
}

function removeToken() {
  localStorage.removeItem(TOKENKEY);
}

function removeTokenRole() {
  localStorage.removeItem(TOKENKEY);
  localStorage.removeItem("user_role");
}

export { setToken, getToken, removeToken, removeTokenRole };
