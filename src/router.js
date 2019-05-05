import express from 'express';
import Task from 'data.task';

import userRouter from './rest/user/user.router';

const createRouter = () => new Task((rej, res) => res(express.Router()));

const attachRouters = (routes) =>  (router) => {
  Object.keys(routes).forEach((route) => {
    console.log(route)
    router.use(route, routes[route]);
  });
  return router;
}
const addRouting = app => router => {
  app.use(router);
  return app;
};

const router = app => createRouter()
  .map(attachRouters({ '/users': userRouter }))
  .map(addRouting(app))

export default router;

