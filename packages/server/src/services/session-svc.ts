import { Schema, model, Types } from "mongoose";
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

//note this is using get on the Mongo ID since there isnt a great gettable attribute for sessions
function get(id: string): Promise<SessionData> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findById(id)
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

function update(id: string, session: SessionData): Promise<SessionData> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findByIdAndUpdate(id, session, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `Session ${id} not updated`;
    else return updated as SessionData;
  });
}

function remove(id: string): Promise<void> {
  if (!Types.ObjectId.isValid(id)) {
    return Promise.reject("Invalid session ID");
  }
  return SessionModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `Session ${id} not deleted`;
  });
}

export default { index, get, create, update, remove };
