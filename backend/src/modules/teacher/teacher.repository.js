const Teacher = require("./teacher.model");

class TeacherRepository {
  async createTeacher(teacherData) {
    return await Teacher.create(teacherData);
  }

  async findTeacherById(id) {
    return await Teacher.findById(id);
  }

  async findActiveTeacherById(id) {
    return await Teacher.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findTeacherByEmployeeId(employeeId) {
    return await Teacher.findOne({
      employeeId,
      isDeleted: false,
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
  async exists(filter) {
    return await Teacher.exists(filter);
  }
  async getTeachers(filter = {}, options = {}) {
    const { page = 1, limit = 10 } = options;

    const skip = (page - 1) * limit;

    const teachers = await Teacher.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Teacher.countDocuments(filter);

    return {
      teachers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async countTeachers(filter = {}) {
    return await Teacher.countDocuments(filter);
  }

  async updateTeacher(id, updateData) {
    return await Teacher.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async softDeleteTeacher(id) {
    return await Teacher.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async restoreTeacher(id) {
    return await Teacher.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
      },
      {
        new: true,
      }
    );
  }

  async getDeletedTeachers(filter = {}, options = {}) {
    }
}

module.exports = new TeacherRepository();