import { TaskType } from "./types/TaskType";

const backendUrl = import.meta.env.VITE_API_BASE_URL;

export const logOut = async () => {
  return fetch(`${backendUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const validateToken = async () => {
  return fetch(`${backendUrl}/api/auth/validate-token`, {
    method: "POST",
    credentials: "include",
  });
};

export const fetchTasks = async () => {
  return fetch(`${backendUrl}/api/task`, {
    method: "GET",
    credentials: "include",
  });
};

export const profile = async () => {
  return fetch(`${backendUrl}/api/profile`, {
    method: "GET",
    credentials: "include",
  });
};

export const fetchTask = async (taskId: string | undefined) => {
  if (!taskId) throw new Error("Fetch Error: task ID is null");

  return fetch(`${backendUrl}/api/task/${taskId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const updateTask = async (data: TaskType) => {
  return fetch(`${backendUrl}/api/task/update/${data._id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
