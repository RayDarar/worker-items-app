import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { CreateWorkerDto } from "../dto/create-worker.dto";
import { workerCreateValidator } from "../validators/worker-create.validator";

// Jesus, there is a better name for that, but I'm in hurry
@Injectable()
export class WorkerCreateValidationPipe implements PipeTransform {
  transform(workerInfo: CreateWorkerDto) {
    const { error } = workerCreateValidator.validate(workerInfo);
    if (error) {
      throw new BadRequestException(error);
    }
    
    return workerInfo;
  }
}
