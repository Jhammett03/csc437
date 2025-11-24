import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface Session {
  bookName: string;
  duration: string;
  pages: string;
  date?: string;
  notes?: string;
}

export class SessionViewElement extends LitElement {
  @property({ attribute: "session-id" })
  sessionId?: string;

  @state()
  private session?: Session;

  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");
  _user?: Auth.User;

  get src() {
    return `/api/sessions/${this.sessionId}`;
  }

  get authorization() {
    return this._user?.authenticated
      ? {
          Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`,
        }
      : undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.sessionId) {
        this.hydrate(this.src);
      }
    });
    if (this.sessionId) {
      this.hydrate(this.src);
    }
  }

  private hydrate(src: string) {
    fetch(src, { headers: this.authorization })
      .then((res) => res.json())
      .then((data: Session) => {
        this.session = data;
      })
      .catch((err) => {
        console.error("Error loading session data:", err);
      });
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
    if (!this.session) {
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
                <dd>${this.session.bookName}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>${this.session.duration}</dd>
              </div>
              <div>
                <dt>Pages Read</dt>
                <dd>${this.session.pages}</dd>
              </div>
              ${this.session.date
                ? html`
                    <div>
                      <dt>Date</dt>
                      <dd>${this.session.date}</dd>
                    </div>
                  `
                : ""}
              ${this.session.notes
                ? html`
                    <div>
                      <dt>Notes</dt>
                      <dd>${this.session.notes}</dd>
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
