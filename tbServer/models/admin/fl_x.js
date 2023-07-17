const { Sequelize, sequelize } = require("../DBinit.js");
const XFL = sequelize.define(
  "fl-x",
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
    zflID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "fl-x",
  }
);

XFL.sync().then(() => {
  console.log("XFL模型同步成功");
});

module.exports = { XFL };
