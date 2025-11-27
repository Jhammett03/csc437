import { Schema, model, Types } from "mongoose";
import { SessionData } from "../models/session-data";

const SessionSchema = new Schema<SessionData>(
  {
    username: { type: String, required: true },
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

function index(username?: string): Promise<SessionData[]> {
  if (username) {
    return SessionModel.find({ username });
  }
  return SessionModel.find();
}

//note this is using get on the Mongo ID since there isnt a great gettable attribute for sessions
function get(id: string, username?: string): Promise<SessionData> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  const query: any = { _id: id };
  if (username) {
    query.username = username;
  }
  return SessionModel.findOne(query)
    .then((session) => {
      if (!session) {
        throw `Session ${id} not found`;
      }
      return session;
    })
    .catch((err) => {
      throw err;
    });
}

function create(json: SessionData): Promise<SessionData> {
  const s = new SessionModel(json);
  return s.save();
}

function update(id: string, session: SessionData, username?: string): Promise<SessionData> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  const query: any = { _id: id };
  if (username) {
    query.username = username;
  }
  return SessionModel.findOneAndUpdate(query, session, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `Session ${id} not updated`;
    else return updated as SessionData;
  });
}

function remove(id: string, username?: string): Promise<void> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  const query: any = { _id: id };
  if (username) {
    query.username = username;
  }
  return SessionModel.findOneAndDelete(query).then((deleted) => {
    if (!deleted) throw `Session ${id} not deleted`;
  });
}

export default { index, get, create, update, remove };
