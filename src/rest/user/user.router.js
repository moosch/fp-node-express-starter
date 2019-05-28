import express from 'express';

import middlewareWrapper from '../../component/express/middlewareWrapper';
import errors from '../../service/user/user.errors';
import controller from './user.controller';

const router = express.Router();

const wrap = middlewareWrapper([
  [errors.InvalidRequestError, 400, 'INVALID_REQUEST'],
  [errors.UserNotFoundError, 404, 'USER_NOT_FOUND'],
]);

router.get('/', wrap(controller.findAll));

export default router;
