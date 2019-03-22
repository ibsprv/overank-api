import express, { Application } from 'express';
import compression from 'compression';
import { Server } from 'http';
import * as routes from './routes';
import { initGraphQl } from './app-graphql';
import { initCors } from './app-security';

const PORT: string = process.env.PORT || '8081';

const app: Application = express();

// compression
app.use(compression());
initCors(app);
initGraphQl(app);

// routes
app.use('/1/api', routes.Api);

export const server: Server = app.listen(PORT);

export default app;
