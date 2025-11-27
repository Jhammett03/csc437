import { Auth } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, Session } from "./model";

function calculateStats(sessions: Session[]) {
  if (sessions.length === 0) {
    return {
      total: 0,
      totalDuration: 0,
      totalPages: 0,
      avgDuration: 0,
      avgPages: 0,
      totalBooks: 0,
      hoursRead: 0,
      currentBook: "-",
    };
  }

  const totalDuration = sessions.reduce((sum, session) => {
    const duration = parseInt(session.duration) || 0;
    return sum + duration;
  }, 0);

  const totalPages = sessions.reduce((sum, session) => {
    const pages = parseInt(session.pages) || 0;
    return sum + pages;
  }, 0);

  const uniqueBooks = new Set(
    sessions.map((s: Session) => s["book-name"] || "Unknown")
  );

  const currentBook = sessions[0]?.["book-name"] || "-";

  return {
    total: sessions.length,
    totalDuration,
    totalPages,
    avgDuration: Math.round(totalDuration / sessions.length),
    avgPages: Math.round(totalPages / sessions.length),
    totalBooks: uniqueBooks.size,
    hoursRead: Math.round(totalDuration / 60),
    currentBook,
  };
}

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | [Model, Promise<Msg>] {
  const [command, payload] = message;
  switch (command) {
    case "sessions/request": {
      // Return current model with a promise that will trigger sessions/load
      return [
        model,
        requestSessions(user).then((sessions) => ["sessions/load", { sessions }] as Msg)
      ];
    }
    case "sessions/load": {
      const { sessions } = payload;
      const stats = calculateStats(sessions);
      return {
        ...model,
        sessions,
        stats,
      };
    }
    case "session/request": {
      const { sessionId } = payload;
      // Avoid re-fetching if we already have this session
      if (model.currentSession?._id?.toString() === sessionId) {
        return model;
      }
      return [
        model,
        requestSession(sessionId, user).then((session) =>
          ["session/load", { session }] as Msg
        )
      ];
    }
    case "session/load": {
      const { session } = payload;
      return {
        ...model,
        currentSession: session,
      };
    }
    case "session/save": {
      const { onSuccess, onFailure, ...sessionData } = payload;
      return [
        model,
        saveSession(sessionData, user, { onSuccess, onFailure })
          .then(() => {
            // After saving, refetch all sessions to update the list
            return requestSessions(user);
          })
          .then((sessions) => ["sessions/load", { sessions }] as Msg)
      ];
    }
    case "session/delete": {
      const { sessionId } = payload;
      const sessions = model.sessions.filter(
        (s: Session) => s._id?.toString() !== sessionId
      );
      const stats = calculateStats(sessions);
      return { ...model, sessions, stats };
    }
    default:
      const unhandled: never = command;
      throw new Error(`Unhandled message: ${unhandled}`);
  }
}

function requestSessions(user: Auth.User) {
  return fetch("/api/sessions", {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error("No Response from server");
    })
    .then((json: unknown) => {
      if (json) return json as Session[];
      throw new Error("No JSON in response from server");
    });
}

function requestSession(sessionId: string, user: Auth.User) {
  return fetch(`/api/sessions/${sessionId}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error("No Response from server");
    })
    .then((json: unknown) => {
      if (json) return json as Session;
      throw new Error("No JSON in response from server");
    });
}

function saveSession(
  msg: {
    sessionId?: string;
    session: Session;
  },
  user: Auth.User,
  callbacks: {
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;
  }
): Promise<Session> {
  const method = msg.sessionId ? "PUT" : "POST";
  const url = msg.sessionId
    ? `/api/sessions/${msg.sessionId}`
    : "/api/sessions";

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.session)
  })
    .then((response: Response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
      throw new Error(
        `Failed to save session: ${response.statusText}`
      );
    })
    .then((json: unknown) => {
      if (json) {
        if (callbacks.onSuccess) callbacks.onSuccess();
        return json as Session;
      }
      throw new Error("No JSON in API response");
    })
    .catch((err) => {
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err;
    });
}
