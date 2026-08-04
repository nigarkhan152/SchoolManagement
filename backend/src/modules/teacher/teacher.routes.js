/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher Management APIs
 */

import express from "express";
import TeacherController from "./teacher.controller.js";
import authMiddleware from "../../app/middlewares/auth.middleware.js";
import validate from "../../app/middlewares/validate.middleware.js";

import {
  createTeacherValidation,
  updateTeacherValidation,
} from "./teacher.validation.js";

const router = express.Router();

/* ==========================
        TEACHER ROUTES
========================== */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create Teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - firstName
 *               - lastName
 *               - gender
 *               - department
 *               - qualification
 *               - experience
 *               - joiningDate
 *               - salary
 *               - phone
 *               - email
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: TCH001
 *               firstName:
 *                 type: string
 *                 example: Neha
 *               lastName:
 *                 type: string
 *                 example: Singh
 *               gender:
 *                 type: string
 *                 example: Female
 *               dateOfBirth:
 *                 type: string
 *                 example: 1995-05-20
 *               department:
 *                 type: string
 *                 example: Mathematics
 *               qualification:
 *                 type: string
 *                 example: M.Sc Mathematics
 *               experience:
 *                 type: integer
 *                 example: 5
 *               joiningDate:
 *                 type: string
 *                 example: 2022-06-15
 *               salary:
 *                 type: number
 *                 example: 45000
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 example: neha@gmail.com
 *               status:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Teacher Created
 */
router.post(
  "/",
  authMiddleware,
  validate(createTeacherValidation),
  TeacherController.createTeacher
);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get All Teachers
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Teachers
 */
router.get(
  "/",
  authMiddleware,
  TeacherController.getTeachers
);

/**
 * @swagger
 * /teachers/stats:
 *   get:
 *     summary: Teacher Dashboard Stats
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher Statistics
 */
router.get(
  "/stats",
  authMiddleware,
  TeacherController.getTeacherStatistics
);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get Teacher By Id
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher Details
 */
router.get(
  "/:id",
  authMiddleware,
  TeacherController.getTeacherById
);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update Teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher Updated Successfully
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updateTeacherValidation),
  TeacherController.updateTeacher
);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete Teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher Deleted Successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  TeacherController.deleteTeacher
);

/**
 * @swagger
 * /teachers/{id}/restore:
 *   patch:
 *     summary: Restore Teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher Restored Successfully
 */
router.patch(
  "/:id/restore",
  authMiddleware,
  TeacherController.restoreTeacher
);

export default router;