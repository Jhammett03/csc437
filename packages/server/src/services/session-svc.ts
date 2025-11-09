import { Schema, model } from "mongoose";
import { SessionData } from "../models/session-data";

const SessionSchema = new Schema<SessionData>(
  {
    "img-src": String,
    "img-alt": String,
    "book-href": String,
    "book-name": String,
    duration: String,
    pages: String,
    notes: String,
    date: String,
  },
  { collection: "SessionStats" }
);

const SessionModel = model<SessionData>("Session", SessionSchema);

function index(): Promise<SessionData[]> {
  return SessionModel.find();
}

function get(userid: String): Promise<SessionData> {
  return SessionModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} not found`;
    });
}

export default { index, get };
