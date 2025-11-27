"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_promises = __toESM(require("node:fs/promises"));
var import_mongo = require("./services/mongo");
var import_sessions = __toESM(require("./routes/sessions"));
var import_auth = __toESM(require("./routes/auth"));
(0, import_mongo.connect)("test");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/sessions", import_auth.authenticateUser, import_sessions.default);
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.use(import_express.default.static(staticDir));
async function serveSPA(staticPath, res) {
  const indexHtml = import_path.default.resolve(staticPath, "index.html");
  try {
    const html = await import_promises.default.readFile(indexHtml, { encoding: "utf8" });
    res.send(html);
  } catch (error) {
    console.error(`Error reading index.html from ${indexHtml}:`, error);
    res.status(500).send(`
      Build Error
    `);
  }
}
app.use(["/app", "/login"], async (req, res) => {
  const staticPath = import_path.default.isAbsolute(staticDir) ? staticDir : import_path.default.resolve(process.cwd(), staticDir);
  await serveSPA(staticPath, res);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
