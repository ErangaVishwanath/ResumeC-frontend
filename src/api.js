import axios from "axios";

const API_BASE = "http://localhost:8000";  // your FastAPI backend

export const verifyResume = (formData) =>
  axios.post(`${API_BASE}/verify_resume/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getQuestions = (data) =>
  axios.post(`${API_BASE}/get-questions`, data);

export const checkAnswer = (data) =>
  axios.post(`${API_BASE}/check-answer`, data);
