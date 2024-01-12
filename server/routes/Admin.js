import express from "express";
import {
    AddAdmin,ValidateAuthor
} from "../controllers/Admin.js";
const router = express.Router();
router.post('/add-admin',AddAdmin),
router.patch('/ValidateAuthor',ValidateAuthor)

export default router;