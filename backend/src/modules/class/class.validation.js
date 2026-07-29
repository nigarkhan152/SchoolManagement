const createClassValidation = (data) => {
  const {
    name,
    academicYear,
    capacity,
  } = data;

  if (!name) {
    throw new Error("Class name is required");
  }

  if (!academicYear) {
    throw new Error("Academic year is required");
  }

  if (capacity && capacity < 1) {
    throw new Error("Capacity must be greater than 0");
  }
};

const updateClassValidation = (data) => {
  if (
    data.capacity &&
    data.capacity < 1
  ) {
    throw new Error("Capacity must be greater than 0");
  }
};

const createSectionValidation = (data) => {
  const {
    classId,
    name,
  } = data;

  if (!classId) {
    throw new Error("Class Id is required");
  }

  if (!name) {
    throw new Error("Section name is required");
  }
};

const updateSectionValidation = (data) => {
  if (
    data.capacity &&
    data.capacity < 1
  ) {
    throw new Error("Capacity must be greater than 0");
  }
};

export {
  createClassValidation,
  updateClassValidation,
  createSectionValidation,
  updateSectionValidation,
};