import { Schema, model } from 'mongoose';

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  avgMark: {
    type: String,
    default: false,
  },
  onDuty: {
    type: Boolean,
    required: true,
  },
});

export const ContactsCollection = model('contacts', contactsSchema);
