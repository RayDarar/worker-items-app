import {
  Controller,
  Inject,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from "@nestjs/common";
import { firstLetter } from "src/utils";
import { IdValidationPipe } from "src/pipes/id-validation.pipe";

import { WorkersService } from "../services/workers.service";
import { ItemsService } from "../modules/items/services/items.service";
import { CreateWorkerDto } from "../dto/create-worker.dto";
import { WorkerCreateValidationPipe } from "../pipes/worker-create-validation.pipe";

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
      const { firstName, lastName, middleName } = stats;
      const fullName = `${lastName} ${firstLetter(firstName)}.${firstLetter(
        middleName
      )}.`;

      return {
        fullName,
        itemsCount: stats.itemsCount,
        priceSum: stats.priceSum,
      };
    });
  }

  @Get("/:worker_id")
  public async getWorker(
    @Param("worker_id", IdValidationPipe) workerId: number
  ) {
    const worker = await this.service.getWorkerById(workerId);
    if (worker) return worker;

    throw new NotFoundException("Worker not found");
  }

  @Post("/")
  public async createWorker(
    @Body(WorkerCreateValidationPipe) workerInfo: CreateWorkerDto
  ) {
    await this.service.createWorker(workerInfo);
  }
}
