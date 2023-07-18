const GoodsService = require("../../services/admin/GoodsService");
require("../../util/JWT");

const GoodsController = {
  getGroupList: async (req, res) => {
    await GoodsService.getGroupList().then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  getAttrGroup: async (req, res) => {
    await GoodsService.getAttrGroup(req.params.level, req.params.id).then(
      (resp) => {
        res.send({
          code: 200,
          msg: "成功",
          data: resp,
        });
      }
    );
  },
  addGroup: async (req, res) => {
    await GoodsService.addGroup(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  searchName: async (req, res) => {
    await GoodsService.searchName(req.params.name).then((resp) => {
      res.send({
        code: 200,
        msg: "搜索成功",
        data: resp,
      });
    });
  },
  putGroup: async (req, res) => {
    const { attr_Group_Name, classificationID, attr_Group_ID } = req.body;
    const dflID = classificationID[0];
    const zflID = classificationID[1];
    const xflID = classificationID[2];

    await GoodsService.putGroup(
      attr_Group_Name,
      dflID,
      zflID,
      xflID,
      attr_Group_ID
    ).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
      });
    });
  },
  delGroup: async (req, res) => {
    console.log("接受到了数据：", req.body);
    for (let i = 0; i < req.body.length; i++) {
      await GoodsService.delGroup(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },

  getAttrList: async (req, res) => {
    await GoodsService.getAttrList().then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  addAttr: async (req, res) => {
    await GoodsService.addAttr(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
      });
    });
  },
};

module.exports = GoodsController;
