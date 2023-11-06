import fs from "fs";
import formidable from "formidable";

//登录
export const Update = async (request, response, next) => {
  const form = formidable({ multiple: true });
  // form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = "static/images/";     //设置上传目录
  // form.keepExtensions = true;     //保留后缀
  // form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  form.parse(request, (err, fields, files) => {
    if(err) {
      response.statusCode = 500;
      response.send('解析请求体失败', err);
      return;
    }
    const file = JSON.parse(JSON.stringify(files.file[0]));
    var extName = '';  //后缀名
    switch(file.mimetype) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    const image = ["jpg", "png"];
    const name = `${image.includes(extName) ? "image" : ""}_${new Date().getTime()}.${extName}`;//整理名称

    const path = form.uploadDir + name;
    fs.renameSync(file.filepath, path);  //重命名
    // 处理其他数据
    // const otherData = fields.otherData;
    // console.log("otherData", otherData);
    response.send({
      status: 200,
      message: "请求成功",
      data: {
        path,
        file
      }
    });
  });
  //
  // const { username, password } = request.body;
  // const sql = `select * from ${Table} where username = "${username}"`;
  // const token = GetToken();
  // console.log("token", token);
  // try {
  //   const { rows } = await query(sql);
  //   const result = JSON.parse(JSON.stringify(rows));
  //   if(result[0].password !== password) {
  //     response.send({
  //       status: 200,
  //       message: "请求成功",
  //       data: "密码错误"
  //     });
  //     return;
  //   }
  //   response.send({
  //     status: 200,
  //     message: "请求成功",
  //     data: {
  //       info: result[0],
  //       token
  //     }
  //   });
  // } catch(err) {
  //   response.send({
  //     status: -1,
  //     message: '请求失败~~',
  //     desc: err.message
  //   });
  // }
};
