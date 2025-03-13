import CryptoJS from "crypto-js";

// 加密密钥（建议从环境变量中获取）
const SECRET_KEY = import.meta.env.VITE_CRYPTOJS_SECRET_KEY;

// 加密函数
export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// 解密函数
export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
