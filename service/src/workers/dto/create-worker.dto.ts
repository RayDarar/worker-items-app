import { CreateItemDto } from "../modules/items/dto/create-item.dto";

export interface CreateWorkerDto {
  firstName: string;
  lastName: string;
  middleName: string;
  items: CreateItemDto[];
}
