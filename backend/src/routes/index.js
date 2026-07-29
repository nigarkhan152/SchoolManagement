import express from "express";
import {Router} from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import classRoutes from "../modules/class/class.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/classes", classRoutes);
export default router;