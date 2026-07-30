import ClassService from "./class.service.js";
import asyncHandler from "../../app/utils/asyncHandler.js";
import { successResponse } from "../../app/utils/apiResponse.js";

class ClassController {
  // ===========================
  // CLASS
  // ===========================

  createClass = asyncHandler(async (req, res) => {
    const data = await ClassService.createClass(req.body);

    return successResponse(
      res,
      "Class created successfully",
      data,
      201
    );
  });

  getClasses = asyncHandler(async (req, res) => {
    const data = await ClassService.getClasses(req.query);

    return successResponse(
      res,
      "Classes fetched successfully",
      data
    );
  });

  getClassById = asyncHandler(async (req, res) => {
    const data = await ClassService.getClassById(req.params.id);

    return successResponse(
      res,
      "Class fetched successfully",
      data
    );
  });

  updateClass = asyncHandler(async (req, res) => {
  console.log("Params:", req.params);
  console.log("Body:", req.body);

  const data = await ClassService.updateClass(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    "Class updated successfully",
    data
  );
});

  deleteClass = asyncHandler(async (req, res) => {
    await ClassService.deleteClass(req.params.id);

    return successResponse(
      res,
      "Class deleted successfully"
    );
  });

  getStats = asyncHandler(async (req, res) => {
    const data = await ClassService.getStats();

    return successResponse(
      res,
      "Class statistics fetched successfully",
      data
    );
  });

  // ===========================
  // SECTION
  // ===========================

  createSection = asyncHandler(async (req, res) => {
    const data = await ClassService.createSection({
      ...req.body,
      classId: req.params.classId,
    });

    return successResponse(
      res,
      "Section created successfully",
      data,
      201
    );
  });

  updateSection = asyncHandler(async (req, res) => {
    const data = await ClassService.updateSection(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      "Section updated successfully",
      data
    );
  });

  deleteSection = asyncHandler(async (req, res) => {
    await ClassService.deleteSection(req.params.id);

    return successResponse(
      res,
      "Section deleted successfully"
    );
  });
}

export default new ClassController();