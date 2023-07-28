const GoodsService = require("../../services/admin/GoodsService");
require("../../util/JWT");

const GoodsController = {
  getGroupByxflID: async (req, res) => {
    const attrGroup = [];
    await GoodsService.getGroupByxflID(req.params.xflID).then(async (resp) => {
      for (let i = 0; i < resp.length; i++) {
        attrGroup.push(resp[i].dataValues);
        await GoodsService.getAttrByGroupID(attrGroup[i].attr_Group_ID).then(
          async (respo) => {
            const attr = [];
            if (respo.length !== 0) {
              for (let j = 0; j < respo.length; j++) {
                await GoodsService.getAttrNameByAttrID(
                  respo[j].dataValues.attr_ID
                ).then((response) => {
                  if (resp[i].attr_Group_ID === respo[j].attr_Group_ID) {
                    attr.push(response[0].dataValues);
                    attrGroup[i]["attr"] = attr;
                  }
                });
              }
            }
          }
        );
      }
    });
    res.send({
      code: 200,
      msg: "成功",
      data: attrGroup,
    });
  },
  getSalaAttrByxflID: async (req, res) => {
    await GoodsService.getSalaAttrByxflID(req.params.xflID).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
};

module.exports = GoodsController;
