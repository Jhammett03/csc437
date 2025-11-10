import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface SessionData {
  "img-src": string;
  "img-alt": string;
  "book-href": string;
  "book-name": string;
  duration: string;
  pages: string;
  notes?: string;
  date?: string;
}

export class SessionListElement extends LitElement {
  @property({ type: String })
  src?: string;

  @state()
  private sessions: SessionData[] = [];

  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");
  _user?: Auth.User;

  get authorization() {
    return this._user?.authenticated
      ? {
          Authorization: `Bearer ${
            (this._user as Auth.AuthenticatedUser).token
          }`,
        }
      : undefined;
  }

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      // Re-fetch data when auth state changes
      if (this.src) {
        this.hydrate(this.src);
      }
    });
    if (this.src) {
      this.hydrate(this.src);
    }
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("src") && this.src) {
      this.hydrate(this.src);
    }
  }

  private hydrate(src: string) {
    fetch(src, { headers: this.authorization })
      .then((res) => res.json())
      .then((json: object) => {
        if (json) {
          const data = json as Array<SessionData>;
          this.sessions = Array.isArray(data) ? data : [];
        }
      })
      .catch((err) => {
        console.error("Error loading session data:", err);
      });
  }

  override render() {
    const { sessions } = this;

    const renderSession = (session: SessionData, index: number) => {
      const showDateHeader =
        session.date &&
        (index === 0 || sessions[index - 1].date !== session.date);

      return html`
        ${showDateHeader ? html`<h2>${session.date}</h2>` : ""}
        <book-session
          img-src=${session["img-src"] || ""}
          img-alt=${session["img-alt"] || ""}
          book-href=${session["book-href"] || ""}
          book-name=${session["book-name"] || ""}
          duration=${session.duration || ""}
          pages=${session.pages || ""}
        >
          ${session.notes || ""}
        </book-session>
      `;
    };

    return html` <div>${sessions.map(renderSession)}</div> `;
  }
}
