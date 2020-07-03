import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Worker } from "src/entities/worker.entity";
import { WorkerStats } from "src/entities/workers-stats.entity";

@Injectable()
export class WorkersService {
  @InjectRepository(Worker)
  private readonly workers: Repository<Worker>;

  @InjectRepository(WorkerStats)
  private readonly workersStats: Repository<WorkerStats>;

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
}
