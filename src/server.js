import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';

import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3001'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
};
const app = express();

app.use(express.json());
// app.use('/contacts', contactsRouter);
app.use(router);

app.use(cors());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('*', notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
