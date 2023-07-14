const ClassificationService = require("../../services/admin/ClassificationService");
const JWT = require("../../util/JWT");
require("../../util/JWT");

const ClassificationController = {
  getList: async (req, res) => {
    let classificationData = [];

    getDflList(classificationData);

    setInterval(() => {
      console.log("！！！！", classificationData);
    }, 1000);
    // console.log("classificationData:", getDflList(classificationData));

    // let a = await ClassificationService.getZFLList(
    //     classificationData[index].dflID
    //   );
    //   classificationData[index]["children"] = arrToObj(a);

    // console.log("最终结果为", classificationData);
    // res.send({
    //   code: "200",
    //   msg: "成功",
    //   data: classificationData,
    // });
    res.send({
      code: "200",
      msg: "成功",
      data: classificationData,
    });
  },
};

function arrToObj(arr) {
  let obj = [];
  arr.forEach((item, i) => {
    obj.push(item.dataValues);
  });
  return JSON.stringify(obj);
}

async function getDflList(obj) {
  const result = await ClassificationService.getDFLList();
  result.forEach((item, index) => {
    obj.push(item.dataValues);
  });
  console.log("@@", obj);
  //   return obj;
}

module.exports = ClassificationController;
