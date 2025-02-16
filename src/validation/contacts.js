import Joi from 'joi';

import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/) // Формат +380000000000
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be in the format +380000000000',
    }),
  email: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  paternId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Patern id should bea valid mongo id');
    }
    return true;
  }),
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
  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/) // Формат +380000000000
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be in the format +380000000000',
    }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
