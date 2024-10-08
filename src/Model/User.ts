import mongoose from "mongoose";

var schema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true,
    unique:true,
  },
  password:{
    type: String,
    required:true
  },
  profilePicture:{
    type: String,
    default: ""
  }
})

const Userdb = mongoose.model("userdb",schema);
export default Userdb