import login from "../controllers/login.js";
import express from 'express'

const router = express.Router();

router.post('/checklogin',login);

export default router;