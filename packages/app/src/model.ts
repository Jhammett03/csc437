import { SessionData } from "server/models";

export type Session = SessionData;

export interface Stats {
  total: number;
  totalDuration: number;
  totalPages: number;
  avgDuration: number;
  avgPages: number;
  totalBooks: number;
  hoursRead: number;
  currentBook: string;
}

export interface Model {
  sessions: Session[];
  currentSession?: Session;
  stats: Stats;
}

export const init: Model = {
  sessions: [],
  currentSession: undefined,
  stats: {
    total: 0,
    totalDuration: 0,
    totalPages: 0,
    avgDuration: 0,
    avgPages: 0,
    totalBooks: 0,
    hoursRead: 0,
    currentBook: "-",
  },
};
