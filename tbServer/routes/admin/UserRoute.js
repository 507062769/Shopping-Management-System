var express = require("express");
const UserController = require("../../controllers/admin/UserController");
var UserRoute = express.Router();
// 图片上传所属模块
const multer = require("multer");
const upload = multer({ dest: "public/avatarUpload" }); //编译后存放的路径

UserRoute.post("/user/login", UserController.login);
UserRoute.post(
  "/user/upload",
  upload.single("avatarFile"), //图片上传所需的中间件，若传回来的值不存在就会报错，存在就会将他编译成我们需要的值
  UserController.upload
);
UserRoute.post(
  "/user/add",
  upload.single("avatarFile"), //图片上传所需的中间件，若传回来的值不存在就会报错，存在就会将他编译成我们需要的值
  UserController.add
);
UserRoute.get("/user/list", UserController.getList);
UserRoute.delete("/user/list/:uid", UserController.delList);
UserRoute.put("/user/list", UserController.putList);

module.exports = UserRoute;
