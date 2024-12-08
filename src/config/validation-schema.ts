import * as Joi from 'joi';

export enum NODE_ENV_TYPE {
  development = 'development',
  production = 'production',
}

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
});
