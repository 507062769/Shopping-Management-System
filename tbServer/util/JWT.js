const jsonwebtoken = require("jsonwebtoken");
// 秘钥，以它为加密的
const secret = "liuyaoyao";

const JWT = {
  // 创建token
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  },
  // 解密token
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};

module.exports = JWT;
