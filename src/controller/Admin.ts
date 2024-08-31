import { Request, Response } from "express";
import Userdb from "../Model/User";
import jwt from "jsonwebtoken"

const adminCred = { email: "admin@gmail.com", password: "qw123" }

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === adminCred.email && password === adminCred.password) {
    const token = jwt.sign({ userId: email }, process.env.SESSION_SECRET!, {
      expiresIn: '1h',
    });
    res.json({ token })
  } else {
    res.json({ error: "Login failled" })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await Userdb.find();
    res.json({ users });

  }
  catch (err) {
    console.log(err);
  }


}

export const getUser = async (req: Request, res: Response) => {

  try {

    const id = req.params.id
    console.log(id);


    const user = await Userdb.findById(id);
    res.json({ user });

  } catch (error) {

    console.log("hello", error);


  }

}

export const updateUser = async (req: Request, res: Response) => {

  try {

    const { email, name } = req.body

    const id = req.params.id
    console.log(id);

    await Userdb.findOneAndUpdate({ _id: id }, { $set: { name: name, email: email } });
    res.status(201).json({ message: 'User Profile Updated successfully' });

  } catch (error) {
    res.status(500).json({ error: error });
  }

}

export const uploadProfile = async (req: Request, res: Response) => {
  try {

    const { id, url } = req.body;

    await Userdb.findOneAndUpdate({ _id: id }, { $set: { profilePicture: url } });
    res.status(201).json({ message: 'User Profile Updated successfully', url });

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const deleteUSer = async (req: Request, res: Response) => {

  try {

    const { id } = req.body;

    await Userdb.findByIdAndDelete(id);
    res.status(201).json({ message: 'User Profile deleted successfully' });

  }catch(error){

    res.status(500).json({ error: error });

  }

}