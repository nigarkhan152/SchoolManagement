import React from "react";
import Badge from "../common/Badge";

const DataTable = ({
  columns = [],
  data = [],
  actions,
}) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">

      <table className="min-w-full divide-y divide-slate-200">

        <thead className="bg-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
              >
                {column.title}
              </th>
            ))}

            {actions && (
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-6 py-4 text-sm text-slate-700"
                  >
                    {column.render ? (
                      column.render(row)
                    ) : column.key === "status" ? (
                      <Badge
                        variant={
                          row.status === "Active"
                            ? "success"
                            : "danger"
                        }
                      >
                        {row.status}
                      </Badge>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}

                {actions && (
                  <td className="px-6 py-4 text-right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="py-10 text-center text-slate-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
};

export default DataTable;