var express = require("express");
var ClassificationRoute = express.Router();
const ClassificationController = require("../../controllers/admin/ClassificationController");

ClassificationRoute.get(
  "/classification/list",
  ClassificationController.getList
);

ClassificationRoute.post(
  "/classification/addClass",
  ClassificationController.addClass
);

ClassificationRoute.post(
  "/classification/editClass",
  ClassificationController.editClass
);
ClassificationRoute.delete(
  "/classification/delClass/:level/:ID",
  ClassificationController.delClass
);

module.exports = ClassificationRoute;
