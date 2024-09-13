import express from "express";
import { getAllMessages, sendMesssage } from "../controller/messageController.js"; // Corrected the import statement
import {isAdminAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post('/send', sendMesssage);
router.get('/getAll', isAdminAuthenticated,getAllMessages);

export default router;
