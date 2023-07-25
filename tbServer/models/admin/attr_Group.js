const { Sequelize, sequelize } = require("../DBinit.js");
const attrGroup = sequelize.define(
  "attr_group",
  {
    attr_Group_ID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
      primaryKey: true,
      autoIncrement: true,
    },
    attr_Group_Name: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
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
  },
  {
    sequelize,
    timestamps: false,
    tableName: "attr_group",
  }
);

// attrGroup.sync().then(() => {
//   console.log("attr_Group模型同步成功");
// });

module.exports = { attrGroup };
