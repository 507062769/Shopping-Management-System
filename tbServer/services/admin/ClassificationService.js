const { DFL } = require("../../models/admin/fl_d");
const { ZFL } = require("../../models/admin/fl_z");
const { XFL } = require("../../models/admin/fl_x");

const ClassificationService = {
  getDFLList: async () => {
    return DFL.findAll();
  },
  getZFLList: async (id) => {
    return ZFL.findAll({
      where: { dflID: id },
    });
  },
  getXFLList: async (id) => {
    return XFL.findAll({
      where: { zflID: id },
    });
  },
  addClass: async ({ Name, level, parentID }) => {
    switch (level) {
      case 0:
        return DFL.create({
          Name,
        });
      case 1:
        return ZFL.create({
          Name,
          dflID: parentID,
        });
      case 2:
        return XFL.create({
          Name,
          zflID: parentID,
        });
      default:
        return "错误";
    }
  },
  editClass: async ({ ID, Name, level }) => {
    switch (level) {
      case 1:
        return DFL.update({ Name }, { where: { ID } });
      case 2:
        return ZFL.update({ Name }, { where: { ID } });
      case 3:
        return XFL.update({ Name }, { where: { ID } });
      default:
        break;
    }
  },
  delClass: async ({ ID, level }) => {
    console.log("ID,level:", ID, typeof level);
    switch (level) {
      case "1":
        return DFL.destroy({ where: { ID } });
      case "2":
        return ZFL.destroy({ where: { ID } });
      case "3":
        return XFL.destroy({ where: { ID } });
      default:
        return "错误";
    }
  },
};

module.exports = ClassificationService;
