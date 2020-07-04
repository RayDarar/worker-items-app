import joi from "@hapi/joi";

import { nameValidator } from "src/validators/name.validator";

import { itemCreateValidator } from "../modules/items/validators/item-create.validator";

export const createWorkerValidator = joi.object({
  firstName: nameValidator,
  lastName: nameValidator,
  middleName: nameValidator.optional(),
  items: joi.array().items(itemCreateValidator),
});
