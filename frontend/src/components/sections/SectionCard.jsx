import { Pencil, Trash2, Users } from "lucide-react";
import Badge from "../common/Badge";
const SectionCard = ({
  section,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-base font-semibold text-slate-800">
            {section.name}
          </h4>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Users size={15} />

            <span>
              Capacity : {section.capacity}
            </span>
          </div>
        </div>

        <Badge
          variant={
            section.isActive
              ? "success"
              : "danger"
          }
        >
          {section.isActive
            ? "Active"
            : "Inactive"}
        </Badge>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onEdit(section)}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(section)}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SectionCard;