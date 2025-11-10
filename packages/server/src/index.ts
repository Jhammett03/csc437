import express, { Request, Response } from "express";
import path from "path";
import { connect } from "./services/mongo";
import Sessions from "./routes/sessions";
import auth, { authenticateUser } from "./routes/auth";

connect("BookStats");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.resolve(staticDir, "login.html"));
});

app.use("/api/sessions", authenticateUser, Sessions);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
