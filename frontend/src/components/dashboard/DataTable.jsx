import {
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

const DataTable = ({
  data = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-slate-500">Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Class Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Description
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Academic Year
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Room
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Capacity
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-12 text-center text-slate-500"
                >
                  No Classes Found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.description || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.academicYear}
                  </td>

                  <td className="px-6 py-4">
                    {item.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.capacity ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onView(item)}
                        className="rounded-lg border p-2 hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-lg border p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;