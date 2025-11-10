"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mongo_exports = {};
__export(mongo_exports, {
  connect: () => connect
});
module.exports = __toCommonJS(mongo_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function getMongoURI(dbname) {
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    return `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }
  return `mongodb://localhost:27017/${dbname}`;
}
function connect(dbname) {
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  console.log("MongoDB env check:", {
    hasUser: !!MONGO_USER,
    hasPwd: !!MONGO_PWD,
    hasCluster: !!MONGO_CLUSTER,
    cluster: MONGO_CLUSTER
  });
  const uri = getMongoURI(dbname);
  console.log(
    `Connecting to MongoDB... (${uri.includes("@") ? "Atlas" : uri.includes("localhost") ? "localhost" : "custom"})`
  );
  import_mongoose.default.connect(uri).catch((error) => {
    console.error("MongoDB connection error:", error.message);
    console.error(
      "Please ensure MongoDB is running or configure MONGO_USER, MONGO_PWD, and MONGO_CLUSTER environment variables"
    );
  });
  import_mongoose.default.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  import_mongoose.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect
});
