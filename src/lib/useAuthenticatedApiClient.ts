// useAuthenticatedApiClient.ts
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { apiClient } from "./apiClient";

export const useAuthenticatedApiClient = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const attachToken = async () => {
      const token = await getToken();
      if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    };
    attachToken();
  }, [getToken]);

  return apiClient;
};
