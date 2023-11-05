import express from "express"
import { CreateUser, DeleteUser, GetUserList, Login, UpdateUser } from "../../service/User/index.js";

const UserRouter = new express.Router();
UserRouter.get('/list', GetUserList);
UserRouter.post('/create', CreateUser);
UserRouter.put('/update', UpdateUser);
UserRouter.delete('/delete', DeleteUser);
UserRouter.get('/info', DeleteUser);

export default UserRouter;
