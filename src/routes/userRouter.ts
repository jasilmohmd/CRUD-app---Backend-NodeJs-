import express from "express";
import { find, login, register } from "../controller/User";
import { verifyToken } from "../middleware/jwtAuth";
const route = express.Router();

route.post("/register", register);

route.post("/login", login );

route.get("/getUser", verifyToken, find )

export default route;