import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Item } from "src/entities/item.entity";
import { CreateItemDto } from "../dto/create-item.dto";

@Injectable()
export class ItemsService {
  @InjectRepository(Item)
  private readonly items: Repository<Item>;

  public async saveItem(itemInfo: CreateItemDto): Promise<Item> {
    const item = this.items.create(itemInfo);
    return this.items.save(item);
  }
}
