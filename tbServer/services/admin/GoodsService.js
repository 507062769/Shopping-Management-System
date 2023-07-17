const { attrGroup } = require("../../models/admin/attr_Group");

const GoodsService = {
  getAttrGroup: async (ID) => {
    console.log("我getAttr被调用了");
    return attrGroup.findAll({
      where: { xflID: ID },
    });
  },
};

module.exports = GoodsService;
