import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactShema } from '../validation/contacts.js';

import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactConttroller,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValid.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', ctrlWrapper(upsertContactController));
router.patch('/:contactId', ctrlWrapper(patchContactConttroller));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactShema),
  ctrlWrapper(patchContactConttroller),
);

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
export default router;
