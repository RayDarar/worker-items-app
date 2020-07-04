import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Item } from "src/entities/item.entity";
import { CreateItemDto } from "../dto/create-item.dto";
import { Worker } from "src/entities/worker.entity";

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
}
