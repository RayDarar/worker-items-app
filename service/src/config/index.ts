import joi from "@hapi/joi";

export enum ConfigsRaw {
  PORT = "PORT",
  DB_HOST = "DB_HOST",
  DB_PORT = "DB_PORT",
  DB_USERNAME = "DB_USERNAME",
  DB_PASSWORD = "DB_PASSWORD",
  DB_DATABASE = "DB_DATABASE",
}

export const configPattern = () => ({
  port: process.env[ConfigsRaw.PORT],
  db: {
    host: process.env[ConfigsRaw.DB_HOST],
    port: process.env[ConfigsRaw.DB_PORT],
    username: process.env[ConfigsRaw.DB_USERNAME],
    password: process.env[ConfigsRaw.DB_PASSWORD],
    database: process.env[ConfigsRaw.DB_DATABASE],
  },
});

export const configValidation = joi.object({
  [ConfigsRaw.PORT]: joi.number().default(3000),
  [ConfigsRaw.DB_HOST]: joi.string().default("localhost"),
  [ConfigsRaw.DB_PORT]: joi.number().default(5432),
  [ConfigsRaw.DB_USERNAME]: joi.string().required(),
  [ConfigsRaw.DB_PASSWORD]: joi.string().required(),
  [ConfigsRaw.DB_DATABASE]: joi.string().required(),
});
