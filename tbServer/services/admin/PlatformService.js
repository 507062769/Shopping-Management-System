const { attrGroup } = require("../../models/admin/attr_Group");
const { attr } = require("../../models/admin/attr");
const { attrGroupRelation } = require("../../models/admin/attr_group_relation");

const seq = require("sequelize");
const Op = seq.Op;

const PlatformService = {
  getGroupList: async () => {
    return attrGroup.findAll();
  },
  getAttrGroup: async (xflID) => {
    return attrGroup.findAll({
      where: { xflID },
    });
  },
  addGroup: async ({ attr_Group_Name, classificationID }) => {
    return attrGroup.create({
      attr_Group_Name,
      dflID: classificationID[0],
      zflID: classificationID[1],
      xflID: classificationID[2],
    });
  },
  searchName: async (name) => {
    return attrGroup.findAll({
      where: {
        attr_Group_Name: {
          [Op.like]: `%${name}%`,
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
  delGroup: ({ attr_Group_ID }) => {
    return attrGroup.destroy({ where: { attr_Group_ID } });
  },
  getRelevance: async (attr_Group_ID) => {
    return attrGroupRelation.findAll({
      where: { attr_Group_ID },
    });
  },

  getAttrList: async (attr_Type) => {
    return attr.findAll({ where: { attr_Type } });
  },
  addAttr: async ({
    attr_Name,
    attr_Type,
    enable,
    value_Select,
    value_Type,
    classifition,
  }) => {
    let value = "";
    for (let i = 0; i < value_Select.length; i++) {
      value += value_Select[i] + "，";
    }
    return attr.create({
      attr_Name,
      attr_Type,
      enable,
      value_Select: value,
      value_Type,
      dflID: classifition[0],
      zflID: classifition[1],
      xflID: classifition[2],
    });
  },
  putAttr: async ({
    attr_ID,
    attr_Name,
    attr_Type,
    value_Type,
    value_Select,
    xflID,
    enable,
  }) => {
    return attr.update(
      {
        attr_Name,
        attr_Type,
        value_Type,
        value_Select,
        xflID,
        enable,
      },
      { where: { attr_ID } }
    );
  },
  getAttr: async (level, ID, attr_Type) => {
    switch (level) {
      case "1":
        return attr.findAll({
          where: { dflID: ID, attr_Type },
        });
      case "2":
        return attr.findAll({
          where: { zflID: ID, attr_Type },
        });
      case "3":
        return attr.findAll({
          where: { xflID: ID, attr_Type },
        });
      default:
        return "错误";
    }
  },
  getAttrByID: async (attr_ID) => {
    return attr.findAll({
      where: { attr_ID },
    });
  },
  delAttr: async (attr_ID) => {
    return attr.destroy({ where: { attr_ID } });
  },
  searchAttrName: async (Name, type) => {
    return attr.findAll({
      where: {
        attr_Name: {
          [Op.like]: `%${Name}%`,
        },
        attr_Type: {
          [Op.like]: `%${type}%`,
        },
      },
    });
  },
  delAttr: ({ attr_ID }) => {
    return attr.destroy({ where: { attr_ID } });
  },

  addRelation: async ({ attr_ID, attr_Group_ID }) => {
    return attrGroupRelation.create({
      attr_ID,
      attr_Group_ID,
    });
  },
  putRelation: ({ attr_ID, attr_group_ID }) => {
    return attrGroupRelation.update(
      {
        attr_ID,
        attr_Group_ID: attr_group_ID,
      },
      {
        where: {
          attr_ID,
        },
      }
    );
  },
  getRelationList: async () => {
    return attrGroupRelation.findAll();
  },
  delRelevanceByAttr: async ({ attr_ID }) => {
    return attrGroupRelation.destroy({
      where: {
        attr_ID,
      },
    });
  },
  delRelevanceByGroup: async ({ attr_Group_ID }) => {
    return attrGroupRelation.destroy({
      where: { attr_Group_ID },
    });
  },
  getRelationIDByID: async () => {
    return attrGroupRelation.findAll({
      attributes: ["attr_ID"],
    });
  },
  getAttrByXflID: async (xflID, attr_IDList) => {
    return attr.findAll({
      where: {
        xflID: {
          [Op.eq]: xflID,
        },
        attr_ID: {
          [Op.notIn]: attr_IDList,
        },
      },
    });
  },
};

module.exports = PlatformService;
