const createTeacherValidation = (data) => {
  const {
    employeeId,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    department,
    qualification,
    experience,
    joiningDate,
    salary,
    phone,
    email,
    status,
  } = data;

  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

  if (!firstName) {
    throw new Error("First name is required");
  }

  if (!lastName) {
    throw new Error("Last name is required");
  }

  if (!gender) {
    throw new Error("Gender is required");
  }

  if (!["Male", "Female", "Other"].includes(gender)) {
    throw new Error("Invalid gender");
  }

  if (!dateOfBirth) {
    throw new Error("Date of Birth is required");
  }

  if (!department) {
    throw new Error("Department is required");
  }

  if (!qualification) {
    throw new Error("Qualification is required");
  }

  if (experience === undefined || experience === null) {
    throw new Error("Experience is required");
  }

  if (experience < 0) {
    throw new Error("Experience cannot be negative");
  }

  if (!joiningDate) {
    throw new Error("Joining Date is required");
  }

  if (salary === undefined || salary === null) {
    throw new Error("Salary is required");
  }

  if (salary < 0) {
    throw new Error("Salary cannot be negative");
  }

  if (!phone) {
    throw new Error("Phone number is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error("Invalid phone number");
  }

  if (
    status &&
    !["Active", "Inactive", "On Leave"].includes(status)
  ) {
    throw new Error("Invalid status");
  }
};

const updateTeacherValidation = (data) => {
  if (
    data.gender &&
    !["Male", "Female", "Other"].includes(data.gender)
  ) {
    throw new Error("Invalid gender");
  }

  if (
    data.experience !== undefined &&
    data.experience < 0
  ) {
    throw new Error("Experience cannot be negative");
  }

  if (
    data.salary !== undefined &&
    data.salary < 0
  ) {
    throw new Error("Salary cannot be negative");
  }

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email address");
    }
  }

  if (data.phone) {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(data.phone)) {
      throw new Error("Invalid phone number");
    }
  }

  if (
    data.status &&
    !["Active", "Inactive", "On Leave"].includes(data.status)
  ) {
    throw new Error("Invalid status");
  }
};

export {
  createTeacherValidation,
  updateTeacherValidation,
};