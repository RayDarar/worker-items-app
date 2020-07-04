import { Controller, Param, Inject, Post, Body } from "@nestjs/common";

import { IdValidationPipe } from "src/pipes/id-validation.pipe";
import { WorkerNotFoundException } from "src/workers/utils/worker-not-found.exception";

import { ItemsService } from "../services/items.service";
import { CreateItemDto } from "../dto/create-item.dto";
import { CreateItemValidationPipe } from "../pipe/create-item-validation.pipe";

@Controller("/workers/:worker_id/items")
export class ItemsController {
  @Inject(ItemsService)
  private readonly service: ItemsService;

  @Post("/")
  public async test(
    @Param("worker_id", IdValidationPipe) workerId: number,
    @Body(CreateItemValidationPipe) itemInfo: CreateItemDto
  ) {
    const result = await this.service.createItem(workerId, itemInfo);
    if (!result) throw new WorkerNotFoundException();
  }
}
