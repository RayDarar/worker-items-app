import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkersController } from "./controllers/workers.controller";
import { WorkersService } from "./services/workers.service";
import { Worker } from "src/entities/worker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}
