"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var session_svc_exports = {};
__export(session_svc_exports, {
  default: () => session_svc_default
});
module.exports = __toCommonJS(session_svc_exports);
var import_mongoose = require("mongoose");
const SessionSchema = new import_mongoose.Schema(
  {
    "img-src": String,
    "img-alt": String,
    "book-href": String,
    "book-name": String,
    duration: String,
    pages: String,
    notes: String,
    date: String
  },
  { collection: "SessionStats" }
);
const SessionModel = (0, import_mongoose.model)("Session", SessionSchema);
function index() {
  return SessionModel.find();
}
function get(id) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findById(id).then((session) => {
    if (!session) {
      throw `Session ${id} not found`;
    }
    return session;
  }).catch((err) => {
    throw err;
  });
}
function create(json) {
  const s = new SessionModel(json);
  return s.save();
}
function update(id, session) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findByIdAndUpdate(id, session, {
    new: true
  }).then((updated) => {
    if (!updated) throw `Session ${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `Session ${id} not deleted`;
  });
}
var session_svc_default = { index, get, create, update, remove };
