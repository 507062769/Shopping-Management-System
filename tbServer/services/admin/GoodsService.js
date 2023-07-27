const { attr } = require("../../models/admin/attr");
const { attrGroup } = require("../../models/admin/attr_Group");
const { attrGroupRelation } = require("../../models/admin/attr_group_relation");
const seq = require("sequelize");
const Op = seq.Op;

const GoodsService = {
  getGroupByxflID: async (xflID) => {
    return attrGroup.findAll({ where: { xflID } });
  },
  getAttrByGroupID: async (attr_Group_ID) => {
    return attrGroupRelation.findAll({ where: { attr_Group_ID } });
  },
  getAttrNameByAttrID: async (attr_ID) => {
    return attr.findAll({ where: { attr_ID } });
  },
};

module.exports = GoodsService;
