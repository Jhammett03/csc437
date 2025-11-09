import express, { Request, Response } from "express";
import { SessionData } from "../models/session-data";
import Sessions from "../services/session-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Sessions.index()
    .then((list: SessionData[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  Sessions.get(id)
    .then((session: SessionData) => res.json(session))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newSession = req.body;

  Sessions.create(newSession)
    .then((session: SessionData) => res.status(201).json(session))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newSession = req.body;

  Sessions.update(id, newSession)
    .then((session: SessionData) => res.json(session))
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Sessions.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
