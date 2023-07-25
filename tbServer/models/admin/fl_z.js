const { Sequelize, sequelize } = require("../DBinit.js");
const ZFL = sequelize.define(
  "fl-z",
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
    dflID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "fl-z",
  }
);

// ZFL.sync().then(() => {
//   console.log("ZFL模型同步成功");
// });

module.exports = { ZFL };
