import { Controller, Inject, Get, Param, ParseIntPipe } from "@nestjs/common";
import { WorkersService } from "../services/workers.service";
import { firstLetter } from "src/utils";

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

  @Get("/page/:number")
  public async getPage(@Param("number", ParseIntPipe) pageNumber: number) {
    const pagesRaw = await this.service.getPage(pageNumber);
    return pagesRaw.map(stats => {
      const { firstName, lastName, middleName } = stats;
      const fullName = `${lastName} ${firstLetter(firstName)}.${firstLetter(
        middleName
      )}.`;

      return {
        fullName,
        itemsCount: stats.itemsCount,
        priceSum: stats.priceSum,
      };
    });
  }
}
