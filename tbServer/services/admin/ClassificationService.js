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
};

module.exports = ClassificationService;
