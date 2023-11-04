import express from "express";
import {CreateMenu, DeleteMenu, GetMenuList, UpdateMenu} from "../../service/Menu/index.js";

const MenuRouter = new express.Router();
MenuRouter.get('/list', GetMenuList);//菜单列表
MenuRouter.put('/update', UpdateMenu);//修改菜单
MenuRouter.post('/create', CreateMenu);//新增菜单
MenuRouter.delete('/delete', DeleteMenu);//删除菜单

export default MenuRouter;
