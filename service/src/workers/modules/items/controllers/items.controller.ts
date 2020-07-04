import {
  Controller,
  Param,
  Inject,
  Post,
  Body,
  Put,
  HttpCode,
} from "@nestjs/common";

import { IdValidationPipe } from "src/pipes/id-validation.pipe";
import { WorkerNotFoundException } from "src/workers/utils/worker-not-found.exception";

import { ItemsService } from "../services/items.service";
import { CreateItemDto } from "../dto/create-item.dto";
import { CreateItemValidationPipe } from "../pipe/create-item-validation.pipe";
import { UpdateItemDto } from "../dto/update-item.dto";
import { UpdateItemValidationPipe } from "../pipe/update-item-validation.pipe";
import { ItemNotFoundException } from "../utils/item-not-found.exception";

@Controller("/workers/:worker_id/items")
export class ItemsController {
  @Inject(ItemsService)
  private readonly service: ItemsService;

  @Post("/")
  public async createItem(
    @Param("worker_id", IdValidationPipe) workerId: number,
    @Body(CreateItemValidationPipe) itemInfo: CreateItemDto
  ) {
    const result = await this.service.createItem(workerId, itemInfo);
    if (!result) throw new WorkerNotFoundException();
  }

  @HttpCode(202)
  @Put("/:item_id")
  public async updateItem(
    @Param("worker_id", IdValidationPipe) workerId: number,
    @Param("item_id", IdValidationPipe) itemId: number,
    @Body(UpdateItemValidationPipe) itemInfo: UpdateItemDto
  ) {
    const result = await this.service.updateItem(workerId, itemId, itemInfo);
    if (result == "WorkerNotFound") throw new WorkerNotFoundException();
    if (result == "ItemNotFound") throw new ItemNotFoundException();
  }
}
