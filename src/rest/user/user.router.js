/**
 * Our routers are used to define which access routes are available
 * and define how the requests are handled.
 * I find it's a great idea to validate the request as a middleware in Express
 * using src/celebrate/error.middleware
 * 
 * This is also where you could do some security checks,
 * creating a security context, adding request Id's, or preventing progress if required..
 */

import express from 'express';
import Future from 'fluture';

import middlewareWrapper from '../../component/express/middlewareWrapper';
import controller from './user.controller';

const router = express.Router();

router.get('/', middlewareWrapper(controller.findAll));

export default router;
