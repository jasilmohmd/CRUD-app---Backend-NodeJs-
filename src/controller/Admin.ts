import { Request, Response } from "express";
import Userdb from "../Model/User";

const adminCred = { email: "admin@gmail.com" , password: "qw123" }

export const adminLogin = ( req: Request, res: Response ) => {
  const { email,password } = req.body;
  if( email === adminCred.email && password === adminCred.password ){
    res.json({Auth: true})
  }else{
    res.json({Auth: false})
  }
}

export const getUsers = async ( req: Request, res: Response ) => {
  try{
  
    const users = await Userdb.find();
    res.json({users});

  }
  catch (err) {
    console.log(err);
  }
}