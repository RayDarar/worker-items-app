import axios, { AxiosResponse } from "axios";
import { Worker } from "@/types";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

function Catch() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        const response = (await method(...args)) as AxiosResponse;
        return response;
      } catch (error) {
        console.error(error);
        return error.response;
      }
    };
    return descriptor;
  };
}

class WorkerApi {
  @Catch()
  async getCount() {
    return api.get("/workers/count");
  }

  @Catch()
  async getPage(n: number) {
    return api.get("/workers/page/" + n);
  }

  @Catch()
  async getWorker(id: string) {
    return api.get("/workers/" + id);
  }

  @Catch()
  async createWorker(workerInfo: Worker) {
    return api.post("/workers/", workerInfo);
  }

  @Catch()
  async updateWorker(workerInfo: Worker) {
    const id = workerInfo.id;
    delete workerInfo.id;
    return api.put("/workers/" + id, workerInfo);
  }
}

export const workersApi = new WorkerApi();
