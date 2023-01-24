import { Router } from "express";
import { deleteAll, getAll, login, register } from "../controller/function";

const route = Router();

route.route("/post").post(register);
route.route("/getall").get(getAll);
route.route("/login").post(login);
route.route("/deleteall").delete(deleteAll);

export default route;
