import TeacherService from "./teacher.service.js";

/**
 * Create Teacher
 */
const createTeacher = async (req, res) => {
  try {
    const teacher = await TeacherService.createTeacher(req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: teacher,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Teachers
 */
const getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherService.getTeachers(req.query);

    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfully.",
      ...teachers,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Teacher By Id
 */
const getTeacherById = async (req, res) => {
  try {
    const teacher = await TeacherService.getTeacherById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Teacher fetched successfully.",
      data: teacher,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Teacher
 */
const updateTeacher = async (req, res) => {
  try {
    const teacher = await TeacherService.updateTeacher(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Teacher
 */
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await TeacherService.deleteTeacher(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
      data: teacher,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Restore Teacher
 */
const restoreTeacher = async (req, res) => {
  try {
    const teacher = await TeacherService.restoreTeacher(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Teacher restored successfully.",
      data: teacher,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Teacher Statistics
 */
const getTeacherStatistics = async (req, res) => {
  try {
    const stats = await TeacherService.getTeacherStatistics();

    return res.status(200).json({
      success: true,
      message: "Teacher statistics fetched successfully.",
      data: stats,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  restoreTeacher,
  getTeacherStatistics,
};