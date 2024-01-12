import express from "express";
import {
Login
} from "../controllers/User.js";
const router = express.Router();
router.post('/signin',Login)
export default router;