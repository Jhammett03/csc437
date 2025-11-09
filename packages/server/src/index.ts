import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Sessions from "./services/session-svc";

connect("BookStats");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/sessions", (req: Request, res: Response) => {
  Sessions.index()
    .then((data) => {
      res.set("Content-Type", "application/json").send(JSON.stringify(data));
    })
    .catch((err) => {
      console.error("Error fetching sessions:", err);
      res
        .status(500)
        .send(JSON.stringify({ error: "Failed to fetch sessions" }));
    });
});

app.get("/sessions/:userid", (req: Request, res: Response) => {
  const userid = req.params.userid;
  Sessions.get(userid)
    .then((data) => {
      if (data)
        res.set("Content-Type", "application/json").send(JSON.stringify(data));
      else res.status(404).send();
    })
    .catch((err) => {
      console.error("Error fetching session:", err);
      res.status(404).send(JSON.stringify({ error: `${userid} not found` }));
    });
});
