// 使用 ES6 的默认导入语法
import express from "express";

import UserRouter from "./router/User/index.js";
import MenuRouter from "./router/Menu/index.js";
import { CheckToken, LogMessage } from "./utils/index.js";
import { Update } from "./router/Global/index.js";
import { Login } from "./service/User/index.js";
import cors from "cors";
import path from "path";

LogMessage();

const app = express();

app.use(cors());
app.use(express.json());

//测试请求
// app.put("/menu/update", function(request, response) {
//   // response.setHeader('Content-Type', 'text/plain')
//   // const { authorization } = request.headers;
//   console.log("response.body", request.body)
//   console.log("request.headers", request.headers)
//   response.send({
//     status: 200,
//     message: "获取成功",
//     data: "rows",
//   });
// });

app.post("/login", Login);
app.post("/upload", Update);
const publicPath = path.resolve('static');
app.use(express.static(publicPath));//加载静态资源
//校验 token 有效期
app.use(CheckToken);
app.use("/user", UserRouter);
app.use("/menu", MenuRouter);

const port = 9000;

app.listen(port, () => {
  console.log(`(ง •_•)ง Server running at http://127.0.0.1:${ port }`);
});
