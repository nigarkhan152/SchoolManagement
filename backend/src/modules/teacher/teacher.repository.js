import Teacher from "./teacher.model.js";

class TeacherRepository {
  // ==========================
  // CREATE
  // ==========================

  async createTeacher(data) {
    return await Teacher.create(data);
  }

  // ==========================
  // READ
  // ==========================

  async getTeacherById(id, includeDeleted = false) {
  const filter = {
    _id: id,
  };

  if (!includeDeleted) {
    filter.isDeleted = false;
  }

  return await Teacher.findOne(filter).lean();
}

  async getTeachers(filters, skip, limit, sort) {
    return await Teacher.find({
      ...filters,
      isDeleted: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async countTeachers(filters) {
    return await Teacher.countDocuments({
      ...filters,
      isDeleted: false,
    });
  }

  // ==========================
  // UPDATE
  // ==========================

  async updateTeacher(id, data) {
    return await Teacher.findOneAndUpdate(
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

  // ==========================
  // DELETE / RESTORE
  // ==========================

  async deleteTeacher(id) {
    return await Teacher.findOneAndUpdate(
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

  async restoreTeacher(id, data = {}) {
    return await Teacher.findByIdAndUpdate(
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

  // ==========================
  // DUPLICATE CHECKS
  // ==========================

  async findTeacherByEmployeeId(employeeId) {
    return await Teacher.findOne({
      employeeId,
      isDeleted: false,
    });
  }

  async findDeletedTeacherByEmployeeId(employeeId) {
    return await Teacher.findOne({
      employeeId,
      isDeleted: true,
    });
  }

  async findTeacherByEmployeeIdExcludingId(employeeId, id) {
    return await Teacher.findOne({
      employeeId,
      isDeleted: false,
      _id: { $ne: id },
    });
  }

  async findTeacherByEmail(email) {
    return await Teacher.findOne({
      email,
      isDeleted: false,
    });
  }

  async findTeacherByEmailExcludingId(email, id) {
    return await Teacher.findOne({
      email,
      isDeleted: false,
      _id: { $ne: id },
    });
  }

  async findTeacherByPhone(phone) {
    return await Teacher.findOne({
      phone,
      isDeleted: false,
    });
  }

  async findTeacherByPhoneExcludingId(phone, id) {
    return await Teacher.findOne({
      phone,
      isDeleted: false,
      _id: { $ne: id },
    });
  }

  // ==========================
  // STATISTICS
  // ==========================

  async getStats() {
    const [
      totalTeachers,
      activeTeachers,
      inactiveTeachers,
      onLeaveTeachers,
    ] = await Promise.all([
      Teacher.countDocuments({
        isDeleted: false,
      }),

      Teacher.countDocuments({
        isDeleted: false,
        status: "Active",
      }),

      Teacher.countDocuments({
        isDeleted: false,
        status: "Inactive",
      }),

      Teacher.countDocuments({
        isDeleted: false,
        status: "On Leave",
      }),
    ]);

    return {
      totalTeachers,
      activeTeachers,
      inactiveTeachers,
      onLeaveTeachers,
    };
  }
}

export default new TeacherRepository();