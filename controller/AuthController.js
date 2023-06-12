import User from "../model/User"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from "../config"

export const RegisterController = async(req,res) =>{

try {
  const { name, email, password,answer } = req.body;
  //validations
  if (!name) {
    return res.send({ error: "Name is Required" });
  }
  if (!email) {
    return res.send({ message: "Email is Required" });
  }
  if (!password) {
    return res.send({ message: "Password is Required" });
  }
  if (!answer) {
    return res.send({ message: "Password is Required" });
  }

  //check user
  const exisitingUser = await User.findOne({ email });
  //exisiting user
  if (exisitingUser) {
    return res.status(200).send({
      success: false,
      message: "Already Register please login",
    });
  }
  //register user
  const hashPassword = await bcrypt.hashSync(password)
  //save
  const user = await new User({
    name,
    email,
    password: hashPassword,
    answer
  }).save();

  res.status(201).send({
    success: true,
    message: "User Register Successfully",
    user,
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Errro in Registeration",
    error,
  });
}
}

export const LoginController =async(req,res) => {

    
    try {
        const {email,password} =req.body
     if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
    const existUser = await User.findOne({email})
    if (!existUser) {
       return res.status(404).send({
         success: false,
         message: "Email is not registerd",
       })
    }

    const match = await bcrypt.compareSync(password,existUser.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign({ _id: existUser._id }, JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      existUser:{
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        admin:existUser.admin
      },
      token,
    });
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
    
}


//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await User.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await bcrypt.hashSync(newPassword)
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


