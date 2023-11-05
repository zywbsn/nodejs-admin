import query from "../../db/index.js";

const Table = "menu_list";//数据表

//创建菜单
export const DeleteMenu = async (request, response) => {
  const { id } = request.query;
  const sql = `delete from ${Table} where id = ${id}`;
  console.log("sql", sql);
  try {
    const { rows } = await query(sql);
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

//创建菜单
export const CreateMenu = async (request, response) => {
  const { label, key, component, father, is_father } = request.body;
  const sql = `insert into  ${Table} set label="${label}",path="${key}",component="${component}",father="${father}",is_father=${is_father}`;

  try {
    console.log("sql", sql);
    const { rows } = await query(sql);
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

//更新菜单
export const UpdateMenu = async (request, response) => {
  const { id, label, key, component, father, is_father } = request.body;
  const sql = `update ${Table} set label="${label}",path="${key}",component="${component}",father="${father}",is_father=${is_father} where id=${id}`;
  console.log("Sql", sql)
  try {
    const { rows } = await query(sql);
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

//菜单列表
export async function GetMenuList(req, res) {
  const { page, size, label = "", key = "" } = req.query;
  if(parseInt(page) === -1 || (label === "" && key === "")) {
    const sql = `select * from ${Table}`;
    try {
      const { rows } = await query(sql);
      rows.forEach((item) => {
        const { path } = item;
        item.key = path;
        delete item.path;
        if(item.is_father === 1) item.children = [];
      });
      const list = getMenus(rows);
      res.send({
        status: 200,
        message: "请求成功",
        data: {
          list: parseInt(page) === -1 ? list : list.slice(parseInt(page) - 1, parseInt(size)),
        },
      });
    } catch(err) {
      res.send({
        status: -1,
        message: '请求失败~~',
        desc: err.message,
      });
    }
    return;
  }
  const sql = `select * from ${Table} where label like "%${label}%" and path like "%${key}%" limit ${parseInt(size)} offset ${(parseInt(page) - 1) * parseInt(size)}`;

  // const sql = `select * from ${Table} where label like "%${label}%" and path like "%${key}%"`;
  console.log("sql", sql)
  try {
    const { rows } = await query(sql);
    rows.forEach((item) => {
      const { path } = item;
      item.key = path;
      delete item.path;
    });
    res.send({
      status: 200,
      message: "请求成功",
      data: {
        list: rows,
      },
    });
  } catch(err) {
    res.send({
      status: -1,
      message: '请求失败~~',
      desc: err.message,
    });
  }
};

const getMenus = (val) => {
  let menus = val;
  // console.log("menus",menus)
  menus.map((item) => {
    if(item.is_father === 1) {
      menus.forEach((i) => {
        if(i.father === item.key) item.children.push(i);
      });
    }
    // if(item.key.match(/\//g).length === 3) {
    //   const path = item.key.split("/").slice(0, 3).join("/");
    //   val.map((i) => {
    //     if(i.key === path) {
    //       i.children.push(item);
    //     }
    //   });
    // }
  });
  // menus.map((item) => {
  //   const {path} = item;
  //   item.key = path;
  //   delete item.path;
  //   if(item.key.match(/\//g).length === 3) {
  //     const path = item.key.split("/").slice(0, 3).join("/");
  //     val.map((i) => {
  //       if(i.key === path) {
  //         i.children.push(item);
  //       }
  //     });
  //   }
  // });
  menus = menus.filter((item) => item.key.match(/\//g).length === 2);
  menus.sort((a, b) => a.sort - b.sort); //父级路由排序
  menus.forEach((router) => {
    if(router.children) router.children.sort((a, b) => a.sort - b.sort);
  });
  return menus;
};

