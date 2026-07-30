/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Class Management APIs
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create Class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - academicYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Class 10
 *               description:
 *                 type: string
 *                 example: Senior Secondary
 *               academicYear:
 *                 type: string
 *                 example: 2026-2027
 *               roomNumber:
 *                 type: string
 *                 example: R-101
 *               capacity:
 *                 type: integer
 *                 example: 40
 *     responses:
 *       201:
 *         description: Class Created
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get All Classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Classes
 */

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get Class By Id
 *     tags: [Classes]
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
 *         description: Class Details
 */

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update Class
 *     tags: [Classes]
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
 *         description: Updated Successfully
 */

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete Class
 *     tags: [Classes]
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
 *         description: Deleted Successfully
 */

/**
 * @swagger
 * /classes/stats:
 *   get:
 *     summary: Class Dashboard Stats
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics
 */

/**
 * @swagger
 * /classes/{classId}/sections:
 *   post:
 *     summary: Create Section
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: A
 *               capacity:
 *                 type: integer
 *                 example: 35
 *
 *     responses:
 *       201:
 *         description: Section Created
 */
/**
 * @swagger
 * /classes/sections/{id}:
 *   put:
 *     summary: Update Section
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: B
 *               capacity:
 *                 type: integer
 *                 example: 40
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Section Updated Successfully
 */
/**
 * @swagger
 * /classes/sections/{id}:
 *   delete:
 *     summary: Delete Section
 *     tags: [Classes]
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
 *         description: Section Deleted Successfully
 */
import express from "express";
import ClassController from "./class.controller.js";
import authMiddleware from "../../app/middlewares/auth.middleware.js";

const router = express.Router();

/* ==========================
        CLASS ROUTES
========================== */

router.post(
  "/",
  authMiddleware,
  ClassController.createClass
);

router.get(
  "/",
  authMiddleware,
  ClassController.getClasses
);

router.get(
  "/stats",
  authMiddleware,
  ClassController.getStats
);

router.get(
  "/:id",
  authMiddleware,
  ClassController.getClassById
);

router.put(
  "/:id",
  authMiddleware,
  ClassController.updateClass
);

router.delete(
  "/:id",
  authMiddleware,
  ClassController.deleteClass
);

/* ==========================
       SECTION ROUTES
========================== */

router.post(
  "/:classId/sections",
  authMiddleware,
  ClassController.createSection
);

router.put(
  "/sections/:id",
  authMiddleware,
  ClassController.updateSection
);

router.delete(
  "/sections/:id",
  authMiddleware,
  ClassController.deleteSection
);

export default router;