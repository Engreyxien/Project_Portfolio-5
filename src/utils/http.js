import axios from "axios";

export function useApi(token = null) {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer 13|j6aKZ96mUiOYtjuqwtKKYZ7P2EkUySgk7SKGRkuMbbf0e520`,
    },
  });
}
export default useApi;
