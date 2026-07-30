import ContentContainer from "../../components/dashboard/ContentContainer";
import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";
import Drawer from "../../components/common/Drawer";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import useClasses from "../../hooks/useClasses";
import Modal from "../../components/common/Modal";
import ClassForm from "../../components/forms/ClassForm";
import { useState } from "react";

const ClassesPage = () => {
  const {
    classes,
    stats,
    loading,

    search,
    setSearch,

    status,
    setStatus,

    pagination,
    page,
    setPage,
    setSelectedClass,
    fetchClassDetails,
    drawerOpen,
    setDrawerOpen,
    setModalOpen,
    createClass,
    updateClass,
    modalOpen,
    selectedClass,
    deleteClass,

  } = useClasses();
  const [saving, setSaving] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  return (
    <ContentContainer>
      {/* ================= Header ================= */}

      <PageHeader
        title="Class Management"
        subtitle="Create, update and manage all classes."
        buttonText="Create Class"
        onButtonClick={() => {
        setSelectedClass(null);
        setModalOpen(true);
        }}
      />

      {/* ================= Stats ================= */}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Classes"
          value={stats.totalClasses ?? 0}
        />

        <StatsCard
          title="Active Classes"
          value={stats.activeClasses ?? 0}
        />

        <StatsCard
          title="Total Sections"
          value={stats.totalSections ?? 0}
        />

        <StatsCard
          title="Students"
          value={stats.studentsEnrolled ?? 0}
        />
      </div>

      {/* ================= Filters ================= */}

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

        <FilterBar>

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes..."
          />

          {/* Status Dropdown baad me dynamic banayenge */}

        </FilterBar>

        {/* ================= Table ================= */}

        <div className="mt-6">

          <DataTable
            data={classes}
            loading={loading}
            onView={(item) =>
              fetchClassDetails(item._id)
            }
            onEdit={(item) => {
              setSelectedClass(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setClassToDelete(item);
              setDeleteModalOpen(true);
            }}
          />

        </div>

        {/* ================= Pagination ================= */}

        <div className="mt-6">

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNext}
            hasPrevious={pagination.hasPrevious}
            onNext={() =>
              setPage((prev) => prev + 1)
            }
            onPrevious={() =>
              setPage((prev) => prev - 1)
            }
          />

        </div>

      </div>
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Class Details"
        footer={
          <Button
            className="w-full"
            onClick={() => {
              setDrawerOpen(false);
              setModalOpen(true);
            }}
          >
            Edit Class
          </Button>
        }
      >
        {selectedClass && (
          <div className="space-y-6">

            {/* Header */}

            <div className="rounded-xl bg-slate-50 p-5">

              <h2 className="text-2xl font-bold">
                {selectedClass.name}
              </h2>

              <p className="mt-2 text-slate-600">
                {selectedClass.description || "-"}
              </p>

              <div className="mt-4">
                <Badge
                  variant={
                    selectedClass.isActive
                      ? "success"
                      : "danger"
                  }
                >
                  {selectedClass.isActive
                    ? "Active"
                    : "Inactive"}
                </Badge>
              </div>

            </div>

            {/* Details */}

            <div className="grid gap-4">

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">
                  Academic Year
                </p>

                <h4 className="mt-1 font-semibold">
                  {selectedClass.academicYear || "-"}
                </h4>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">
                  Room Number
                </p>

                <h4 className="mt-1 font-semibold">
                  {selectedClass.roomNumber || "-"}
                </h4>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-slate-500">
                  Capacity
                </p>

                <h4 className="mt-1 font-semibold">
                  {selectedClass.capacity}
                </h4>
              </div>

            </div>

            {/* Sections */}

            <div>

              <h3 className="mb-3 text-lg font-semibold">
                Sections
              </h3>

              {selectedClass.sections?.length ? (

                <div className="space-y-3">

                  {selectedClass.sections.map((section) => (

                    <div
                      key={section._id}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >
                      <div>

                        <p className="font-semibold">
                          {section.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          Capacity : {section.capacity}
                        </p>

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

                  ))}

                </div>

              ) : (

                <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
                  No Sections Available
                </div>

              )}

            </div>

          </div>
        )}
      </Drawer>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedClass(null);
        }}
        title={
          selectedClass
            ? "Edit Class"
            : "Create Class"
        }
        size="lg"
      >
        <ClassForm
          initialValues={selectedClass}
          loading={saving}
          onSubmit={async (values) => {
            try {
              setSaving(true);

              if (selectedClass) {
                await updateClass(
                  selectedClass._id,
                  values
                );
              } else {
                await createClass(values);
              }

              setModalOpen(false);
              setSelectedClass(null);
            } finally {
              setSaving(false);
            }
          }}
        />
      </Modal>
      <Modal
      isOpen={deleteModalOpen}
      onClose={() => {
        setDeleteModalOpen(false);
        setClassToDelete(null);
      }}
      title="Delete Class"
      size="sm"
    >
      <div className="space-y-6">

        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Delete Confirmation
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              {classToDelete?.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={() => {
              setDeleteModalOpen(false);
              setClassToDelete(null);
            }}
          >
            Cancel
          </Button>

          <Button
            disabled={deleting}
            onClick={async () => {
              try {
                setDeleting(true);

                await deleteClass(classToDelete._id);

                setDeleteModalOpen(false);
                setClassToDelete(null);
              } catch (err) {
                console.error(err);
              } finally {
                setDeleting(false);
              }
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>

        </div>

      </div>
      </Modal>
    
    </ContentContainer>
  );
};

export default ClassesPage;