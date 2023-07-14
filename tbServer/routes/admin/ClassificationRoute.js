var express = require("express");
var ClassificationRoute = express.Router();
const ClassificationController = require("../../controllers/admin/ClassificationController");

ClassificationRoute.get(
  "/classification/list",
  ClassificationController.getList
);

module.exports = ClassificationRoute;