import { validationSchema } from './validation-schema';

export default {
  isGlobal: true,
  validationSchema: validationSchema,
  validationOptions: {
    abortEarly: true,
  },
};
