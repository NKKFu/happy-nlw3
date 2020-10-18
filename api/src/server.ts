import express from 'express';
import './database/connection';
import 'express-async-errors';

import errorHandler from './errors/handler'
import path from 'path';
import routes from './routes';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333);