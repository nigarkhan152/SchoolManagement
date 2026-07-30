import api from "./api";

const classService = {
  getClasses(params) {
    return api.get("/classes", { params });
  },

  getStats() {
    return api.get("/classes/stats");
  },

  getClassById(id) {
    return api.get(`/classes/${id}`);
  },

  createClass(data) {
    return api.post("/classes", data);
  },

  updateClass(id, data) {
    return api.put(`/classes/${id}`, data);
  },

  deleteClass(id) {
    return api.delete(`/classes/${id}`);
  },

  createSection(classId, data) {
    return api.post(`/classes/${classId}/sections`, data);
  },

  updateSection(id, data) {
    return api.put(`/classes/sections/${id}`, data);
  },

  deleteSection(id) {
    return api.delete(`/classes/sections/${id}`);
  },
};

export default classService;