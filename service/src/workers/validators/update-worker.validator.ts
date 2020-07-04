import joi from "@hapi/joi";
import { idValidator } from "src/validators/id.validator";
import { nameValidator } from "src/validators/name.validator";

export const updateWorkerValidator = joi.object({
  id: idValidator,
  firstName: nameValidator.optional(),
  lastName: nameValidator.optional(),
  middleName: nameValidator.optional(),
});
