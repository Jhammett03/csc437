import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface SessionData {
  _id: string;
  "book-name"?: string;
  bookName?: string;
  duration: string;
  pages: string;
  notes?: string;
  date?: string;
}

export class SessionsViewElement extends LitElement {
  @state()
  private sessions: SessionData[] = [];

  @state()
  private stats = {
    total: 0,
    totalDuration: 0,
    totalPages: 0,
    avgDuration: 0,
    avgPages: 0,
  };

  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");
  _user?: Auth.User;

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
      if (this._user?.authenticated) {
        this.fetchSessions();
      }
    });

    this.addEventListener("session-added", () => {
      this.fetchSessions();
    });

    this.addEventListener("session-deleted", () => {
      this.fetchSessions();
    });
  }

  private fetchSessions() {
    fetch("/api/sessions", { headers: this.authorization })
      .then((res) => res.json())
      .then((data: SessionData[]) => {
        this.sessions = Array.isArray(data) ? data : [];
        this.calculateStats();
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
        this.sessions = [];
      });
  }

  private calculateStats() {
    if (this.sessions.length === 0) {
      this.stats = {
        total: 0,
        totalDuration: 0,
        totalPages: 0,
        avgDuration: 0,
        avgPages: 0,
      };
      return;
    }

    const totalDuration = this.sessions.reduce((sum, session) => {
      const duration = parseInt(session.duration) || 0;
      return sum + duration;
    }, 0);

    const totalPages = this.sessions.reduce((sum, session) => {
      const pages = parseInt(session.pages) || 0;
      return sum + pages;
    }, 0);

    this.stats = {
      total: this.sessions.length,
      totalDuration: totalDuration,
      totalPages: totalPages,
      avgDuration: Math.round(totalDuration / this.sessions.length),
      avgPages: Math.round(totalPages / this.sessions.length),
    };
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
      margin-bottom: var(--space-3);
      font-family: var(--font-sans);
    }
    main {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-4, 2rem);
    }
    .card {
      background: var(--surface-2);
      padding: var(--space-6);
      border-radius: var(--radius-m);
      box-shadow: var(--shadow-1);
      border: 1px solid var(--line);
    }
    .session-stats {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .label {
      font-weight: 500;
      color: var(--text-2);
    }
    .value {
      font-size: var(--size-2);
      font-weight: bold;
      color: var(--color-primary);
    }
  `;

  render() {
    return html`
      <div class="container">
        <header>
          <h1>Sessions</h1>
        </header>

        <session-form></session-form>

        <main>
          <section class="card session-main">
            <session-list src="/api/sessions"></session-list>
          </section>

          <aside class="card session-stats-card">
            <h2>Session Stats</h2>
            <div class="session-stats">
              <div class="stat-item">
                <span class="label">Total Sessions</span>
                <span class="value">${this.stats.total}</span>
              </div>
              <div class="stat-item">
                <span class="label">Total Time</span>
                <span class="value">${Math.floor(this.stats.totalDuration / 60)}h ${this.stats.totalDuration % 60}m</span>
              </div>
              <div class="stat-item">
                <span class="label">Total Pages</span>
                <span class="value">${this.stats.totalPages}</span>
              </div>
              <div class="stat-item">
                <span class="label">Avg Duration</span>
                <span class="value">${this.stats.avgDuration}min</span>
              </div>
              <div class="stat-item">
                <span class="label">Avg Pages</span>
                <span class="value">${this.stats.avgPages}</span>
              </div>
            </div>
          </aside>
        </main>
      </div>
    `;
  }
}
