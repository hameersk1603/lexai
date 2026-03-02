import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getUsersByRole = (role) => api.get(`/users/role/${role}`);
export const updateUser = (id, data) => api.put(`/users/update/${id}`, data);

export const createLawyerProfile = (userId, data) => api.post(`/lawyers/create/${userId}`, data);
export const getAllLawyers = () => api.get('/lawyers/all');
export const searchLawyers = (params) => api.get('/lawyers/search', { params });
export const getLawyerById = (id) => api.get(`/lawyers/${id}`);

export const createCase = (userId, data) => api.post(`/cases/create/${userId}`, data);
export const getCasesByUser = (userId) => api.get(`/cases/user/${userId}`);
export const getAllCases = () => api.get('/cases/all');
export const deleteCase = (id) => api.delete(`/cases/delete/${id}`);

export const saveDocument = (data) => api.post('/documents/save', data);
export const getDocumentsByUser = (userId) => api.get(`/documents/user/${userId}`);
export const deleteDocument = (id) => api.delete(`/documents/delete/${id}`);

export const saveChat = (data) => api.post('/chat/save', data);
export const getChatHistory = (userId) => api.get(`/chat/history/${userId}`);
export const clearChat = (userId) => api.delete(`/chat/clear/${userId}`);

export default api;