import { Request, Response } from "express";
import Userdb from "../Model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IAuthRequest from "../interface/authRequest";

dotenv.config({ path: ".env" });

export const find = async (req: IAuthRequest, res: Response) => {

  try {
    const id = req.userId!;

    const user = await Userdb.findById(id);
    res.json(user);

  }
  catch (err) {
    console.log(err);
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Userdb({
      name: name,
      password: hashedPassword,
      email: email
    })
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Userdb.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User Not Found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET!, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}

export const uploadProfile = async (req: IAuthRequest, res: Response) => {
  try {

    const id = req.userId;

    const { url } = req.body;

    await Userdb.findOneAndUpdate({ _id: id }, { $set: { profilePicture: url } });
    res.status(201).json({ message: 'User Profile Updated successfully', url });

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const updateProfile = async (req: IAuthRequest, res: Response) => {

  try {

    const id = req.userId;

    const { name, email } = req.body;

    await Userdb.findOneAndUpdate({ _id: id }, { $set: { name: name, email: email } });
    res.status(201).json({ message: 'User Profile Updated successfully' });

  } catch (error) {
    res.status(500).json({ error: error });
  }

}

export const changePassword = async (req: IAuthRequest, res: Response) => {

  try {

    const id = req.userId;

    const { oldPassword, newPassword } = req.body;

    const user = await Userdb.findById(id);
    if (!user) {
      return res.status(401).json({ error: 'User Not Found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10)

    await Userdb.findOneAndUpdate({_id:id},{ $set: { password: hashedPassword }});
    res.status(201).json({ message: 'Password changed successfully' });

  } catch (error) {
    res.status(500).json({ error }); 
  }

}