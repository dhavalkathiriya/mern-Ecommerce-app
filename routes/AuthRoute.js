import express from 'express'
import {LoginController,RegisterController, forgotPasswordController} from './../controller/AuthController'
import { requireSignIn } from '../middleware/AuthMiddleware'

const AuthRoute = express.Router()

AuthRoute.post("/login",LoginController)
AuthRoute.post("/register",RegisterController)
AuthRoute.post("/forget",forgotPasswordController)

//protected User route auth
AuthRoute.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
export default AuthRoute;