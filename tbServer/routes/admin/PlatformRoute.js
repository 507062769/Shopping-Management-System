var express = require("express");
var PlatformRoute = express.Router();
const PlatformController = require("../../controllers/admin/PlatformController");

PlatformRoute.get(
  "/Platform/attr_group/getGroupList",
  PlatformController.getGroupList
);

PlatformRoute.post(
  "/Platform/attr_group/getGroup/:id",
  PlatformController.getAttrGroup
);
PlatformRoute.post(
  "/Platform/attr_group/addGroup",
  PlatformController.addGroup
);

PlatformRoute.post(
  "/Platform/attr_group/searchName/:name",
  PlatformController.searchName
);

PlatformRoute.put("/Platform/attr_group/putGroup", PlatformController.putGroup);

PlatformRoute.delete(
  "/Platform/attr_group/delGroup",
  PlatformController.delGroup
);

PlatformRoute.post(
  "/Platform/attr_group/getRelevance/:groupID",
  PlatformController.getRelevance
);

PlatformRoute.get("/Platform/attr/getAttrList", PlatformController.getAttrList);

PlatformRoute.post(
  "/Platform/attr/getAttr/:level/:id",
  PlatformController.getAttr
);

PlatformRoute.post("/Platform/attr/addAttr", PlatformController.addAttr);

PlatformRoute.put("/Platform/attr/putAttr", PlatformController.putAttr);

PlatformRoute.post(
  "/Platform/attr/searchName",
  PlatformController.searchAttrName
);

PlatformRoute.delete("/Platform/attr/delAttr", PlatformController.delAttr);

PlatformRoute.post(
  "/Platform/attr_group_relation/addRelation",
  PlatformController.addRelation
);

PlatformRoute.get(
  "/Platform/attr_group_relation/getList",
  PlatformController.getRelationList
);

PlatformRoute.put(
  "/Platform/attr_group_relation/putRelation",
  PlatformController.putRelation
);

PlatformRoute.delete(
  "/Platform/attr_group_relation/delRelevanceByAttr",
  PlatformController.delRelevanceByAttr
);

PlatformRoute.delete(
  "/Platform/attr_group_relation/delRelevanceByGroup",
  PlatformController.delRelevanceByGroup
);

PlatformRoute.get(
  "/Platform/attr_group_relation/getNotGroupRelation",
  PlatformController.getNotGroupRelation
);

module.exports = PlatformRoute;
