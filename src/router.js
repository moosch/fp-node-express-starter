import express from 'express';
import Task from 'data.task';
import userRouter from './rest/user/user.router';

// createRouter :: Task Router
const createRouter = new Task((rej, res) =>
  res(express.Router()));

// connectRoute :: [Array] -> Router -> Router
const connectRoute = routes => router => {
  routes.forEach(route => {
    router.use(route[0], route[1]);
  });
  return router;
}

// addRouting :: App -> Router -> App
const addRouting = app => router => {
  app.use(router);
  return app;
};

// router :: App -> App
const router = app => createRouter
  .map(connectRoute([
    [ '/user', userRouter ],
  ]))
  .map(addRouting(app))

export default router;
