/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Teacher Management APIs
 */
import express from "express";

import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  restoreTeacher,
  getTeacherStatistics,
} from "./teacher.controller.js";

import validate from "../../middlewares/validate.js";

import {
  createTeacherValidation,
  updateTeacherValidation,
} from "./teacher.validation.js";

const router = express.Router();

/* ==========================
   Teacher CRUD
========================== */
/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Teacher created successfully
 */
router.post(
  "/",
  validate(createTeacherValidation),
  createTeacher
);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teachers fetched successfully
 */
router.get("/", getTeachers);

/* ==========================
   Teacher Statistics
========================== */

/**
 * @swagger
 * /teachers/statistics:
 *   get:
 *     summary: Get teacher dashboard statistics
 *     tags:
 *       - Teachers
 *     responses:
 *       200:
 *         description: Teacher statistics fetched successfully
 */
router.get("/statistics", getTeacherStatistics);

/* ==========================
   Teacher Details
========================== */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher details fetched successfully
 *       404:
 *         description: Teacher not found
 */
router.get("/:id", getTeacherById);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update an existing teacher
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Teacher not found
 */
router.put(
  "/:id",
  validate(updateTeacherValidation),
  updateTeacher
);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Soft delete a teacher
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 */
router.delete(
  "/:id",
  deleteTeacher
);

/**
 * @swagger
 * /teachers/{id}/restore:
 *   patch:
 *     summary: Restore a deleted teacher
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Teacher ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher restored successfully
 *       404:
 *         description: Teacher not found
 */
router.patch(
  "/:id/restore",
  restoreTeacher
);

export default router;