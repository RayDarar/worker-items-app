import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Item } from "src/entities/item.entity";

import { ItemsService } from "./services/items.service";

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsService],
})
export class ItemsModule {}
