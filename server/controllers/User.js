import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
// http://localhost:5001/User/signin
// {
//     "login":"ghassen",
//     "password":"21126748"
// }
export const Login = async(req, res) => {
    User.findOne({login: req.body.login})
    .then ((user) => {
        if (!user){
            return res 
            .status(401)
            .json({message : "Login ou mot de passe incorrécte"})
        }
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
            if (!valid) {
                return res
                .status(401)
                .json ({message : "Login ou mot de passe incorrecte "})
            }
            res.status(200).json({
                token : jwt.sign({userId: user._id,userRole: user.role},
                 "RANDOM_TOKEN_SECRET",
                {expiresIn : "24h"})

            })

        })
    }).catch((error) => res.status(500).json({error : error.message}))

}