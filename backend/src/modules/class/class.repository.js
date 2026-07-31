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

  async findDeletedClass(name, academicYear) {
    return await Class.findOne({
      name,
      academicYear,
      isDeleted: true,
    });
  }

  async restoreClass(id, data) {
    return await Class.findByIdAndUpdate(
      id,
      {
        ...data,
        isDeleted: false,
        isActive: true,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
  }
  // ==========================
  // SECTION
  // ==========================
  async findSectionByName(classId, name) {
    return await Section.findOne({
      classId,
      name,
      isDeleted: false,
    });
  }
  async findDeletedSectionByName(classId, name){
    return await Section.findOne({
        classId,
        name,
        isDeleted: true,
    })
  }
  async hasSections(classId) {
    return await Section.exists({
      classId,
      isDeleted: false,
    });
  }
  // Section
  async createSection(data){
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
  async restoreSection(id, data){
    return await Section.findByIdAndUpdate(
      id,
      {
        ...data,
        isDeleted: false,
      },
      {
        new: true,
        runValidators: true,
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