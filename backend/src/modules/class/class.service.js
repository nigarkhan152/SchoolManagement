import ClassRepository from "./class.repository.js";

import {
  createClassValidation,
  updateClassValidation,
  createSectionValidation,
  updateSectionValidation,
} from "./class.validation.js";

class ClassService {
  // ======================
  // CLASS
  // ======================

  async createClass(data) {
    createClassValidation(data);

    const exists = await ClassRepository.classExists(
      data.name,
      data.academicYear
    );

    if (exists) {
      throw new Error(
        "Class already exists for this academic year."
      );
    }

    return await ClassRepository.createClass(data);
  }

  async getClasses(query) {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      academicYear,
    } = query;

    const filters = {};

    if (search) {
      filters.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          roomNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (academicYear) {
      filters.academicYear = academicYear;
    }

    if (status) {
      filters.isActive = status === "active";
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const skip = (pageNumber - 1) * pageSize;

    const data = await ClassRepository.getClasses(
      filters,
      skip,
      pageSize,
      {
        createdAt: -1,
      }
    );

    const total = await ClassRepository.countClasses(
      filters
    );

    return {
      data,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasNext: pageNumber < Math.ceil(total / pageSize),
        hasPrevious: pageNumber > 1,
      },
    };
  }

  async getClassById(id) {
    const classData =
      await ClassRepository.getClassById(id);

    if (!classData) {
      throw new Error("Class not found");
    }

    const sections =
      await ClassRepository.getSectionsByClass(id);

    return {
      class: classData,
      sections,
    };
  }

  async updateClass(id, data) {
    updateClassValidation(data);

    const updated =
      await ClassRepository.updateClass(
        id,
        data
      );

    if (!updated) {
      throw new Error("Class not found");
    }

    return updated;
  }

  async deleteClass(id) {
    const classData =
      await ClassRepository.getClassById(id);

    if (!classData) {
      throw new Error("Class not found");
    }

    const hasSections =
      await ClassRepository.hasSections(id);

    if (hasSections) {
      throw new Error(
        "Cannot delete class because it contains sections."
      );
    }

    return await ClassRepository.deleteClass(id);
  }

  // ======================
  // SECTION
  // ======================

  async createSection(data) {
    createSectionValidation(data);

    const classData =
      await ClassRepository.getClassById(
        data.classId
      );

    if (!classData) {
      throw new Error("Class not found");
    }

    return await ClassRepository.createSection(
      data
    );
  }

  async updateSection(id, data) {
    updateSectionValidation(data);

    const updated =
      await ClassRepository.updateSection(
        id,
        data
      );

    if (!updated) {
      throw new Error("Section not found");
    }

    return updated;
  }

  async deleteSection(id) {
    const deleted =
      await ClassRepository.deleteSection(id);

    if (!deleted) {
      throw new Error("Section not found");
    }

    return deleted;
  }

  async getStats() {
    return await ClassRepository.getStats();
  }
}

export default new ClassService();