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
            const v = [];
            if (respo.length !== 0) {
              for (let j = 0; j < respo.length; j++) {
                await GoodsService.getAttrNameByAttrID(
                  respo[j].dataValues.attr_ID
                ).then((response) => {
                  if (resp[i].attr_Group_ID === respo[i].attr_Group_ID) {
                    v.push(response[0].dataValues);
                    attrGroup[i]["attr"] = v;
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
};

module.exports = GoodsController;
