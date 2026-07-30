import { useState, useEffect, useCallback } from "react";
import classService from "../services/classService";

const useClasses = () => {
  // =========================
  // Data State
  // =========================

  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({});

  // =========================
  // UI State
  // =========================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);

  // =========================
  // Filters
  // =========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // Pagination
  // =========================

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  // =========================
  // Fetch Classes
  // =========================

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await classService.getClasses({
        page,
        limit,
        search,
        status,
      });

      setClasses(response.data.data.data);

      setPagination(response.data.data.pagination);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch classes."
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status]);

  // =========================
  // Fetch Stats
  // =========================

  const fetchStats = useCallback(async () => {
    try {
      const response = await classService.getStats();

      setStats(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // =========================
  // Class Details
  // =========================

  const fetchClassDetails = async (id) => {
  try {
    setLoading(true);

    const response = await classService.getClassById(id);

    setSelectedClass({
      ...response.data.data.class,
      sections: response.data.data.sections || [],
    });

    setDrawerOpen(true);
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to fetch class."
    );
  } finally {
    setLoading(false);
  }
};

  // =========================
  // Create
  // =========================

  const createClass = async (payload) => {
    try {
      await classService.createClass(payload);

      await refresh();

      setModalOpen(false);
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Update
  // =========================

  const updateClass = async (id, payload) => {
  try {
    await classService.updateClass(id, payload);

    await refresh();

    if (selectedClass?._id === id) {
      await fetchClassDetails(id);
    }

    setModalOpen(false);
  } catch (err) {
    throw err;
  }
};

  // =========================
  // Delete
  // =========================

  const deleteClass = async (id) => {
    try {
      await classService.deleteClass(id);

      await refresh();

      setDrawerOpen(false);
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Refresh
  // =========================

  const refresh = async () => {
    await Promise.all([
      fetchClasses(),
      fetchStats(),
    ]);
  };

  // =========================
  // Effects
  // =========================

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // =========================
  // Return
  // =========================

  return {
    // Data
    classes,
    stats,
    selectedClass,
    pagination,

    // UI
    loading,
    error,

    drawerOpen,
    setDrawerOpen,

    modalOpen,
    setModalOpen,

    // Filters
    search,
    setSearch,

    status,
    setStatus,

    // Pagination
    page,
    setPage,

    limit,
    setLimit,

    // Selection
    setSelectedClass,

    // API
    fetchClasses,
    fetchStats,
    fetchClassDetails,

    createClass,
    updateClass,
    deleteClass,

    refresh,
  };
};

export default useClasses;