import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Worker } from "src/entities/worker.entity";
import { WorkerStats } from "src/entities/workers-stats.entity";

import { WorkersController } from "./controllers/workers.controller";
import { WorkersService } from "./services/workers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Worker, WorkerStats])],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}
