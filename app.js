import {Login} from "./service/User/index.js";

LogMessage();

// 使用 ES6 的默认导入语法
import express from "express";

import UserRouter from "./router/User/index.js";
import MenuRouter from "./router/Menu/index.js";
import {LogMessage} from "./utils/index.js";



const app = express();

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

app.use("/user", UserRouter);
app.use("/menu", MenuRouter);
app.post('/login', Login);

const port = 9000;

app.listen(port, () => {
  console.log(`(ง •_•)ง  Server running at http://127.0.0.1:${port}`);
});
