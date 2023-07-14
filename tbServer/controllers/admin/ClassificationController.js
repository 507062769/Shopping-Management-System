const ClassificationService = require("../../services/admin/ClassificationService");
const JWT = require("../../util/JWT");
require("../../util/JWT");

const ClassificationController = {
  getList: async (req, res) => {
    let classificationData;
    await ClassificationService.getDFLList().then(async (res) => {
      classificationData = JSON.parse(JSON.stringify(res));
      for (let key in classificationData) {
        await ClassificationService.getZFLList(
          classificationData[key]["dflID"]
        ).then(async (res) => {
          classificationData[key]["children"] = JSON.stringify(res);

          for (let i in JSON.parse(classificationData[key]["children"])) {
            await ClassificationService.getXFLList(
              JSON.parse(classificationData[key]["children"])[i]["zflID"]
            ).then((res) => {
              JSON.parse(classificationData[key]["children"])[i]["children"] = {
                xx: 1,
              };
              console.log(
                "看看：",
                JSON.parse(classificationData[key]["children"])[i]["children"]
              );
            });
          }
        });
      }
      // console.log("~~~:", classificationData);
    });
    // console.log("数据：", classificationData);
  },
};

module.exports = ClassificationController;
