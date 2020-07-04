import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

import { UpdateWorkerDto } from "../dto/update-worker.dto";
import { updateWorkerValidator } from "../validators/update-worker.validator";

@Injectable()
export class UpdateWorkerValidationPipe implements PipeTransform {
  transform(workerInfo: UpdateWorkerDto) {
    const { error } = updateWorkerValidator.validate(workerInfo);
    if (error) {
      throw new BadRequestException(error);
    }

    return workerInfo;
  }
}
