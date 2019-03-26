import express, { Application } from "express";
import compression from "compression";
import { Server } from "http";
import { bindRoutes, initGraphQl, initCors } from "./middleware";

const PORT: string = process.env.PORT || "8081";

const app: Application = express();

// compression
app.use(compression());
initCors(app);
initGraphQl(app);

// routes
bindRoutes(app);

export const server: Server = app.listen(PORT);

export default app;
