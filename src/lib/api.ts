import { API_URL } from "@/lib/config";
import type { ApiResponse } from "@/types";
import axios, { isAxiosError } from "axios";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>;

    if (!body.success) {
      return Promise.reject(new Error(body.message));
    }

    return { ...response, data: body.data };
  },
  (error) => {
    const message = isAxiosError(error)
      ? ((error.response?.data as ApiResponse<unknown> | undefined)?.message ??
        error.message)
      : "Network error";

    return Promise.reject(new Error(message));
  },
);
