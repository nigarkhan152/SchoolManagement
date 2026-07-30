// import { useEffect, useState } from "react";
// import Input from "../common/Input";
// import Button from "../common/Button";

// const initialFormData = {
//   name: "",
//   description: "",
//   academicYear: "",
//   roomNumber: "",
//   capacity: "",
//   isActive: true,
// };

// const ClassForm = ({
//   initialValues,
//   onSubmit,
//   loading = false,
// }) => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (initialValues) {
//       setFormData({
//         name: initialValues.name || "",
//         description: initialValues.description || "",
//         academicYear: initialValues.academicYear || "",
//         roomNumber: initialValues.roomNumber || "",
//         capacity: initialValues.capacity || "",
//         isActive:
//           initialValues.isActive ?? true,
//       });
//     } else {
//       setFormData(initialFormData);
//     }
//   }, [initialValues]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } =
//       e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name =
//         "Class name is required.";
//     }

//     if (!formData.academicYear.trim()) {
//       newErrors.academicYear =
//         "Academic year is required.";
//     }

//     if (
//       !formData.capacity ||
//       Number(formData.capacity) <= 0
//     ) {
//       newErrors.capacity =
//         "Capacity must be greater than 0.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     onSubmit({
//       ...formData,
//       capacity: Number(formData.capacity),
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-5"
//     >
//       <Input
//         label="Class Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Enter class name"
//         error={errors.name}
//       />

//       <Input
//         label="Description"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Enter description"
//       />

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         <Input
//           label="Academic Year"
//           name="academicYear"
//           value={formData.academicYear}
//           onChange={handleChange}
//           placeholder="2026-2027"
//           error={errors.academicYear}
//         />

//         <Input
//           label="Room Number"
//           name="roomNumber"
//           value={formData.roomNumber}
//           onChange={handleChange}
//           placeholder="A-101"
//         />
//       </div>

//       <Input
//         label="Capacity"
//         type="number"
//         name="capacity"
//         value={formData.capacity}
//         onChange={handleChange}
//         placeholder="40"
//         error={errors.capacity}
//       />

//       <div className="flex items-center gap-3">
//         <input
//           type="checkbox"
//           name="isActive"
//           checked={formData.isActive}
//           onChange={handleChange}
//         />

//         <label className="text-sm font-medium text-slate-700">
//           Active
//         </label>
//       </div>

//       <div className="flex justify-end gap-3 pt-4">
//         <Button
//           type="submit"
//           disabled={loading}
//         >
//           {loading
//             ? "Saving..."
//             : initialValues
//             ? "Update Class"
//             : "Create Class"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ClassForm;
import { useEffect, useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

const initialFormState = {
  name: "",
  description: "",
  academicYear: "",
  roomNumber: "",
  capacity: "",
};

const ClassForm = ({
  initialValues = null,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        academicYear: initialValues.academicYear || "",
        roomNumber: initialValues.roomNumber || "",
        capacity: initialValues.capacity || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Class name is required.";
    }

    if (!formData.academicYear.trim()) {
      newErrors.academicYear =
        "Academic Year is required.";
    }

    if (!formData.capacity) {
      newErrors.capacity =
        "Capacity is required.";
    } else if (Number(formData.capacity) <= 0) {
      newErrors.capacity =
        "Capacity must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...formData,
      capacity: Number(formData.capacity),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Class Name */}

      <Input
        label="Class Name"
        name="name"
        placeholder="Enter class name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      {/* Description */}

      <TextArea
        label="Description"
        name="description"
        placeholder="Enter class description"
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />

      {/* Academic Year + Room */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Academic Year"
          name="academicYear"
          placeholder="2026-2027"
          value={formData.academicYear}
          onChange={handleChange}
          error={errors.academicYear}
          required
        />

        <Input
          label="Room Number"
          name="roomNumber"
          placeholder="A-101"
          value={formData.roomNumber}
          onChange={handleChange}
        />
      </div>

      {/* Capacity + Status */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="number"
          label="Capacity"
          name="capacity"
          placeholder="40"
          value={formData.capacity}
          onChange={handleChange}
          error={errors.capacity}
          required
        />

        <Select
          label="Status"
          name="isActive"
          value={String(formData.isActive)}
          onChange={handleChange}
          options={[
            {
              label: "Active",
              value: "true",
            },
            {
              label: "Inactive",
              value: "false",
            },
          ]}
        />
      </div>

      {/* Footer */}

      <div className="flex justify-end pt-3">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : initialValues
            ? "Update Class"
            : "Create Class"}
        </Button>
      </div>
    </form>
  );
};

export default ClassForm;