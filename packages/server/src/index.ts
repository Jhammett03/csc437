import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Sessions from "./routes/sessions";

connect("BookStats");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/api/sessions", Sessions);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
