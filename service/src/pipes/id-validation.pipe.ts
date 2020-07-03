import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { idValidator } from "src/validators/id.validator";

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(id: string) {
    const { error } = idValidator.validate(id);
    if (error) {
      throw new BadRequestException(error);
    }

    return parseInt(id);
  }
}
