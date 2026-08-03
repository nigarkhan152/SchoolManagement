const teacherRepository = require("./teacher.repository");

class TeacherService {
  normalizeTeacherData(data) {
    return {
      ...data,
      employeeId: data.employeeId?.trim().toUpperCase(),
      email: data.email?.trim().toLowerCase(),
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      department: data.department?.trim(),
      qualification: data.qualification?.trim(),
      phone: data.phone?.trim(),
    };
  }

  validateTeacherAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    if (dob > today) {
      throw new Error("Date of birth cannot be in the future.");
    }

    let age = today.getFullYear() - dob.getFullYear();

    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      throw new Error("Teacher must be at least 18 years old.");
    }

    return age;
  }

  validateJoiningDate(dateOfBirth, joiningDate) {
    const dob = new Date(dateOfBirth);
    const joining = new Date(joiningDate);
    const today = new Date();

    if (joining > today) {
      throw new Error("Joining date cannot be in the future.");
    }

    if (joining <= dob) {
      throw new Error(
        "Joining date must be after the date of birth."
      );
    }
  }

  validateExperience(joiningDate, experience) {
    if (experience < 0) {
      throw new Error("Experience cannot be negative.");
    }

    const joining = new Date(joiningDate);
    const today = new Date();

    let maxExperience =
      today.getFullYear() - joining.getFullYear();

    const monthDifference =
      today.getMonth() - joining.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < joining.getDate())
    ) {
      maxExperience--;
    }

    if (experience > maxExperience) {
      throw new Error(
        "Experience cannot be greater than actual years since joining."
      );
    }
  }

  validateSalary(salary) {
    if (salary <= 0) {
      throw new Error("Salary cannot be negative.");
    }
  }

  async checkDuplicateEmployeeId(employeeId) {
    const teacher =
      await teacherRepository.findTeacherByEmployeeId(employeeId);

    if (teacher) {
      throw new Error("Employee ID already exists.");
    }
  }

  async checkDuplicateEmail(email) {
    const teacher =
      await teacherRepository.findTeacherByEmail(email);

    if (teacher) {
      throw new Error("Email already exists.");
    }
  }

  async checkDuplicatePhone(phone) {
    const teacher =
      await teacherRepository.findTeacherByPhone(phone);

    if (teacher) {
      throw new Error("Phone number already exists.");
    }
  }

  async checkDuplicateEmployeeIdForUpdate(employeeId, id) {
    const teacher =
      await teacherRepository.findTeacherByEmployeeIdExcludingId(
        employeeId,
        id
      );

    if (teacher) {
      throw new Error("Employee ID already exists.");
    }
  }

  async checkDuplicateEmailForUpdate(email, id) {
    const teacher =
      await teacherRepository.findTeacherByEmailExcludingId(
        email,
        id
      );

    if (teacher) {
      throw new Error("Email already exists.");
    }
  }

  async checkDuplicatePhoneForUpdate(phone, id) {
    const teacher =
      await teacherRepository.findTeacherByPhoneExcludingId(
        phone,
        id
      );

    if (teacher) {
      throw new Error("Phone number already exists.");
    }
  }

  async ensureTeacherExists(id) {
    const teacher =
      await teacherRepository.findTeacherById(id);

    if (!teacher) {
      throw new Error("Teacher not found.");
    }

    return teacher;
  }

  ensureTeacherNotDeleted(teacher) {
    if (teacher.isDeleted) {
      throw new Error("Teacher has been deleted.");
    }
  }

  buildTeacherFilter(query) {
    const filter = {
      isDeleted: false,
    };

    if (query.status) {
      filter.status = query.status;
    }

    if (query.department) {
      filter.department = query.department;
    }

    if (query.search) {
      filter.$or = [
        {
          firstName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          employeeId: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: query.search,
            $options: "i",
          },
        },
      ];
    }
    return filter;
  }
  async createTeacher(teacherData) {
    const normalizedData = this.normalizeTeacherData(teacherData);
    this.validateTeacherAge(normalizedData.dateOfBirth);
    this.validateJoiningDate(
        normalizedData.dateOfBirth,
        normalizedData.joiningDate
    );
    this.validateExperience(
        normalizedData.joiningDate,
        normalizedData.experience
    );
    this.validateSalary(normalizedData.salary);
    await this.checkDuplicateEmployeeId(normalizedData.employeeId);
    await this.checkDuplicateEmail(normalizedData.email);
    await this.checkDuplicatePhone(normalizedData.phone);

    const teacher = await teacherRepository.createTeacher(normalizedData);
    return teacher;

  }
  async updateTeacher(id, teacherData) {
    const teacher =  await this.ensureTeacherExists(id);
    this.ensureTeacherNotDeleted(teacher);

    const normalizedData = this.normalizeTeacherData(teacherData);
    this.validateTeacherAge(normalizedData.dateOfBirth);
    this.validateJoiningDate(
        normalizedData.dateOfBirth,
        normalizedData.joiningDate
    );
    this.validateExperience(
        normalizedData.joiningDate,
        normalizedData.experience
    );
    this.validateSalary(normalizedData.salary);
    await this.checkDuplicateEmployeeIdForUpdate(normalizedData.employeeId, id);
    await this.checkDuplicateEmailForUpdate(normalizedData.email, id);
    await this.checkDuplicatePhoneForUpdate(normalizedData.phone, id);
    return await teacherRepository.updateTeacher(id, normalizedData);
  }
  async getTeachers(query = {}){
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(
        Math.max(Number(query.limit) || 10, 1),
        100
    );
    const filter = this.buildTeacherFilter(query);
    return await teacherRepository.getTeachers(filter, { page, limit ,sort:{ createdAt: -1 }});
  }
  async getTeacherById(id) {
    const teacher = await this.ensureTeacherExists(id);
    this.ensureTeacherNotDeleted(teacher);
    return teacher;
  }
  async deleteTeacher(id) {
    const teacher = await this.ensureTeacherExists(id);
    this.ensureTeacherNotDeleted(teacher);
    return await teacherRepository.softDeleteTeacher(id);
  }
  async restoreTeacher(id){
    const teacher = await this.ensureTeacherExists(id);
    if (!teacher.isDeleted) {
        throw new Error("Teacher is not deleted.");
    }
    await this.checkDuplicateEmployeeId(
        teacher.employeeId
    );
    await this.checkDuplicateEmail(
        teacher.email
    );
    await this.checkDuplicatePhone(
        teacher.phone
    );
    return await teacherRepository.restoreTeacher(id);
  }
  /**
 * Teacher Dashboard Statistics
 */
async getTeacherStatistics() {

    const [
        totalTeachers,
        activeTeachers,
        inactiveTeachers,
        onLeaveTeachers,
        deletedTeachers
    ] = await Promise.all([

        teacherRepository.countTeachers({
            isDeleted: false
        }),

        teacherRepository.countTeachers({
            status: "Active",
            isDeleted: false
        }),

        teacherRepository.countTeachers({
            status: "Inactive",
            isDeleted: false
        }),

        teacherRepository.countTeachers({
            status: "On Leave",
            isDeleted: false
        }),

        teacherRepository.countTeachers({
            isDeleted: true
        })

    ]);

        return {
            totalTeachers,
            activeTeachers,
            inactiveTeachers,
            onLeaveTeachers,
            deletedTeachers
        };
    }
}
module.exports = new TeacherService();
