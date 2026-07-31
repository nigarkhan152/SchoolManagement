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
import { BookOpen, GraduationCap, Users, BarChart3, Form } from "lucide-react";
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