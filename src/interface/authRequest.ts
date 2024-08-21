import { Request } from "express";

export default interface IAuthRequest extends Request {
  userId?:string;
}