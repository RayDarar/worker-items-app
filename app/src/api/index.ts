import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const workersApi = {
  async getCount() {
    return api.get("/workers/count");
  },
  async getPage(n: number) {
    return api.get("/workers/page/" + n);
  },
};
