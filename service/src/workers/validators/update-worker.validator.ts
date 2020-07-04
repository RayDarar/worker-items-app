import joi from "@hapi/joi";
import { nameValidator } from "src/validators/name.validator";

export const updateWorkerValidator = joi
  .object({
    firstName: nameValidator.optional(),
    lastName: nameValidator.optional(),
    middleName: nameValidator.optional().allow(null),
  })
  .min(1);
