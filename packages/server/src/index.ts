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

async function serveSPA(staticPath: string, res: Response) {
  const indexHtml = path.resolve(staticPath, "index.html");
  try {
    const html = await fs.readFile(indexHtml, { encoding: "utf8" });
    res.send(html);
  } catch (error) {
    console.error(`Error reading index.html from ${indexHtml}:`, error);
    res.status(500).send(`
      Build errpr
    `);
  }
}

app.use(["/app", "/login"], async (req: Request, res: Response) => {
  const staticPath = path.isAbsolute(staticDir) 
    ? staticDir 
    : path.resolve(process.cwd(), staticDir);
  await serveSPA(staticPath, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
