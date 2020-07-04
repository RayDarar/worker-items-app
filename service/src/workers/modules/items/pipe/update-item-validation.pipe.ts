import { PipeTransform, BadRequestException } from "@nestjs/common";
import { UpdateItemDto } from "../dto/update-item.dto";
import { updateItemValidator } from "../validators/update-item.validator";

export class UpdateItemValidationPipe implements PipeTransform {
  transform(updateInfo: UpdateItemDto) {
    const { error } = updateItemValidator.validate(updateInfo);
    if (error) {
      throw new BadRequestException(error);
    }

    return updateInfo;
  }
}
