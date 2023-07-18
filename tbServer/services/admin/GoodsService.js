const { attrGroup } = require("../../models/admin/attr_Group");
const { attr } = require("../../models/admin/attr");

const seq = require("sequelize");
const Op = seq.Op;

const GoodsService = {
  getGroupList: async () => {
    return attrGroup.findAll();
  },
  getAttrGroup: async (level, ID) => {
    switch (level) {
      case "1":
        return attrGroup.findAll({
          where: { dflID: ID },
        });
      case "2":
        return attrGroup.findAll({
          where: { zflID: ID },
        });
      case "3":
        return attrGroup.findAll({
          where: { xflID: ID },
        });
      default:
        return "错误";
    }
  },
  addGroup: async ({ attr_Group_Name, classificationID }) => {
    return attrGroup.create({
      attr_Group_Name,
      dflID: classificationID[0],
      zflID: classificationID[1],
      xflID: classificationID[2],
    });
  },
  searchName: async (Name) => {
    return attrGroup.findAll({
      where: {
        attr_Group_Name: {
          [Op.like]: `%${Name}%`,
        },
      },
    });
  },
  putGroup: (attr_Group_Name, dflID, zflID, xflID, attr_Group_ID) => {
    return attrGroup.update(
      { attr_Group_Name, dflID, zflID, xflID },
      {
        where: {
          attr_Group_ID,
        },
      }
    );
  },
  delGroup: (attr_Group_ID) => {
    return attrGroup.destroy({ where: { attr_Group_ID } });
  },
  getAttrList: async () => {
    return attr.findAll();
  },
  addAttr: async ({
    attr_Name,
    attr_Type,
    enable,
    value_Select,
    value_Type,
    xflID,
  }) => {
    let value = "";
    for (let i = 0; i < value_Select.length; i++) {
      value += value_Select[i] + ";";
    }
    return attr.create({
      attr_Name,
      attr_Type,
      enable,
      value_Select: value,
      value_Type,
      xflID: xflID[2],
    });
  },
};

module.exports = GoodsService;
