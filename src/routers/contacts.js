import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactShema,
} from '../validation/contacts.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/', checkRoles(ROLES.HOME), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.HOME, ROLES.PERSONAL),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.delete(
  '/:contactId',
  checkRoles(ROLES.HOME),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.post(
  '/',
  checkRoles(ROLES.HOME),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  checkRoles(ROLES.HOME),
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.HOME, ROLES.PERSONAL),
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(patchContactConttroller),
);

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

export default router;
