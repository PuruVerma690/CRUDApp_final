import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const listItems = () => api.get("/items").then((r) => r.data);
export const getItem = (id) => api.get(`/items/${id}`).then((r) => r.data);
export const createItem = (payload) =>
  api.post("/items", payload).then((r) => r.data);
export const updateItem = (id, payload) =>
  api.put(`/items/${id}`, payload).then((r) => r.data);
export const patchItem = (id, payload) =>
  api.patch(`/items/${id}`, payload).then((r) => r.data);
export const deleteItem = (id) =>
  api.delete(`/items/${id}`).then((r) => r.data);
