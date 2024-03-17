
const mongoose = require("mongoose")

const loginUsers = ({
  name:{
    type:String,
    required:true,
    min:3,
    max:20,
    trim:true
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    max:50,
  },
  password:{
    type:String,
    required:true,
    minlength:[6,"Minimum password length is 6 character"]
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
})

const User = mongoose.model("Users", loginUsers)

module.exports = User;