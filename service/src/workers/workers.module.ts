import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Worker } from "src/entities/worker.entity";
import { WorkerStats } from "src/entities/workers-stats.entity";

import { WorkersController } from "./controllers/workers.controller";
import { WorkersService } from "./services/workers.service";
import { ItemsModule } from "./modules/items/items.module";

@Module({
  imports: [TypeOrmModule.forFeature([Worker, WorkerStats]), ItemsModule],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}
