import axios, { AxiosResponse } from "axios";
import { Worker, WorkerItem } from "@/types";

const api = axios.create({
  baseURL: "/",
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
  async updateWorker({ id, firstName, lastName, middleName }: Worker) {
    return api.put("/workers/" + id, {
      firstName,
      lastName,
      middleName,
    });
  }

  @Catch()
  async deleteWorker(id: number) {
    return api.delete("/workers/" + id);
  }
}

class ItemsApi {
  @Catch()
  async createItem(workerId: number, { name, price }: WorkerItem) {
    return api.post(`/workers/${workerId}/items/`, {
      name,
      price,
    });
  }

  @Catch()
  async updateItem(workerId: number, { id, name, price }: WorkerItem) {
    return api.put(`/workers/${workerId}/items/${id}`, {
      name,
      price,
    });
  }

  @Catch()
  async deleteItem(workerId: number, itemId: number) {
    return api.delete(`/workers/${workerId}/items/${itemId}`);
  }
}

export const workersApi = new WorkerApi();
export const itemsApi = new ItemsApi();
