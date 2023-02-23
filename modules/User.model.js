const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // _id: ObjectId,
  name: String,
  email: String,
  password: String,
});

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}