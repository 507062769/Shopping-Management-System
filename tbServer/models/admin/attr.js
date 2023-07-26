const { Sequelize, sequelize } = require("../DBinit.js");
const attr = sequelize.define(
  "attr",
  {
    attr_ID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
      primaryKey: true,
      autoIncrement: true,
    },
    attr_Name: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
    value_Type: {
      type: Sequelize.CHAR, // 字段类型
      allowNull: false,
    },
    value_Select: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false,
    },
    attr_Type: {
      type: Sequelize.CHAR, // 字段类型
      allowNull: false,
    },
    dflID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      allowNull: false,
    },
    zflID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      allowNull: false,
    },
    xflID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      allowNull: false,
    },
    enable: {
      type: Sequelize.CHAR, // 字段类型
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "attr",
  }
);

// attr.sync().then(() => {
//   console.log("attr模型同步成功");
// });

module.exports = { attr };
