import joi from "@hapi/joi";

import { nameValidator } from "src/validators/name.validator";

export const createItemValidator = joi.object({
  name: nameValidator,
  price: joi
    .number()
    .min(1)
    .required(),
});
