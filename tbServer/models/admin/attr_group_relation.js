const { Sequelize, sequelize } = require("../DBinit.js");
const attrGroupRelation = sequelize.define(
  "attr_attrgroup_relation",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
      primaryKey: true,
      autoIncrement: true,
    },
    attr_ID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
    attr_Group_ID: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "attr_attrgroup_relation",
  }
);

// attrGroupRelation.sync().then(() => {
//   console.log("attr_attrgroup_relation模型同步成功");
// });

module.exports = { attrGroupRelation };
