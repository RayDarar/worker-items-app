import { Controller, Inject, Get, Param, ParseIntPipe } from "@nestjs/common";
import { WorkersService } from "../services/workers.service";

@Controller("/workers")
export class WorkersController {
  @Inject(WorkersService)
  private readonly service: WorkersService;

  @Get("/count")
  public async getCount() {
    return {
      result: await this.service.getCount(),
    };
  }

  @Get("/page/:page-number")
  public async getPage(@Param("page-number", ParseIntPipe) pageNumber: number) {
    return this.service.getPage(pageNumber);
  }
}
