// 封装和token相关的方法 存 取 删

const USERROLE = "user_role";

function setRole(role: string) {
  localStorage.setItem(USERROLE, role);
}

function getRole() {
  return localStorage.getItem(USERROLE);
}

function removeRole() {
  localStorage.removeItem(USERROLE);
}

export { setRole, getRole, removeRole };
