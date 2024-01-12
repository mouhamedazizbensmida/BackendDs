import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Joi from 'joi';
const loginSchema = Joi.object({
    login: Joi.string().min(2).required().messages({
        'string.min': 'wee',
        'string.empty': 'waa mata7gerch erjel',
    }),
    password: Joi.string().required().messages({
        'any.required': 'mata7gerch erjel',
        'string.empty': 'mata7gerch erjel',
    }),
}).options({ abortEarly: false });
// http://localhost:5001/User/signin
// {
//     "login":"ghassen",
//     "password":"21126748"
// }

// Define Joi validation schema for login
export const Login = async (req, res) => {
    try {
        // Validate request body against the schema
        const { login, password } = req.body;
        await loginSchema.validateAsync({ login, password });

        // Check if login field is not empty
        if (!login.trim()) {
            return res.status(400).json({ error: '"login" must not be empty' });
        }

        // Continue with database operations
        User.findOne({ login })
            .then((user) => {
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: "Login or password incorrect" });
                }

                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ message: "Login or password incorrect" });
                        }

                        // Generate and send JWT token
                        const token = jwt.sign({ userId: user._id, userRole: user.role },
                            "RANDOM_TOKEN_SECRET", { expiresIn: "24h" });

                        res.status(200).json({ token });
                    })
                    .catch((error) => res.status(500).json({ error: error.message }));
            })
            .catch((error) => res.status(500).json({ error: error.message }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
