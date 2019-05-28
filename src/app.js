import express from 'express';
import Task from 'data.task';

import expressConfig from './component/express/express';
import router from './router';

// startExpress :: Task<App, String>
const startExpress = new Task((rej, res) => {
    const app = express();
    app ? res(app) : rej('No App');
  });

// Need to add reject as both reject and resolve is being handled up by .fork
// listen :: Int -> App -> Task
const listen = (port) => (app) => new Task((reject, resolve) => {
  app.listen(port);
  resolve(app);
});

// start :: Int -> Task
const start = (port) =>
  startExpress
    .map(expressConfig)
    .chain(router) 
    .chain(listen(port));

start(5000)
  .fork(
    err => console.log('Error starting Express server', err),
    () => console.log(`Express server is running at http://localhost:5000`),
  );
