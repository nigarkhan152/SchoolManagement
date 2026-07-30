import { Plus } from "lucide-react";
import Button from "../common/Button";
import SectionCard from "./SectionCard";

const SectionList = ({
  sections = [],
  onAddSection,
  onEditSection,
  onDeleteSection,
}) => {
  return (
    <div className="space-y-4">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Sections
          </h3>

          <p className="text-sm text-slate-500">
            Manage class sections
          </p>
        </div>

        <Button
          size="sm"
          onClick={onAddSection}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Section
        </Button>
      </div>

      {/* Section List */}

      {sections.length > 0 ? (
        <div className="space-y-3">
          {sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              onEdit={onEditSection}
              onDelete={onDeleteSection}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-slate-700">
            No Sections Available
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Click on <span className="font-medium">"Add Section"</span> to create your first section.
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionList;