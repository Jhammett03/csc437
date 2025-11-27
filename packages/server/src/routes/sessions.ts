import express, { Request, Response } from "express";
import { SessionData } from "../models/session-data";
import Sessions from "../services/session-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const username = (req as any).username;
  Sessions.index(username)
    .then((list: SessionData[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const username = (req as any).username;
  Sessions.get(id, username)
    .then((session: SessionData) => res.json(session))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const username = (req as any).username;
  const newSession = { ...req.body, username };

  Sessions.create(newSession)
    .then((session: SessionData) => res.status(201).json(session))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const username = (req as any).username;
  const newSession = { ...req.body, username };

  Sessions.update(id, newSession, username)
    .then((session: SessionData) => res.json(session))
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const username = (req as any).username;

  Sessions.remove(id, username)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
