import {Router} from "express";
import AuthController from "./auth.controller.js";
import authMiddleware from "../../app/middlewares/auth.middleware.js";
const router = Router();

router.post("/login",AuthController.login);
router.get("/me",authMiddleware,AuthController.getMe);
export default router;