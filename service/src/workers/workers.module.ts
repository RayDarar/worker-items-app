import { Module } from "@nestjs/common";

import { WorkersController } from "./controllers/workers.controller";
import { WorkersService } from "./services/workers.service";

@Module({
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}
