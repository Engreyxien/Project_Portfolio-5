import axios from "axios";

export function useApi(token = null) {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default useApi;
