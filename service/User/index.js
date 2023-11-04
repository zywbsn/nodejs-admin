import query from "../../db/index.js";
import {GetUuid} from "../../utils/index.js";

const Table = "user_list";//数据表

//登录
export const Login = async (request, response) => {
  const {username, password} = request.body;
  const sql = `select * from ${Table} where username = "${username}"`;
  console.log("sql", sql);
  console.log("password",password)
  try {
    const {rows} = await query(sql);
    const result = JSON.parse(JSON.stringify(rows));
    if(result[0].password !== password) {
      response.send({
        status: 200,
        message: "请求成功",
        data: "密码错误",
      });
      return;
    }
    response.send({
      status: 200,
      message: "请求成功",
      data: result[0]
    });
  } catch(err) {
    response.send({
      status: -1,
      message: '请求失败~~',
      desc: err.message,
    });
  }
};

//删除用户
export const DeleteUser = async (request, response) => {
  const {id} = request.query;
  const sql = `delete from ${Table} where id = ${id}`;
  console.log("sql", sql);
  try {
    const {rows} = await query(sql);
    response.send({
      status: 200,
      message: "请求成功",
      data: rows,
    });
  } catch(err) {
    response.send({
      status: -1,
      message: '请求失败~~',
      desc: err.message,
    });
  }
};

//更新用户
export const UpdateUser = async (request, response) => {
  const {id, nickname, username, password, phone, rule} = request.body;
  const sql = `update ${Table} set nickname="${nickname}",username="${username}",password="${password}",phone="${phone}",rule="${rule}" where id=${id}`;
  console.log("Sql",sql)
  try {
    const {rows} = await query(sql);
    response.send({
      status: 200,
      message: "请求成功",
      data: rows,
    });
  } catch(err) {
    response.send({
      status: -1,
      message: '请求失败~~',
      desc: err.message,
    });
  }
};

//创建用户
export const CreateUser = async (request, response) => {
  const {nickname, username, password, phone, rule} = request.body;
  const sql = `insert into  ${Table} set nickname="${nickname}",username="${username}",password="${password}",phone="${phone}",rule="${rule}",identity="${GetUuid
()}"`;
  console.log("sql", sql);

  try {
    const {rows} = await query(sql);
    response.send({
      status: 200,
      message: "请求成功",
      data: rows,
    });
  } catch(err) {
    response.send({
      status: -1,
      message: '请求失败~~',
      desc: err.message,
    });
  }
};

//查询用户列表
export async function GetUserList(req, res) {
  const {page, size, nickname = "", username=""} = req.query;
  const sql = `select * from ${Table} where nickname like "%${nickname}%" and username like "%${username}%" limit ${parseInt(size)} offset ${(parseInt(page) - 1) * parseInt(size)}`;
  console.log("sql", sql);
  try {
    const {rows} = await query(sql);
    res.send({
      status: 200,
      message: "请求成功",
      data: {
        list: rows
      },
    })
  } catch(err) {
    res.send({
      status: -1,
      message: '请求失败',
      desc: err.message,
    })
  }
}
