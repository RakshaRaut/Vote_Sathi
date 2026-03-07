import axios from "axios";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCandidates = async () => {
  const { data } = await apiClient.get("/users");

  return data.map((user) => ({
    id: user.id,
    name: user.name,
    party: user.company?.name || "Independent",
    location: user.address?.city || "N/A",
    email: user.email || "N/A",
  }));
};
