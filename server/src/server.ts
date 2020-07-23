import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

// Configure CORS
app.use(cors());

// Accept JSON as body data
app.use(express.json());

// Configure API routes
app.use(routes);

// Serve images as static content
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/assets/items', express.static(path.resolve(__dirname, '..', 'assets/items')));

// Configure validation errors
app.use(errors());

// Set port
app.listen(3333);
