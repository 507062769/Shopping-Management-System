var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const JWT = require("./util/JWT");
require("./models/DBinit");
require("./models/admin/User");
// const bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ entended: false }));

/*
/adminAPI  后台管理用的
/webAPI   前台官网用的
*/

app.use((req, res, next) => {
  // 当跳转路径为login时，代表还没创建token，直接放行
  if (req.url === "/adminAPI/user/login") {
    next();
    return;
  }
  // 否则就是跳到其他页面，都必须携带token
  const token = req.headers["authorization"].split(" ")[1];
  // 若tokne存在
  if (token) {
    // 解密token
    const payload = JWT.verify(token);
    if (payload) {
      //解密成功时,以解密后的老token为值，创建1个新token，并添加到请求头中
      const newToken = JWT.generate(
        {
          uid: payload.uid,
          userName: payload.userName,
          passWord: payload.passWord,
        },
        "1h"
      );
      res.header("Authorization", newToken);
      next();
    } else res.status(401).send({ code: "-1", msg: "token已过期！" });
  }
});

app.use("/adminAPI", require("./routes/admin/UserRoute"));
app.use("/adminAPI", require("./routes/admin/ClassificationRoute"));
app.use("/adminAPI", require("./routes/admin/PlatformRoute"));
app.use("/adminAPI", require("./routes/admin/GoodsRoute"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
