import { api } from "@/lib/api";
import type { LoginRequest } from "@/types";

export async function login(payload: LoginRequest) {
  const { data } = await api.post("/api/auth/login/", payload);

  return data;
}
