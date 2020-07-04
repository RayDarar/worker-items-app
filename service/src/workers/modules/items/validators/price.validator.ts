import joi from "@hapi/joi";

export const priceValidator = joi
  .number()
  .min(1)
  .required();
