import TeacherRepository from "./teacher.repository.js";

import {
  createTeacherValidation,
  updateTeacherValidation,
} from "./teacher.validation.js";

class TeacherService {

  // ==========================
// HELPER METHODS
// ==========================

normalizeTeacherData(data) {
  return {
    ...data,
    employeeId: data.employeeId?.trim().toUpperCase(),
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    email: data.email?.trim().toLowerCase(),
    phone: data.phone?.trim(),
    qualification: data.qualification?.trim(),
  };
}

validateTeacherAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  if (dob > today) {
    throw new Error("Date of birth cannot be in the future.");
  }

  let age = today.getFullYear() - dob.getFullYear();

  const monthDifference =
    today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < dob.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    throw new Error(
      "Teacher must be at least 18 years old."
    );
  }
}

validateJoiningDate(dateOfBirth, joiningDate) {
  const dob = new Date(dateOfBirth);
  const joining = new Date(joiningDate);
  const today = new Date();

  if (joining > today) {
    throw new Error(
      "Joining date cannot be in the future."
    );
  }

  if (joining <= dob) {
    throw new Error(
      "Joining date must be after the date of birth."
    );
  }
}

validateExperience(joiningDate, experience) {
  if (experience < 0) {
    throw new Error(
      "Experience cannot be negative."
    );
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
  if (salary < 0) {
    throw new Error(
      "Salary cannot be negative."
    );
  }
}

async checkDuplicateEmployeeId(employeeId) {
  const teacher =
    await TeacherRepository.findTeacherByEmployeeId(
      employeeId
    );

  if (teacher) {
    throw new Error(
      "Employee ID already exists."
    );
  }
}

async checkDuplicateEmail(email) {
  const teacher =
    await TeacherRepository.findTeacherByEmail(
      email
    );

  if (teacher) {
    throw new Error(
      "Email already exists."
    );
  }
}

async checkDuplicatePhone(phone) {
  const teacher =
    await TeacherRepository.findTeacherByPhone(
      phone
    );

  if (teacher) {
    throw new Error(
      "Phone number already exists."
    );
  }
}

async checkDuplicateEmployeeIdForUpdate(
  employeeId,
  id
) {
  const teacher =
    await TeacherRepository.findTeacherByEmployeeIdExcludingId(
      employeeId,
      id
    );

  if (teacher) {
    throw new Error(
      "Employee ID already exists."
    );
  }
}

async checkDuplicateEmailForUpdate(email, id) {
  const teacher =
    await TeacherRepository.findTeacherByEmailExcludingId(
      email,
      id
    );

  if (teacher) {
    throw new Error(
      "Email already exists."
    );
  }
}

async checkDuplicatePhoneForUpdate(phone, id) {
  const teacher =
    await TeacherRepository.findTeacherByPhoneExcludingId(
      phone,
      id
    );

  if (teacher) {
    throw new Error(
      "Phone number already exists."
    );
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

  async ensureTeacherExists(
    id,
    includeDeleted = false
  ) {
    const teacher =
      await TeacherRepository.getTeacherById(
        id,
        includeDeleted
      );

    if (!teacher) {
      throw new Error(
        "Teacher not found."
      );
    }

    return teacher;
  }
  async createTeacher(teacherData) {
    createTeacherValidation(teacherData);
    const normalizedData = this.normalizeTeacherData(teacherData);

    // Business Validations
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

    // Duplicate Checks
    await this.checkDuplicateEmployeeId(
      normalizedData.employeeId
    );

    await this.checkDuplicateEmail(
      normalizedData.email
    );

    await this.checkDuplicatePhone(
      normalizedData.phone
    );

    // Create Teacher
    return await TeacherRepository.createTeacher(
      normalizedData
    );
  }
  async getTeacherById(id) {
    return await this.ensureTeacherExists(id);
  }
  async getTeachers(query) {
    const {
      page = 1,
      limit = 10,
    } = query;

    const filters = this.buildTeacherFilter(query);

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const skip = (pageNumber - 1) * pageSize;

    const data = await TeacherRepository.getTeachers(
      filters,
      skip,
      pageSize,
      {
        createdAt: -1,
      }
    );

    const total = await TeacherRepository.countTeachers(
      filters
    );

    return {
      data,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        hasNext:
          pageNumber < Math.ceil(total / pageSize),
        hasPrevious: pageNumber > 1,
      },
    };
  }
  async updateTeacher(id, teacherData) {
    updateTeacherValidation(teacherData);
    const teacher = await this.ensureTeacherExists(id);

    if (teacher.isDeleted) {
      throw new Error("Teacher has been deleted.");
    }

    const normalizedData =
      this.normalizeTeacherData(teacherData);

    // Business Validations
    this.validateTeacherAge(
      normalizedData.dateOfBirth
    );

    this.validateJoiningDate(
      normalizedData.dateOfBirth,
      normalizedData.joiningDate
    );

    this.validateExperience(
      normalizedData.joiningDate,
      normalizedData.experience
    );

    this.validateSalary(
      normalizedData.salary
    );

    // Duplicate Checks
    await this.checkDuplicateEmployeeIdForUpdate(
      normalizedData.employeeId,
      id
    );

    await this.checkDuplicateEmailForUpdate(
      normalizedData.email,
      id
    );

    await this.checkDuplicatePhoneForUpdate(
      normalizedData.phone,
      id
    );

    return await TeacherRepository.updateTeacher(
      id,
      normalizedData
    );
  }
  async deleteTeacher(id) {
    const teacher = await this.ensureTeacherExists(id);

    if (teacher.isDeleted) {
      throw new Error("Teacher has already been deleted.");
    }

    return await TeacherRepository.deleteTeacher(id);
  }
  async restoreTeacher(id) {
    const teacher = await this.ensureTeacherExists(
      id,
      true
    );

    if (!teacher.isDeleted) {
      throw new Error("Teacher is not deleted.");
    }

    // Duplicate Checks
    await this.checkDuplicateEmployeeId(
      teacher.employeeId
    );

    await this.checkDuplicateEmail(
      teacher.email
    );

    await this.checkDuplicatePhone(
      teacher.phone
    );

    return await TeacherRepository.restoreTeacher(id);
  }
  async getTeacherStatistics() {
    return await TeacherRepository.getStats();
  }
}

export default new TeacherService();