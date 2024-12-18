import * as Joi from 'joi';

export enum NODE_ENV_TYPE {
  development = 'development',
  production = 'production',
}

export const validationSchema = Joi.object({
  SECRET_JWT: Joi.string().default('development'),
  EXPIRES_IN_JWT: Joi.string().default('1d'),
  SALT_BCRYPT: Joi.number().default(12),
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
});
