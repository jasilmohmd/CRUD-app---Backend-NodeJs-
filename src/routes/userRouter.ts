import express from "express";
import { changePassword, find, login, register, updateProfile, uploadProfile } from "../controller/User";
import { verifyToken } from "../middleware/jwtAuth";
const route = express.Router();

route.post("/register", register);

route.post("/login", login );

route.get("/getUser", verifyToken, find );

route.post("/uploadProfile", verifyToken, uploadProfile );

route.post("/updateProfile", verifyToken, updateProfile );

route.put("/changePassword", verifyToken, changePassword );

export default route;