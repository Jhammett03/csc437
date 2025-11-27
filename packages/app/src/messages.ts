import { Session } from "./model";

export type Msg =
  | ["sessions/request", {}]
  | ["session/request", { sessionId: string }]
  | [
      "session/save",
      { sessionId?: string; session: Session },
      {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["session/delete", { sessionId: string }]
  | Cmd;

type Cmd =
  | ["sessions/load", { sessions: Session[] }]
  | ["session/load", { session: Session }];
