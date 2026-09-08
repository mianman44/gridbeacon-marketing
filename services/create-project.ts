import api from "./api";

export async function createProject(data: {
  name: string;
  city: string;
  keyword: string;
}) {
  const response = await api.post("/projects", data);

  return response.data;
}