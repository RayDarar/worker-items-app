import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { firstLetter } from "src/utils";
import { IdValidationPipe } from "src/pipes/id-validation.pipe";

import { WorkersService } from "../services/workers.service";
import { CreateWorkerDto } from "../dto/create-worker.dto";
import { CreateWorkerValidationPipe } from "../pipes/create-worker-validation.pipe";
import { UpdateWorkerDto } from "../dto/update-worker.dto";
import { UpdateWorkerValidationPipe } from "../pipes/update-worker-validation.pipe";
import { WorkerNotFoundException } from "../utils/worker-not-found.exception";

@Controller("/workers")
export class WorkersController {
  @Inject(WorkersService)
  private readonly service: WorkersService;

  @Get("/count")
  public async getCount() {
    return {
      result: await this.service.getCount(),
    };
  }

  @Get("/page/:number")
  public async getPage(@Param("number", IdValidationPipe) pageNumber: number) {
    const pagesRaw = await this.service.getPage(pageNumber);
    return pagesRaw.map(stats => {
      const { firstName, lastName, middleName, id } = stats;
      let fullName = `${lastName} ${firstLetter(firstName)}.`;

      if (middleName) {
        fullName += `${firstLetter(middleName)}.`;
      }

      return {
        id,
        fullName,
        itemsCount: parseInt(stats.itemsCount + ""),
        priceSum: parseInt(stats.priceSum + ""),
      };
    });
  }

  @Get("/:worker_id")
  public async getWorker(
    @Param("worker_id", IdValidationPipe) workerId: number
  ) {
    const worker = await this.service.getWorkerById(workerId);
    if (worker) return worker;

    throw new WorkerNotFoundException();
  }

  @Post("/")
  public async createWorker(
    @Body(CreateWorkerValidationPipe) workerInfo: CreateWorkerDto
  ) {
    const id = await this.service.createWorker(workerInfo);
    return { id };
  }

  @HttpCode(202)
  @Put("/:worker_id")
  public async updateWorker(
    @Param("worker_id", IdValidationPipe) workerId: number,
    @Body(UpdateWorkerValidationPipe) workerInfo: UpdateWorkerDto
  ) {
    const result = await this.service.updateWorker(workerId, workerInfo);
    if (!result) throw new WorkerNotFoundException();
  }

  @HttpCode(202)
  @Delete("/:worker_id")
  public async deleteWorker(
    @Param("worker_id", IdValidationPipe) workerId: number
  ) {
    const result = await this.service.deleteWorker(workerId);
    if (!result) throw new WorkerNotFoundException();
  }
}
