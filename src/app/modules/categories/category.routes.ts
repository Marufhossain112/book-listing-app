import express from 'express';
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryController.createCategory
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidation),
  CategoryController.updateCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingleCategory
);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getSingleCategory);
export const CategoryRoutes = router;
