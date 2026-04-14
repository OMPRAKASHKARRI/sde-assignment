import axios from 'axios';

const API = 'http://localhost:5000/notes';

const getToken = () => localStorage.getItem('token');

export const getNotes = () =>
  axios.get(API, {
    headers: { Authorization: getToken() }
  });

export const createNote = (data) =>
  axios.post(API, data, {
    headers: { Authorization: getToken() }
  });

export const updateNote = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: getToken() }
  });

export const deleteNote = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: getToken() }
  });