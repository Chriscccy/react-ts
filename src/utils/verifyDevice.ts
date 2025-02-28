// 封装和token相关的方法 存 取 删

const VERIFY = "verifyDevice";

function setVerifyDevice(token: string) {
  localStorage.setItem(VERIFY, token);
}

function getVerifyDevice() {
  return localStorage.getItem(VERIFY);
}

function removeVerifyDevice() {
  localStorage.removeItem(VERIFY);
}

export { setVerifyDevice, getVerifyDevice, removeVerifyDevice };
