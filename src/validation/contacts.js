import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.number().integer().min(6).max(16).required(),
  email: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
const userData = {
  name: 'John Doe',
  phoneNumber: 123456789,
  email: 'john@example.com',
  isFavourite: true,
  contactType: 'work',
};
const validationResult = createContactSchema.validate(userData, {
  abortEarly: false,
});

if (validationResult.error) {
  console.log('Validation errors:', validationResult.error.details);
} else {
  console.log('Validation successful:', validationResult.value);
}

export const updateContactShema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number().integer().min(6).max(16),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
