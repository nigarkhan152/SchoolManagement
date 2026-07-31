import {
  GraduationCap,
  MoreVertical,
  Users,
} from "lucide-react";

import Badge from "../common/Badge";

const SectionCard = ({
  section,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md">

      <div className="flex items-start justify-between">

        {/* Left */}

        <div className="flex gap-3">

          {/* Icon */}

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
            <GraduationCap
              size={22}
              className="text-blue-600"
            />
          </div>

          {/* Content */}

          <div>

            <h4 className="text-base font-semibold text-slate-800">
              {section.name}
            </h4>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

              <Users size={15} />

              <span>
                {section.studentCount ?? section.capacity} Students
              </span>

            </div>

            <div className="mt-3">

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

          </div>

        </div>

        {/* Actions */}

        <button
          onClick={() => onEdit(section)}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <MoreVertical size={18} />
        </button>

      </div>

    </div>
  );
};

export default SectionCard;