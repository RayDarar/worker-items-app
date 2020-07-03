import { Controller, Inject } from "@nestjs/common";
import { WorkersService } from "../services/workers.service";

@Controller("/workers")
export class WorkersController {
  @Inject(WorkersService)
  private readonly service: WorkersService;

  
}
