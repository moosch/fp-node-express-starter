import Express from 'express';

import expressConfig from './component/express/express';
import router from './router';

const port = process.env.PORT || 5000;
let app;

export default {
  // Good practice to be able to retrieve our app.
  getServer: () => app,
  start: () => {
    const express = Express();

    app = expressConfig(express);
    app.use(router);

    app.listen(port, () => {
      console.log(`Express server is running at http://localhost:${port}`);
    });

  },
  shutDown: () => {
    if (app) {
      console.log('Express server shutting down');
      app.close(() => {
        console.log('Express server shut down: all inflight requests complete');
      });
    }
  },
};
