import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
const router = express.Router();
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookValidation),
  BookController.createBook
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookValidation),
  BookController.updateBook
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteSingleBook
);
router.get('/:id', BookController.getSingleBook);
router.get('/:categoryId/category', BookController.getBooksByCategory);
router.get('/', BookController.getAllBooks);
export const BookRoutes = router;
