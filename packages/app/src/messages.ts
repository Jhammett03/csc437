import { Session } from "./model";

export type Msg =
  | ["sessions/request", {}]
  | ["session/request", { sessionId: string }]
  | ["session/add", { session: Session }]
  | ["session/delete", { sessionId: string }]
  | Cmd;

type Cmd =
  | ["sessions/load", { sessions: Session[] }]
  | ["session/load", { session: Session }];
