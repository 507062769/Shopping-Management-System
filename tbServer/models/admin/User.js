const { Sequelize, sequelize } = require("../DBinit.js");
const User = sequelize.define(
  "adminUser",
  {
    uid: {
      type: Sequelize.INTEGER.UNSIGNED, // 字段类型
      unique: true, //唯一
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
      unique: true, //唯一
    },
    passWord: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
    sex: {
      type: Sequelize.INTEGER, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
    role: {
      type: Sequelize.INTEGER, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
    avatar: {
      type: Sequelize.STRING, // 字段类型
      allowNull: false, //是否允许为空，默认true
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "adminUser",
  }
);

User.sync().then(() => {
  console.log("User模型同步成功");
});

module.exports = { User };
