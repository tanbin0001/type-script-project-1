/* eslint-disable no-unused-vars */
import express, { Application, Request, Response,  } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use( globalErrorHandler)

//not found
app.use(notFound);

export default app;

