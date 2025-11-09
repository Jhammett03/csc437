import { Types } from "mongoose";

export interface SessionData {
  _id?: Types.ObjectId;
  "img-src": string;
  "img-alt": string;
  "book-href": string;
  "book-name": string;
  duration: string;
  pages: string;
  notes?: string;
  date?: string;
}
