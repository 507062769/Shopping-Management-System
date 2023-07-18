const { attrGroup } = require("../../models/admin/attr_Group");
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
};

module.exports = GoodsService;
