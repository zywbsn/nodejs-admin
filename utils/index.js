import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

//打印信息
const LogMessage = () => {
  console.log("Loading...");
  // console.log("𝕤𝕚𝕝𝕖𝕟𝕔𝕖𝕝𝕒𝕞𝕓");
  console.log("        _   _                                _                       _     ");
  console.log("       (_) | |                              | |                     | |    ");
  console.log("  ___   _  | |   ___   _ __     ___    ___  | |   __ _   _ __ ___   | |__  ");
  console.log(" / __| | | | |  / _ \\ | '_ \\   / __|  / _ \\ | |  / _` | | '_ ` _ \\  | '_ \\");
  console.log(" \\__ \\ | | | | |  __/ | | | | | (__  |  __/ | | | (_| | | | | | | | | |_) |");
  console.log(" |___/ |_| |_|  \\___| |_| |_|  \\___|  \\___| |_|  \\__,_| |_| |_| |_| |_.__/");
  console.log("");
};

//获取 token
const GetUuid = () => {
  return uuidv4();
};

//获取 token
const GetToken = (username, password) => {
  const secret = "RicardoX3"; //自定义密钥
  const token = jwt.sign(
    {
      username,
      password
    },
    secret,
    { expiresIn: 60 * 60 * 24 }
  );
  return token;
};

//校验 token 有效期
const CheckToken = (request, response, next) => {
  try {
    // if(!request.headers.skiptoken) {
    // const token = jwt.decode(request.headers?.token.slice(7));
    const secret = "RicardoX3"; //自定义密钥

    const token = jwt.verify(request.headers?.token, secret);
    const nowTime = new Date().getTime();
    //超过24小时则发送令牌过期信息
    //   if(nowTime - token.exp * 1000 > 0 || token.iat * 1000 - nowTime > 0) {
    //   } else next();
    // } else next();
    next();
  } catch(err) {
    response.send({
      status: 401,
      message: 'token 失效~~',
      desc: err.message
    });
  }
};
export {
  LogMessage,
  GetUuid,
  GetToken,
  CheckToken
};
