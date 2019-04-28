import bodyParser from 'body-parser';
import compressionMiddleware from 'compression';
import cors from 'cors';
import helmet from 'helmet';

export default function (app) {
  app.use(helmet());
  app.use(compressionMiddleware());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: ['json', '+json'] }));

  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache');
    next();
  });

  return app;
}
