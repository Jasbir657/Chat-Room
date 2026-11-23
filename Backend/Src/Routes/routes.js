import { Router } from "express";
import { loginController}  from "../controller/auth.controller.js";
import { fetchMessages, saveMessages } from "../controller/Messages.controller.js";

const router = Router()

router.post("/login" , loginController )

router.post("/messages" , saveMessages)

router.get("/fetchMessages" , fetchMessages)

export default router