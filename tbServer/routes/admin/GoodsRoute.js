var express = require("express");
var GoodsRoute = express.Router();
const GoodsController = require("../../controllers/admin/GoodsController");

GoodsRoute.get("/Goods/attr_group/getGroupList", GoodsController.getGroupList);

GoodsRoute.post("/Goods/attr_group/getGroup/:id", GoodsController.getAttrGroup);
GoodsRoute.post("/Goods/attr_group/addGroup", GoodsController.addGroup);

GoodsRoute.post(
  "/Goods/attr_group/searchName/:name",
  GoodsController.searchName
);

GoodsRoute.put("/Goods/attr_group/putGroup", GoodsController.putGroup);

GoodsRoute.delete("/Goods/attr_group/delGroup", GoodsController.delGroup);

GoodsRoute.post(
  "/Goods/attr_group/getRelevance/:groupID",
  GoodsController.getRelevance
);

GoodsRoute.get("/Goods/attr/getAttrList", GoodsController.getAttrList);

GoodsRoute.post("/Goods/attr/getAttr/:level/:id", GoodsController.getAttr);

GoodsRoute.post("/Goods/attr/addAttr", GoodsController.addAttr);

GoodsRoute.put("/Goods/attr/putAttr", GoodsController.putAttr);

GoodsRoute.post("/Goods/attr/searchName", GoodsController.searchAttrName);

GoodsRoute.delete("/Goods/attr/delAttr", GoodsController.delAttr);

GoodsRoute.post(
  "/Goods/attr_group_relation/addRelation",
  GoodsController.addRelation
);

GoodsRoute.get(
  "/Goods/attr_group_relation/getList",
  GoodsController.getRelationList
);

GoodsRoute.put(
  "/Goods/attr_group_relation/putRelation",
  GoodsController.putRelation
);

GoodsRoute.delete(
  "/Goods/attr_group_relation/delRelevance",
  GoodsController.delRelevance
);

GoodsRoute.get(
  "/Goods/attr_group_relation/getNotGroupRelation",
  GoodsController.getNotGroupRelation
);

module.exports = GoodsRoute;
