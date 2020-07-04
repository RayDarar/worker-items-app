import { NotFoundException } from "@nestjs/common";

export class WorkerNotFoundException extends NotFoundException {
  constructor() {
    super("Worker Not Found");
  }
}
