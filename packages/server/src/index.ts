import express, { Request, Response } from "express";
import path from "path";
import fs from "node:fs/promises";
import { connect } from "./services/mongo";
import Sessions from "./routes/sessions";
import auth, { authenticateUser } from "./routes/auth";

connect("test");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.json());

// API routes must come before static file serving
app.use("/auth", auth);
app.use("/api/sessions", authenticateUser, Sessions);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use(express.static(staticDir));

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
