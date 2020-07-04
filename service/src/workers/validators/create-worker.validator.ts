import joi from "@hapi/joi";

import { nameValidator } from "src/validators/name.validator";

import { createItemValidator } from "../modules/items/validators/create-item.validator";

export const createWorkerValidator = joi.object({
  firstName: nameValidator,
  lastName: nameValidator,
  middleName: nameValidator.optional(),
  items: joi.array().items(createItemValidator),
});
