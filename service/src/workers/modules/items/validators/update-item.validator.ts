import joi from "@hapi/joi";
import { nameValidator } from "src/validators/name.validator";
import { priceValidator } from "./price.validator";

export const updateItemValidator = joi
  .object({
    name: nameValidator.optional(),
    price: priceValidator.optional(),
  })
  .min(1);
