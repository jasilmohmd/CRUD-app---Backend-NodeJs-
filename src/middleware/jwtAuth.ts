import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import IAuthRequest from "../interface/authRequest";

dotenv.config({ path: ".env" });

export const verifyToken = ( req: IAuthRequest, res: Response, next: NextFunction ) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1]; // Remove "Bearer " prefix
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded: JwtPayload = jwt.verify(token, process.env.SESSION_SECRET! ) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}