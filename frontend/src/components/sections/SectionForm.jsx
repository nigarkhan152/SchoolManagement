import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const SectionForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: 40,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        capacity: initialData.capacity || 40,
        isActive: initialData.isActive ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      name: formData.name.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Section Name"
        name="name"
        placeholder="Enter section name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Capacity"
        name="capacity"
        type="number"
        min={1}
        value={formData.capacity}
        onChange={handleChange}
        required
      />

      {initialData && (
        <div className="flex items-center gap-3">
          <input
            id="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isActive: e.target.checked,
              }))
            }
          />

          <label
            htmlFor="isActive"
            className="text-sm text-slate-700"
          >
            Active Section
          </label>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Section"
            : "Create Section"}
        </Button>
      </div>
    </form>
  );
};

export default SectionForm;