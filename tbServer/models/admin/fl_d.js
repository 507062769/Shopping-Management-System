const { Sequelize, sequelize } = require("../DBinit.js");
const DFL = sequelize.define(
  "fl-d",
  {
    ID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "fl-d",
  }
);

DFL.sync().then(() => {
  console.log("DFL模型同步成功");
});

module.exports = { DFL };
