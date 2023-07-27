var express = require("express");
var GoodsRoute = express.Router();
const GoodsController = require("../../controllers/admin/GoodsController");

GoodsRoute.post(
  "/goods/getGroupByxflID/:xflID",
  GoodsController.getGroupByxflID
);

module.exports = GoodsRoute;
