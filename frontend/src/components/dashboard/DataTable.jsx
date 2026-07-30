// import {
//   Pencil,
//   Trash2,
//   Eye,
// } from "lucide-react";

// const DataTable = ({
//   data = [],
//   loading = false,
//   onView,
//   onEdit,
//   onDelete,
// }) => {
//   if (loading) {
//     return (
//       <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
//         <p className="text-slate-500">Loading classes...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-slate-50">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Class Name
//               </th>

//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Description
//               </th>

//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Academic Year
//               </th>

//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Room
//               </th>

//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Capacity
//               </th>

//               <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
//                 Status
//               </th>

//               <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="7"
//                   className="py-12 text-center text-slate-500"
//                 >
//                   No Classes Found
//                 </td>
//               </tr>
//             ) : (
//               data.map((item) => (
//                 <tr
//                   key={item._id}
//                   className="border-t border-slate-100 hover:bg-slate-50"
//                 >
//                   <td className="px-6 py-4 font-medium text-slate-800">
//                     {item.name}
//                   </td>

//                   <td className="px-6 py-4 text-slate-600">
//                     {item.description || "-"}
//                   </td>

//                   <td className="px-6 py-4">
//                     {item.academicYear}
//                   </td>

//                   <td className="px-6 py-4">
//                     {item.roomNumber || "-"}
//                   </td>

//                   <td className="px-6 py-4">
//                     {item.capacity ?? "-"}
//                   </td>

//                   <td className="px-6 py-4">
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                         item.isActive
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {item.isActive
//                         ? "Active"
//                         : "Inactive"}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button
//                         onClick={() => onView(item)}
//                         className="rounded-lg border p-2 hover:bg-slate-100"
//                       >
//                         <Eye size={18} />
//                       </button>

//                       <button
//                         onClick={() => onEdit(item)}
//                         className="rounded-lg border p-2 text-blue-600 hover:bg-blue-50"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       <button
//                         onClick={() => onDelete(item)}
//                         className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataTable;
import {
  Pencil,
  Trash2,
  Eye,
  School,
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
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="animate-pulse divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex items-center gap-6 px-6 py-5"
            >
              <div className="h-5 w-40 rounded bg-slate-200"></div>
              <div className="h-5 w-52 rounded bg-slate-200"></div>
              <div className="h-5 w-28 rounded bg-slate-200"></div>
              <div className="h-5 w-20 rounded bg-slate-200"></div>
              <div className="h-5 w-16 rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Class
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Academic Year
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Room
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Capacity
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="py-20"
                >
                  <div className="flex flex-col items-center justify-center">

                    <div className="mb-4 rounded-full bg-slate-100 p-5">
                      <School
                        size={40}
                        className="text-slate-400"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700">
                      No Classes Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Start by creating your first class.
                    </p>

                  </div>
                </td>
              </tr>

            ) : (

              data.map((item) => (
                <tr
                  key={item._id}
                  className="
                    border-b
                    border-slate-100
                    transition-all
                    duration-200
                    hover:bg-slate-50
                  "
                >

                  {/* Class */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                        <School
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          School Class
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Description */}

                  <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                    {item.description || "-"}
                  </td>

                  {/* Academic Year */}

                  <td className="px-6 py-5 font-medium text-slate-700">
                    {item.academicYear}
                  </td>

                  {/* Room */}

                  <td className="px-6 py-5 text-slate-600">
                    {item.roomNumber || "-"}
                  </td>

                  {/* Capacity */}

                  <td className="px-6 py-5">
                    <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {item.capacity ?? "-"}
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-2">

                      <button
                        onClick={() => onView(item)}
                        title="View"
                        className="
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          p-2.5
                          text-slate-600
                          transition-all
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onEdit(item)}
                        title="Edit"
                        className="
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          p-2.5
                          text-slate-600
                          transition-all
                          hover:border-amber-200
                          hover:bg-amber-50
                          hover:text-amber-600
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        title="Delete"
                        className="
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          p-2.5
                          text-slate-600
                          transition-all
                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-red-600
                        "
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