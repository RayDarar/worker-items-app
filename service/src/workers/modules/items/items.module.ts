import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Item } from "src/entities/item.entity";

import { ItemsService } from "./services/items.service";
import { ItemsController } from "./controllers/items.controller";
import { Worker } from "src/entities/worker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Item, Worker])],
  providers: [ItemsService],
  exports: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
