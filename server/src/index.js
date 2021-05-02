import './config/env.js';

import fs from 'fs';
import path from 'path';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import * as middleware from './middleware.js';

import { isDev } from './utils.js';

import { connect } from './config/database.js';

import apiRouter from './routes/api.js';
import applyApolloMiddleware from './graphql.js';

const { PORT = 8080, HOST = 'localhost', PUBLIC_PATH } = process.env;

const db = await connect(); // connect to mongodb

const app = express();

app.use(morgan(isDev ? 'dev' : 'common'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': [`*`],
        'script-src': [`'unsafe-inline'`, 'https://cdn.jsdelivr.net'],
      },
    },
  })
);
app.use(cors());
app.use(compression());
app.use(express.json());

app.use('/api', apiRouter);
applyApolloMiddleware(app);

if (PUBLIC_PATH?.length && fs.existsSync(PUBLIC_PATH)) {
  app.use(express.static(path.resolve(PUBLIC_PATH)));
}

app.use(middleware.notFound);
app.use(middleware.error);

const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});

// attempt graceful shutdown
process.on('SIGINT', () => server.close(() => console.log(`Server Closed`))); // ctrl + c
process.on('SIGTERM', () => server.close(() => console.log(`Server Closed`)));
