const GoodsService = require("../../services/admin/GoodsService");
require("../../util/JWT");

const GoodsController = {
  getAttrGroup: async (req, res) => {
    await GoodsService.getAttrGroup(req.params.id).then((resp) => {
      console.log("resp:", resp);
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
};

module.exports = GoodsController;
