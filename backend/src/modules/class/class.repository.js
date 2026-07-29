import Class from "./class.model.js";
import Section from "./section.model.js";

class ClassRepository {
  // ==========================
  // CLASS
  // ==========================

  async createClass(data) {
    return await Class.create(data);
  }

  async getClassById(id) {
    return await Class.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async updateClass(id, data) {
    return await Class.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteClass(id) {
    return await Class.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async getClasses(filters, skip, limit, sort) {
    return await Class.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async countClasses(filters) {
    return await Class.countDocuments(filters);
  }

  async classExists(name, academicYear) {
    return await Class.findOne({
      name,
      academicYear,
      isDeleted: false,
    });
  }

  // ==========================
  // SECTION
  // ==========================

  async createSection(data) {
    return await Section.create(data);
  }

  async getSectionsByClass(classId) {
    return await Section.find({
      classId,
      isDeleted: false,
    });
  }

  async getSectionById(id) {
    return await Section.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async updateSection(id, data) {
    return await Section.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteSection(id) {
    return await Section.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async countSections(classId) {
    return await Section.countDocuments({
      classId,
      isDeleted: false,
    });
  }

  async getStats() {
    const totalClasses = await Class.countDocuments({
      isDeleted: false,
    });

    const activeClasses = await Class.countDocuments({
      isDeleted: false,
      isActive: true,
    });

    const totalSections = await Section.countDocuments({
      isDeleted: false,
    });

    return {
      totalClasses,
      activeClasses,
      totalSections,
    };
  }
}

export default new ClassRepository();