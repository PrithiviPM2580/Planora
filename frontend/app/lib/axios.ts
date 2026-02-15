import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //   localStorage.removeItem("token");
      //   window.location.href = "/auth/login";
      window.dispatchEvent(new Event("force-logout"));
    }
    return Promise.reject(error);
  },
);

export const postData = async <T>(path: string, data: unknown): Promise<T> => {
  const response = await apiClient.post(path, data);
  return response.data;
};

export const fetchData = async <T>(path: string): Promise<T> => {
  const response = await apiClient.get(path);
  return response.data;
};

export const updateData = async <T>(
  path: string,
  data: unknown,
): Promise<T> => {
  const response = await apiClient.put(path, data);
  return response.data;
};

export const deleteData = async <T>(path: string): Promise<T> => {
  const response = await apiClient.delete(path);
  return response.data;
};
