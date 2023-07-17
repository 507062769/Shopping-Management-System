var express = require("express");
var GoodsRoute = express.Router();
const GoodsController = require("../../controllers/admin/GoodsController");

GoodsRoute.post("/Goods/attr_group/:id", GoodsController.getAttrGroup);

module.exports = GoodsRoute;
