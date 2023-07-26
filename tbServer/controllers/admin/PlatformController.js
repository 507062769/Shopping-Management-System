const PlatformService = require("../../services/admin/PlatformService");
require("../../util/JWT");

const PlatformController = {
  getGroupList: async (req, res) => {
    await PlatformService.getGroupList().then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  getAttrGroup: async (req, res) => {
    await PlatformService.getAttrGroup(req.params.id).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  addGroup: async (req, res) => {
    await PlatformService.addGroup(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  searchName: async (req, res) => {
    await PlatformService.searchName(req.params.name).then((resp) => {
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

    await PlatformService.putGroup(
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
      await PlatformService.delGroup(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  getRelevance: async (req, res) => {
    const attrData = [];
    await PlatformService.getRelevance(req.params.groupID).then(
      async (resp) => {
        for (let i = 0; i < resp.length; i++) {
          await PlatformService.getAttrByID(resp[i].dataValues.attr_ID).then(
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
      }
    );
  },

  getAttrList: async (req, res) => {
    await PlatformService.getAttrList(req.query.attr_Type).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  getAttr: async (req, res) => {
    await PlatformService.getAttr(
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
    await PlatformService.addAttr(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  putAttr: async (req, res) => {
    await PlatformService.putAttr(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
      });
    });
  },
  searchAttrName: async (req, res) => {
    await PlatformService.searchAttrName(
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
    console.log("控制层受到：", req.body);
    for (let i = 0; i < req.body.length; i++) {
      await PlatformService.delAttr(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },

  addRelation: async (req, res) => {
    req.body.forEach(async (val) => {
      await PlatformService.addRelation(val).then((resp) => {});
    });
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  getRelationList: async (req, res) => {
    await PlatformService.getRelationList().then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      });
    });
  },
  putRelation: async (req, res) => {
    await PlatformService.putRelation(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
      });
    });
  },
  delRelevanceByAttr: async (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
      await PlatformService.delRelevanceByAttr(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  delRelevanceByGroup: async (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
      await PlatformService.delRelevanceByGroup(req.body[i]);
    }
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  getNotGroupRelation: async (req, res) => {
    const data = [];
    await PlatformService.getRelationIDByID().then((resp) => {
      resp.forEach((val) => data.push(val.dataValues.attr_ID));
    });
    await PlatformService.getAttrByXflID(
      req.query.currentGroup.xflID,
      data
    ).then((resp) =>
      res.send({
        code: 200,
        msg: "成功",
        data: resp,
      })
    );
  },
};

module.exports = PlatformController;
