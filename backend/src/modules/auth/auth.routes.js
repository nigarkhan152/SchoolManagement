/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login Admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Credentials
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get Logged In User
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged In User
 */
import {Router} from "express";
import AuthController from "./auth.controller.js";
import authMiddleware from "../../app/middlewares/auth.middleware.js";
const router = Router();

router.post("/login",AuthController.login);
router.get("/me",authMiddleware,AuthController.getMe);
export default router;