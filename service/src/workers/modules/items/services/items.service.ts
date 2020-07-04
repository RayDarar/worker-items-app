import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Item } from "src/entities/item.entity";
import { Worker } from "src/entities/worker.entity";

import { CreateItemDto } from "../dto/create-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

@Injectable()
export class ItemsService {
  @InjectRepository(Item)
  private readonly items: Repository<Item>;

  @InjectRepository(Worker)
  private readonly workers: Repository<Worker>;

  public async saveItem(itemInfo: CreateItemDto): Promise<Item> {
    const item = this.items.create(itemInfo);
    return this.items.save(item);
  }

  public async createItem(
    workerId: number,
    itemInfo: CreateItemDto
  ): Promise<boolean> {
    const worker = await this.workers.findOne(workerId);
    if (worker) {
      const item = this.items.create(itemInfo);
      item.worker = worker;
      await this.items.save(item);
      return true;
    }

    return false;
  }

  public async updateItem(
    workerId: number,
    itemId: number,
    itemInfo: UpdateItemDto
  ): Promise<"ok" | "WorkerNotFound" | "ItemNotFound"> {
    const worker = await this.workers.findOne(workerId, {
      relations: ["items"]
    });
    if (!worker) return "WorkerNotFound";

    const item = worker.items.find(item => item.id === itemId);
    if (!item) return "ItemNotFound";

    await this.items.update({ id: itemId }, itemInfo);
    return "ok";
  }
}
