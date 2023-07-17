const ClassificationService = require("../../services/admin/ClassificationService");
require("../../util/JWT");

const ClassificationController = {
  getList: async (req, res) => {
    let classificationData;
    let arr;
    await ClassificationService.getDFLList().then(async (res) => {
      classificationData = JSON.parse(JSON.stringify(res));
      for (let key in classificationData) {
        await ClassificationService.getZFLList(
          classificationData[key]["ID"]
        ).then(async (res) => {
          arr = JSON.parse(JSON.stringify(res));
          classificationData[key]["children"] = [];
          for (let i in arr) {
            classificationData[key]["children"].push(arr[i]);
          }
          for (let i in classificationData[key]["children"]) {
            await ClassificationService.getXFLList(
              classificationData[key]["children"][i]["ID"]
            ).then((res) => {
              arr = JSON.parse(JSON.stringify(res));
              classificationData[key]["children"][i]["children"] = [];
              for (let j in arr) {
                classificationData[key]["children"][i]["children"].push(arr[j]);
              }
            });
          }
        });
      }
    });
    res.send({
      code: 200,
      msg: "成功！",
      data: classificationData,
    });
  },
  addClass: async (req, res) => {
    await ClassificationService.addClass(req.body).then((resp) => {
      console.log("res:", resp);
      res.send({
        code: 200,
        msg: "添加成功",
        data: resp,
      });
    });
  },
  editClass: async (req, res) => {
    await ClassificationService.editClass(req.body).then((resp) => {
      res.send({
        code: 200,
        msg: "成功",
      });
    });
  },
  delClass: async (req, res) => {
    switch (req.params.level) {
      case "1":
        await ClassificationService.getZFLList(req.params.ID).then(
          async (resp) => {
            JSON.stringify(resp) != "[]"
              ? res.send({
                  code: 300,
                  msg: "存在值，不能删除",
                })
              : await ClassificationService.delClass(req.params).then(
                  (resp) => {
                    res.send({
                      code: 200,
                      msg: "成功",
                    });
                  }
                );
          }
        );
        break;
      case "2":
        await ClassificationService.getXFLList(req.params.ID).then(
          async (resp) => {
            JSON.stringify(resp) != "[]"
              ? res.send({
                  code: 300,
                  msg: "存在值，不能删除",
                })
              : await ClassificationService.delClass(req.params).then(
                  (resp) => {
                    res.send({
                      code: 200,
                      msg: "成功",
                    });
                  }
                );
          }
        );
        break;
      case "3":
        await ClassificationService.delClass(req.params).then((resp) => {
          res.send({
            code: 200,
            msg: "成功",
          });
        });
        break;
      default:
        res.send({
          code: 300,
          msg: "未知错误",
        });
        break;
    }
  },
};

module.exports = ClassificationController;
