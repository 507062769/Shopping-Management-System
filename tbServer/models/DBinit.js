const Sequelize = require("sequelize");
const sequelize = new Sequelize("tb", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("连接失败！错误信息：", err);
  });
module.exports = { Sequelize, sequelize };
