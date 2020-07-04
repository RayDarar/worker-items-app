import joi from "@hapi/joi";

import { nameValidator } from "src/validators/name.validator";
import { priceValidator } from "./price.validator";

export const createItemValidator = joi.object({
  name: nameValidator,
  price: priceValidator,
});
