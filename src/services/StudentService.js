import http from "./http-common";

const getAll = () => {
  return http.get("/student");
};

const get = (id) => {
  return http.get(`/student/${id}`);
};

const create = (data) => {
  return http.post("/student", data);
};

const update = (id, data) => {
  return http.put(`/student/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/student/${id}`);
};

const removeAll = () => {
  return http.delete(`/student`);
};

const findByName = (name) => {
  return http.get(`/student?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
