import TeacherService from './teacher.service.js';
import asyncHandler from '../../app/utils/asyncHandler.js';
import { successResponse } from '../../app/utils/apiResponse.js';

class TeacherController{
  // ===========================
  // TEACHER
  // ===========================
  createTeacher = asyncHandler(async (req, res) => {
    const data = await TeacherService.createTeacher(req.body);
    return successResponse(
      res,
      "Teacher created successfully",
      data,
      201
    );
  });

  getTeachers = asyncHandler(async (req, res) => {
    const data = await TeacherService.getTeachers(req.query);
    return successResponse(
      res,
      "Teachers fetched successfully",
      data
    );
  });

  getTeacherById = asyncHandler(async (req, res) => {
    const data = await TeacherService.getTeacherById(req.params.id);
    return successResponse(
      res,
      "Teacher fetched successfully",
      data
    );
  });

  updateTeacher = asyncHandler(async (req, res) => {
    const data = await TeacherService.updateTeacher(
      req.params.id,
      req.body
    );
    return successResponse(
      res,
      "Teacher updated successfully",
      data
    );
  });
  deleteTeacher = asyncHandler(async (req, res) => {
    await TeacherService.deleteTeacher(req.params.id);
    return successResponse(
      res,
      "Teacher deleted successfully"
    );
  });
  restoreTeacher = asyncHandler(async (req, res) => {
    const data = await TeacherService.restoreTeacher(req.params.id);
    return successResponse(
      res,
      "Teacher restored successfully",
      data
    );
  });
  getTeacherStatistics = asyncHandler(async (req, res) => {
    const data = await TeacherService.getTeacherStatistics();
    return successResponse(
      res,
      "Teacher statistics fetched successfully",
      data
    );
  });
}
export default new TeacherController();