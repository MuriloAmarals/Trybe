import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import Router from './routes';

const app = express();

app.use(express.json());
app.use(Router);
app.use(errorHandler);

export default app;
