import express from "express";
import { adminLogin, getUsers } from "../controller/Admin";

const route = express.Router();

route.post("/login", adminLogin);

route.get("/getUsers", getUsers );

export default route;