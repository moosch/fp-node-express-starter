import Express from 'express';
import Task from 'data.task';

import expressConfig from './component/express/express';
import router from './router';

const startExpress = () =>
  new Task((rej, res) => {
    const app = Express();
    app ? res(app) : rej('No App');
  });

// Need to add reject as both reject and resolve is being handled up by .fork
const listen = (port) => (app) => new Task((reject, resolve) => {
  app.listen(port);
  resolve(app);
});

const start = (port) =>
  startExpress()
    .map(expressConfig)
    .chain(router) 
    .chain(listen(port));

start(5000)
  .fork(
    err => console.log('Error starting Express server', err),
    () => console.log(`Express server is running at http://localhost:5000`),
  );
