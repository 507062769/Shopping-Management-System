const { User } = require("../../models/admin/User");

const UserService = {
  login: async ({ userName, passWord }) => {
    return User.findOne({ where: { userName, passWord } });
  },
  upload: async ({ uid, userName, sex, avatar }) => {
    if (avatar) {
      return User.update(
        { userName, sex, avatar },
        {
          where: { uid: uid },
        }
      );
    } else {
      return User.update(
        { userName, sex },
        {
          where: { uid: uid },
        }
      );
    }
  },
  add: async ({ userName, passWord, sex, role, avatar }) => {
    return User.create({
      userName,
      passWord,
      sex,
      role,
      avatar,
    });
  },
  getList: async () => {
    return User.findAll();
  },
  delList: async (uid) => {
    return User.destroy({ where: { uid } });
  },
  putList: async ({ uid, userName, passWord, sex, role }) => {
    return User.update(
      { userName, passWord, sex, role },
      {
        where: { uid },
      }
    );
  },
};

module.exports = UserService;
