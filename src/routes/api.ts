import { Request, Response, Router } from "express";
import { API } from "../config";

const app: Router = Router();

/**
 * API Generic Api
 * http method
 * Get
 * return http status code 400
 * @return <number> status = 400
 */
app.get("/", (req: Request, res: Response) => {
  res.status(400);
  res.end();
});

/**
 * API Generic Api
 * http method
 * Get info
 * sends back current instance and api version
 * @return <object> with properties for instance and version
 */
app.get("/info", (req: Request, res: Response) => {
  res.json(API);
});

export const ApiRoute: Router = app;
