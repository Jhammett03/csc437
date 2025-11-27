import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Model, Session } from "./model";

export class SessionListElement extends LitElement {
  @state()
  private sessions: Session[] = [];

  _storeObserver = new Observer<Model>(this, "bookstats:model");

  override connectedCallback() {
    super.connectedCallback();

    this._storeObserver.observe((model: Model) => {
      this.sessions = model?.sessions || [];
    });
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  }

  override render() {
    const { sessions } = this;

    const renderSession = (session: Session, index: number) => {
      const showDateHeader =
        session.date &&
        (index === 0 || sessions[index - 1].date !== session.date);

      return html`
        ${showDateHeader && session.date
          ? html`<h2>${this.formatDate(session.date)}</h2>`
          : ""}
        <book-session
          session-id=${session._id}
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
