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
    for (let i = 0; i < req.body.length; i++) {
      await GoodsService.delGroup(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  getRelevance: async (req, res) => {
    const attrData = [];
    await GoodsService.getRelevance(req.params.groupID).then(async (resp) => {
      for (let i = 0; i < resp.length; i++) {
        await GoodsService.getAttrByID(resp[i].dataValues.attr_ID).then(
          (respo) => {
            attrData.push(respo[0]);
          }
        );
      }
      res.send({
        code: 200,
        msg: "成功",
        data: attrData,
      });
    });
  },

  getAttrList: async (req, res) => {
    await GoodsService.getAttrList(req.query.attr_Type).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  getAttr: async (req, res) => {
    await GoodsService.getAttr(
      req.params.level,
      req.params.id,
      req.body.attr_Type
    ).then((resp) => {
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
        data: resp,
      });
    });
  },
  searchAttrName: async (req, res) => {
    await GoodsService.searchAttrName(
      req.body.searchName,
      req.body.attr_Type
    ).then((resp) => {
      res.send({
        code: 200,
        msg: "搜索成功",
        data: resp,
      });
    });
  },
  delAttr: async (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
      await GoodsService.delAttr(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },

  addRelation: async (req, res) => {
    await GoodsService.addRelation(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  getRelationList: async (req, res) => {
    await GoodsService.getRelationList().then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
};

module.exports = GoodsController;
