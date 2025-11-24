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
  "img-src"?: string;
  "img-alt"?: string;
  "book-href"?: string;
}

export class HomeViewElement extends LitElement {
  @state()
  private sessions: SessionData[] = [];

  @state()
  private stats = {
    totalBooks: 0,
    hoursRead: 0,
    currentBook: "-",
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
        totalBooks: 0,
        hoursRead: 0,
        currentBook: "-",
      };
      return;
    }

    // Calculate unique books
    const uniqueBooks = new Set(
      this.sessions.map((s) => s["book-name"] || s.bookName || "Unknown")
    );

    // Calculate total hours
    const totalMinutes = this.sessions.reduce((sum, session) => {
      return sum + (parseInt(session.duration) || 0);
    }, 0);
    const hoursRead = Math.round(totalMinutes / 60);

    // Get most recent book (first in list since they're sorted by date)
    const currentBook =
      this.sessions[0]?.["book-name"] ||
      this.sessions[0]?.bookName ||
      "-";

    this.stats = {
      totalBooks: uniqueBooks.size,
      hoursRead,
      currentBook,
    };
  }

  private formatDate(dateString?: string): string {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
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
    .dashboard-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-4, 2rem);
      margin-top: var(--space-4, 2rem);
    }
    .card {
      background: var(--surface-2);
      padding: var(--space-6);
      border-radius: var(--radius-m);
      box-shadow: var(--shadow-1);
      border: 1px solid var(--line);
    }
    h1 {
      color: var(--color-primary);
      margin-bottom: var(--space-3);
      font-family: var(--font-sans);
    }
    h2 {
      color: var(--color-primary);
      margin-bottom: var(--space-2);
      font-family: var(--font-sans);
    }
    .stats {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .stats div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    dt {
      font-weight: 600;
      color: var(--text-2);
    }
    dd {
      font-size: var(--size-3);
      font-weight: bold;
      color: var(--color-primary);
      margin: 0;
    }
    lord-icon.book-icon-home {
      display: flex;
      height: var(--icon-large);
      width: var(--icon-large);
      justify-self: center;
    }
    .recent-sessions {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .session-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: var(--space-3, 1rem);
      padding: var(--space-3, 1rem);
      background: var(--surface-3);
      border: 1px solid var(--line);
      border-radius: var(--radius-s);
      align-items: center;
    }
    .session-item img {
      width: 50px;
      height: auto;
      border-radius: var(--radius-s);
      box-shadow: var(--shadow-1);
    }
    .session-details {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
    .session-details .book-title {
      font-weight: 600;
      color: var(--text-1);
    }
    .session-details .session-meta {
      font-size: var(--size-1);
      color: var(--text-2);
    }
    .session-date {
      font-size: var(--size-1);
      color: var(--text-2);
      text-align: right;
    }
    .empty-state {
      text-align: center;
      padding: var(--space-5);
      color: var(--text-2);
    }
  `;

  render() {
    const recentSessions = this.sessions.slice(0, 3);

    return html`
      <div class="container">
        <header>
          <h1>Dashboard</h1>
          <p>Welcome back to BookStats!</p>
        </header>

        <main class="dashboard-grid">
          <section class="card">
            <h2>Recent Reading Sessions</h2>
            ${recentSessions.length > 0
              ? html`
                  <div class="recent-sessions">
                    ${recentSessions.map(
                      (session) => html`
                        <div class="session-item">
                          <img
                            src="${session["img-src"] || "/crimeandpunishment.jpg"}"
                            alt="${session["img-alt"] || "Book cover"}"
                          />
                          <div class="session-details">
                            <div class="book-title">
                              ${session["book-name"] || session.bookName || "Unknown Book"}
                            </div>
                            <div class="session-meta">
                              ${session.duration} • ${session.pages}
                            </div>
                          </div>
                          <div class="session-date">
                            ${this.formatDate(session.date)}
                          </div>
                        </div>
                      `
                    )}
                  </div>
                `
              : html`
                  <div class="empty-state">
                    <p>No reading sessions yet. Start tracking your reading!</p>
                    <p><a href="/app/sessions">Add your first session →</a></p>
                  </div>
                `}
          </section>

          <aside class="card">
            <h2>Quick Stats</h2>
            <dl class="stats">
              <div>
                <dt>Total Books</dt>
                <dd>${this.stats.totalBooks}</dd>
              </div>
              <div>
                <dt>Hours Read</dt>
                <dd>${this.stats.hoursRead}</dd>
              </div>
              <div>
                <dt>Current Book</dt>
                <dd>${this.stats.currentBook}</dd>
              </div>
            </dl>
            <lord-icon
              class="book-icon-home"
              src="https://cdn.lordicon.com/rrbmabsx.json"
              trigger="morph"
              state="morph-open"
              colors="primary:#ffffff,secondary:#3c72dc"
            >
            </lord-icon>
          </aside>
        </main>
      </div>
    `;
  }
}
