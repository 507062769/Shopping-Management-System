var express = require("express");
var GoodsRoute = express.Router();
const GoodsController = require("../../controllers/admin/GoodsController");

GoodsRoute.get("/Goods/attr_group/getGroupList", GoodsController.getGroupList);

GoodsRoute.post(
  "/Goods/attr_group/getGroup/:level/:id",
  GoodsController.getAttrGroup
);
GoodsRoute.post("/Goods/attr_group/addGroup", GoodsController.addGroup);

GoodsRoute.post(
  "/Goods/attr_group/searchName/:name",
  GoodsController.searchName
);

GoodsRoute.put("/Goods/attr_group/putGroup", GoodsController.putGroup);

GoodsRoute.delete("/Goods/attr_group/delGroup", GoodsController.delGroup);

GoodsRoute.get("/Goods/attr/getAttrList", GoodsController.getAttrList);

GoodsRoute.post("/Goods/attr/addAttr", GoodsController.addAttr);

GoodsRoute.post(
  "/Goods/attr_group_relation/addRelation",
  GoodsController.addRelation
);

GoodsRoute.get(
  "/Goods/attr_group_relation/getList",
  GoodsController.getRelationList
);

module.exports = GoodsRoute;
