import express from 'express';

// Import more routers here
import userRouter from './rest/user/user.router';

const router = express.Router();

const routers = {
  '/users': userRouter,
};

// Router.use doesn't return anything and mutates it's prototype object so we can't be pure.
Object.keys(routers).forEach((route) => {
  router.use(route, routers[route]);
});


export default router;
