import { Request, Response, Router } from "express";
import { User } from "../bl";

const app: Router = Router();

app.get("/userByEmail:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  const service = new User();
  res.json(
    await service.findByEmail(email).catch(e => {
      res.status(500).json(e);
    })
  );
});

app.get("/userByDNumber/:dNumber", async (req: Request, res: Response) => {
  const dNumber = req.params.dNumber;
  const service = new User();
  res.json(
    await service.findByDNummer(dNumber).catch(e => {
      res.status(500).json(e);
    })
  );
});

export const UserRoute: Router = app;
