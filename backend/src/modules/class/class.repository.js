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
    }).lean();
  }

  async updateClass(id, data) {
    return await Class.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteClass(id) {
    return await Class.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async getClasses(filters, skip, limit, sort) {
    return await Class.find({
      ...filters,
      isDeleted: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async countClasses(filters) {
    return await Class.countDocuments({
      ...filters,
      isDeleted: false,
    });
  }

  async classExists(name, academicYear) {
    return await Class.exists({
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
    }).lean();
  }

  async getSectionById(id) {
    return await Section.findOne({
      _id: id,
      isDeleted: false,
    }).lean();
  }

  async updateSection(id, data) {
    return await Section.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async deleteSection(id) {
    return await Section.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
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
    const [totalClasses, activeClasses, totalSections] = await Promise.all([
      Class.countDocuments({ isDeleted: false }),
      Class.countDocuments({
        isDeleted: false,
        isActive: true,
      }),
      Section.countDocuments({
        isDeleted: false,
      }),
    ]);

    return {
      totalClasses,
      activeClasses,
      inactiveClasses: totalClasses - activeClasses,
      totalSections,
    };
  }
}

export default new ClassRepository();