import express from "express";
import {
    AddAuthor,Addpublication,FindAllpublications,Findonepublication
} from "../controllers/Author.js";
import {loggedMiddleware,AuthorMiddleware} from "../middlewares/auth.js"
const router = express.Router();
router.post('/register',AddAuthor)
router.post('/Addpublication',loggedMiddleware,AuthorMiddleware,Addpublication)
router.get('/Findonepublication',loggedMiddleware,AuthorMiddleware,Findonepublication)
router.get('/FindAllpublications',loggedMiddleware,AuthorMiddleware,FindAllpublications)
export default router;