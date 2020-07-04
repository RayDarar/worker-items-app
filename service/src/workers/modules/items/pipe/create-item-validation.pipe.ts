import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { CreateItemDto } from "../dto/create-item.dto";
import { createItemValidator } from "../validators/create-item.validator";

@Injectable()
export class CreateItemValidationPipe implements PipeTransform {
  transform(itemInfo: CreateItemDto) {
    const { error } = createItemValidator.validate(itemInfo);
    if (error) {
      throw new BadRequestException(error);
    }

    return itemInfo;
  }
}
