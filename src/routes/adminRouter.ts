import express from "express";
import { adminLogin, deleteUSer, getUser, getUsers, updateUser, uploadProfile } from "../controller/Admin";
import { verifyToken } from "../middleware/jwtAuth";

const route = express.Router();

route.post("/login", adminLogin);

route.get("/getUsers", verifyToken, getUsers );

route.get("/getUser/:id", verifyToken, getUser );

route.put("/updateUser/:id", verifyToken, updateUser );

route.put("/uploadProfile", verifyToken, uploadProfile );

route.put("/deleteUSer", verifyToken, deleteUSer );


export default route;