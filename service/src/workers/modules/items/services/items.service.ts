import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Item } from "src/entities/item.entity";

@Injectable()
export class ItemsService {
  @InjectRepository(Item)
  private readonly items: Repository<Item>;

  public async getWorkerItems(workerId: number): Promise<Item[]> {
    return this.items.find({
      where: {
        worker: workerId,
      },
    });
  }
}
