var express = require("express");
var GoodsRoute = express.Router();
const GoodsController = require("../../controllers/admin/GoodsController");

GoodsRoute.post(
  "/goods/getGroupByxflID/:xflID",
  GoodsController.getGroupByxflID
);

GoodsRoute.post(
  "/goods/getSalaAttrByxflID/:xflID",
  GoodsController.getSalaAttrByxflID
);

module.exports = GoodsRoute;
