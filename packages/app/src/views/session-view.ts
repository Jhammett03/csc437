import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { Model, Session } from "../model";
import { Msg } from "../messages";

export class SessionViewElement extends View<Model, Msg> {
  @property({ attribute: "session-id" })
  sessionId?: string;

  get session(): Session | undefined {
    return this.model.currentSession;
  }

  constructor() {
    super("bookstats:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "session-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "session/request",
        { sessionId: newValue }
      ]);
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-4, 2rem);
    }
    header {
      margin-bottom: var(--space-4, 2rem);
    }
    h1 {
      color: var(--color-primary);
      margin-bottom: var(--space-3, 1rem);
    }
    .card {
      background: var(--color-surface, white);
      padding: var(--space-4, 2rem);
      border-radius: var(--radius-2, 8px);
      box-shadow: var(--shadow-1);
    }
    dl {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    dt {
      font-weight: bold;
      color: var(--color-text-secondary);
    }
    dd {
      color: var(--color-text);
      margin: 0;
    }
  `;

  render() {
    const { session } = this;

    if (!session) {
      return html`
        <div class="container">
          <p>Loading session details...</p>
        </div>
      `;
    }

    return html`
      <div class="container">
        <header>
          <h1>Reading Session</h1>
        </header>

        <main>
          <section class="card">
            <dl>
              <div>
                <dt>Book</dt>
                <dd>${session["book-name"] || "Unknown"}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>${session.duration}</dd>
              </div>
              <div>
                <dt>Pages Read</dt>
                <dd>${session.pages}</dd>
              </div>
              ${session.date
                ? html`
                    <div>
                      <dt>Date</dt>
                      <dd>${session.date}</dd>
                    </div>
                  `
                : ""}
              ${session.notes
                ? html`
                    <div>
                      <dt>Notes</dt>
                      <dd>${session.notes}</dd>
                    </div>
                  `
                : ""}
            </dl>
          </section>
        </main>
      </div>
    `;
  }
}
