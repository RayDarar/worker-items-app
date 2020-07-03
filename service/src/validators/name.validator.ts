import joi from "@hapi/joi";

export const nameValidator = joi.string().required();
