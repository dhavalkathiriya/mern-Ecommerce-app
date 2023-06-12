import JWT from "jsonwebtoken";
import User from "../model/User";
import { JWT_KEY } from "../config";



//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization,JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
}
//    headerconsts = req.headers[`authorization`]
//   const token  = headers.split(" ")[1]

//   if(token){
//   JWT.verify( String(token),JWT_KEY,(err,user) =>{
//   if (err) {
//    return res.status(201).json({message:"invalid token"})
//   }
//   console.log(user.id);
//   req.id = user.id;
//   })
//   next()
// }
// };

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.admin !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};