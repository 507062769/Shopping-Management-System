const UserService = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");
require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    // 从前端接收到数据，并传到service层，到数据库中增删改查，得到一个结果
    const result = await UserService.login(req.body);
    const data = result.dataValues;
    // 根据返回的结果 做响应
    if (!result) {
      res.send({
        code: "-1",
        error: "账号密码不匹配",
      });
    } else {
      const token = JWT.generate(
        {
          uid: data.uid,
          userName: data.userName,
          passWord: data.passWord,
        },
        "1h"
      );
      res.header("Authorization", token);
      res.send({
        code: "200",
        msg: "登录成功",
        data: {
          uid: data.uid,
          userName: data.userName,
          sex: data.sex,
          avatar: data.avatar,
          role: data.role,
        },
      });
    }
  },
  upload: async (req, res) => {
    const { userName, sex } = req.body;
    const avatar = req.file ? `/avatarUpload/${req.file.filename}` : "";
    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);

    await UserService.upload({
      uid: payload.uid,
      userName,
      sex: Number(sex),
      avatar,
    });
    if (avatar) {
      res.send({
        code: "200",
        msg: "成功",
        data: {
          uid: payload.uid,
          userName,
          sex: Number(sex),
          avatar,
        },
      });
    } else {
      res.send({
        code: "200",
        msg: "成功",
        data: {
          uid: payload.uid,
          userName,
          sex: Number(sex),
        },
      });
    }
  },
  add: async (req, res) => {
    const { userName, passWord, sex, role } = req.body;
    const avatar = req.file ? `/avatarUpload/${req.file.filename}` : "";
    const result = await UserService.add({
      userName,
      passWord,
      sex: Number(sex),
      role: Number(role),
      avatar,
    });
    console.log("reult:", result);
    res.send({
      code: "200",
      msg: "添加成功",
    });
  },
  getList: async (req, res) => {
    const result = await UserService.getList();
    if (result) {
      res.send({
        code: "200",
        msg: "成功",
        data: result,
      });
    }
  },
  delList: async (req, res) => {
    const result = await UserService.delList(req.params.uid);
    if (result) {
      res.send({
        code: "200",
        msg: "成功",
      });
    } else {
      res.send({
        code: "301",
        msg: "失败",
      });
    }
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);
    console.log("rererere::", result);
    if (result) {
      res.send({
        code: "200",
        msg: "成功",
      });
    } else {
      res.send({
        code: "301",
        msg: "失败",
      });
    }
  },
};

module.exports = UserController;
