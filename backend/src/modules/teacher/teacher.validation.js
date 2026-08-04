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

  if (!joiningDate) {
    throw new Error("Joining Date is required");
  }

  if (salary === undefined || salary === null) {
    throw new Error("Salary is required");
  }

  if (!phone) {
    throw new Error("Phone number is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (
    experience !== undefined &&
    experience < 0
  ) {
    throw new Error("Experience cannot be negative");
  }

  if (
    salary !== undefined &&
    salary < 0
  ) {
    throw new Error("Salary cannot be negative");
  }
};

const updateTeacherValidation = (data) => {
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
};

export {
  createTeacherValidation,
  updateTeacherValidation,
};