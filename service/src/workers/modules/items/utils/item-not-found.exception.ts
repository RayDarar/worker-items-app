import { NotFoundException } from "@nestjs/common";

export class ItemNotFoundException extends NotFoundException {
  constructor() {
    super("Item Not Found");
  }
}