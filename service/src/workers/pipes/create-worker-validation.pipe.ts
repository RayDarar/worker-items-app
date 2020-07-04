import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { CreateWorkerDto } from "../dto/create-worker.dto";
import { createWorkerValidator } from "../validators/create-worker.validator";

// Jesus, there is a better name for that, but I'm in hurry
@Injectable()
export class CreateWorkerValidationPipe implements PipeTransform {
  transform(workerInfo: CreateWorkerDto) {
    const { error } = createWorkerValidator.validate(workerInfo);
    if (error) {
      throw new BadRequestException(error);
    }
    
    return workerInfo;
  }
}
