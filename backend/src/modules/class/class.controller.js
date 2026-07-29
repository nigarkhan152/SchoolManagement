import ClassService from "./class.service.js";
class ClassController {
  // ===========================
  // CLASS
  // ===========================

  async createClass(req, res) {
    try {
      const data = await ClassService.createClass(req.body);

      return res.status(201).json({
        success: true,
        message: "Class created successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getClasses(req, res) {
    try {
      const data = await ClassService.getClasses(req.query);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getClassById(req, res) {
    try {
      const data = await ClassService.getClassById(req.params.id);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateClass(req, res) {
    try {
      const data = await ClassService.updateClass(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Class updated successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteClass(req, res) {
    try {
      await ClassService.deleteClass(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Class deleted successfully",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getStats(req, res) {
    try {
      const data = await ClassService.getStats();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ===========================
  // SECTION
  // ===========================

  async createSection(req, res) {
    try {
      const data = await ClassService.createSection({
        ...req.body,
        classId: req.params.classId,
      });

      return res.status(201).json({
        success: true,
        message: "Section created successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateSection(req, res) {
    try {
      const data = await ClassService.updateSection(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Section updated successfully",
        data,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteSection(req, res) {
    try {
      await ClassService.deleteSection(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Section deleted successfully",
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ClassController();