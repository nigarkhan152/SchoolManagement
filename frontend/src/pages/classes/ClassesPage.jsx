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
import SectionList from "../../components/sections/SectionList";
import { useState } from "react";
import classService from "../../services/classService";
import SectionForm from "../../components/sections/SectionForm";
import { BookOpen, GraduationCap, Users, BarChart3, Form, DoorOpen, CalendarDays } from "lucide-react";
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
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [deleteSectionModalOpen, setDeleteSectionModalOpen] =
  useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [deletingSection, setDeletingSection] = useState(false);
  const handleCreateSection = async (formData) => {
    try {
      setSectionLoading(true);

      await classService.createSection(
        selectedClass._id,
        formData
      );

      await refreshSelectedClass();

      setSectionModalOpen(false);

    } catch (error) {
      const message =
          error.response?.data?.message ||
          "Something went wrong.";

      alert(message);
  }
    finally {
      setSectionLoading(false);
    }
  };
  const handleUpdateSection = async (formData) => {
    try {
      setSectionLoading(true);

      await classService.updateSection(
        editingSection._id,
        formData
      );

      await refreshSelectedClass();

      setSectionModalOpen(false);
      setEditingSection(null);

    } catch (error) {
      const message = error.response?.data?.message ||
      "Failed to update section.";
      alert(message);
    } finally {
      setSectionLoading(false);
    }
  };
  const handleDeleteSection = async () => {
    try {
      setDeletingSection(true);

      await classService.deleteSection(
        sectionToDelete._id
      );

      await refreshSelectedClass();

      setDeleteSectionModalOpen(false);
      setSectionToDelete(null);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete section.";

      alert(message);
    } finally {
      setDeletingSection(false);
    }
  };

  const refreshSelectedClass = async () => {
  if (!selectedClass || !selectedClass._id) return;
  try {
    const response =
      await classService.getClassById(
        selectedClass._id
      );
    const data = response.data.data;
    setSelectedClass({
      ...data.class,
      sections: data.sections,
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <ContentContainer>
      {/* ================= Header ================= */}

      <PageHeader
        title="Class Management"
        subtitle="Create, update and manage all classes in your school."
        breadcrumb="Home / Classes"
        buttonText="Create Class"
        onButtonClick={() => {
          setSelectedClass(null);
          setModalOpen(true);
        }}
      />

      {/* ================= Stats ================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Classes"
          value={stats.totalClasses ?? 0}
          subtitle="All Classes"
          icon={<BookOpen size={28} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatsCard
          title="Active Classes"
          value={stats.activeClasses ?? 0}
          subtitle="Running Classes"
          icon={<GraduationCap size={28} />}
          iconBg="bg-violet-100"
          iconColor="text-violet-600"
        />

        <StatsCard
          title="Total Sections"
          value={stats.totalSections ?? 0}
          subtitle="All Sections"
          icon={<Users size={28} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatsCard
          title="Students"
          value={stats.studentsEnrolled ?? 0}
          subtitle="Across Classes"
          icon={<BarChart3 size={28} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* ================= Filters ================= */}

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

        <FilterBar>

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
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

        <div className="flex justify-center">

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
        
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 via-white to-white p-6">
          <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 shadow-sm">
                  <GraduationCap
                      size={36}
                      className="text-blue-600"
                  />
              </div>
              <div className="flex-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                      {selectedClass.name} 
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      {selectedClass.description || "No description"}
                  </p>

                  <div className="mt-5 flex items-center gap-3">

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
          </div>
        </div>

            {/* Details */}

            <div className="grid gap-4">

              {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Academic Year
                </p>

                <h4 className="mt-2 text-xl font-bold text-slate-800">
                  {selectedClass.academicYear || "-"}
                </h4>
              </div> */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <CalendarDays
                    size={18}
                    className="text-blue-600"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Academic Year
                  </p>
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  {selectedClass.academicYear || "-"}
                </h4>
              </div>

              {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Room Number
                </p>

                <h4 className="mt-2 text-xl font-bold text-slate-800">
                  {selectedClass.roomNumber || "-"}
                </h4>
              </div> */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <DoorOpen
                    size={18}
                    className="text-violet-600"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Room Number
                  </p>
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  {selectedClass.roomNumber || "-"}
                </h4>
              </div>

              {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Capacity
                </p>

                <h4 className="mt-2 text-xl font-bold text-slate-800">
                  {selectedClass.capacity}
                </h4>
              </div> */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <Users
                    size={18}
                    className="text-green-600"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Capacity
                  </p>
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  {selectedClass.capacity}
                </h4>
              </div>
            </div>

            {/* Sections */}

            <SectionList
                sections={selectedClass.sections || []}
                onAddSection={() => {
                    setEditingSection(null);
                    setSectionModalOpen(true);
                }}
                onEditSection={(section) => {
                  setEditingSection(section);
                  setSectionModalOpen(true);
                }}
                onDeleteSection={(section) => {
                  setSectionToDelete(section);
                  setDeleteSectionModalOpen(true);
                }}
            />
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
      <Modal
          isOpen={sectionModalOpen}
          onClose={() => setSectionModalOpen(false)}
          title="Add Section"
      >
      <SectionForm
        initialValues={editingSection}
        loading={sectionLoading}
        onSubmit={
          editingSection
            ? handleUpdateSection
            : handleCreateSection
        }
        onCancel={() => {
          setSectionModalOpen(false);
          setEditingSection(null);
        }}
      />
      </Modal>
      <Modal
        isOpen={deleteSectionModalOpen}
        onClose={() => {
            setDeleteSectionModalOpen(false);
            setSectionToDelete(null);
        }}
        title="Delete Section"
        size="sm"
    >
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">
                    Delete Confirmation
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        {sectionToDelete?.name}
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
                        setDeleteSectionModalOpen(false);
                        setSectionToDelete(null);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    disabled={deletingSection}
                    onClick={handleDeleteSection}
                >
                    {deletingSection
                        ? "Deleting..."
                        : "Delete"}
                </Button>
            </div>
        </div>
      </Modal>

    </ContentContainer>
  );
};

export default ClassesPage;