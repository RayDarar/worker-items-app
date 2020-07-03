import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Worker } from "src/entities/worker.entity";
import { WorkerStats } from "src/entities/workers-stats.entity";
import { Item } from "src/entities/item.entity";

import { CreateWorkerDto } from "../dto/create-worker.dto";
import { ItemsService } from "../modules/items/services/items.service";

@Injectable()
export class WorkersService {
  @InjectRepository(Worker)
  private readonly workers: Repository<Worker>;

  @InjectRepository(WorkerStats)
  private readonly workersStats: Repository<WorkerStats>;

  @Inject(ItemsService)
  private readonly itemsService: ItemsService;

  // Could be shifted as config, but let's keep it simple for now
  private readonly WORKERS_AT_PAGE = 10;

  public async getCount(): Promise<number> {
    return this.workers.count();
  }

  public async getPage(n: number): Promise<WorkerStats[]> {
    return this.workersStats
      .createQueryBuilder("workers_stats")
      .skip((n - 1) * this.WORKERS_AT_PAGE)
      .take(this.WORKERS_AT_PAGE)
      .getMany();
  }

  public async getWorkerById(id: number): Promise<Worker | undefined> {
    return this.workers.findOne(
      {
        id,
      },
      {
        relations: ["items"],
      }
    );
  }

  public async createWorker({
    firstName,
    lastName,
    middleName,
    items,
  }: CreateWorkerDto): Promise<void> {
    const worker = this.workers.create({
      firstName,
      lastName,
      middleName,
    });

    const tasks: Promise<Item>[] = [];

    for (const item of items) {
      tasks.push(this.itemsService.saveItem(item));
    }

    const savedItems = await Promise.all(tasks);

    worker.items = savedItems;
    await this.workers.save(worker);
  }
}
