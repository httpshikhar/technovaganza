import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// User APIs
export const getUserDashboard = () => API.get('/users/dashboard');
export const registerForSoloEvent = (eventData) => API.post('/users/register-solo', eventData);

// Event APIs
export const getAllEvents = () => API.get('/events');
export const getEventById = (id) => API.get(`/events/${id}`);

// Team APIs
export const createTeam = (teamData) => API.post('/teams/create', teamData);
export const validateTeamMember = (pid) => API.post('/teams/validate-member', { pid });

// Admin APIs
export const createEvent = (eventData) => API.post('/admin/events', eventData);
export const getAdminEvents = () => API.get('/admin/events');
export const getStatistics = () => API.get('/admin/statistics');
export const deleteEvent = (id) => API.delete(`/admin/events/${id}`);

// Admin Export APIs
export const exportEventParticipants = (eventId, college = '') => 
  API.get(`/admin/export/event/${eventId}${college ? `?college=${college}` : ''}`, 
    { responseType: 'blob' }
  );

export const exportAllParticipants = (college = '') => 
  API.get(`/admin/export/all-participants${college ? `?college=${college}` : ''}`, 
    { responseType: 'blob' }
  );

export const exportByCollege = (college) => 
  API.get(`/admin/export/college/${college}`, 
    { responseType: 'blob' }
  );

export default API;