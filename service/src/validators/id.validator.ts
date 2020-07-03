import joi from "@hapi/joi";

export const idValidator = joi
  .number()
  .integer()
  .min(1)
  .required();
