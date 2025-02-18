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
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.HOME, ROLES.PERSONAL),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.delete(
  '/:contactId',

  isValidId,
  ctrlWrapper(deleteContactController),
);

router.post(
  '/',

  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',

  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',

  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(patchContactConttroller),
);

router.get('/', ctrlWrapper(getContactsController));

export default router;
