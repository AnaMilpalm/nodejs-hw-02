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

  gender: {
    type: String,
    required: false,
  },
  avgMark: {
    type: String,
    default: false,
  },
});

export const ContactsCollection = model('contacts', contactsSchema);
