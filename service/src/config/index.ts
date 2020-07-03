import joi from "@hapi/joi";

export const configPattern = () => ({
  port: process.env.PORT,
});

export const configValidation = joi.object({
  port: joi.number().default(3000),
});
