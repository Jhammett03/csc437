import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { Model } from "../model";
import { Msg } from "../messages";

export class SessionsViewElement extends View<Model, Msg> {
  get stats() {
    return {
      total: this.model.stats.total,
      totalDuration: this.model.stats.totalDuration,
      totalPages: this.model.stats.totalPages,
      avgDuration: this.model.stats.avgDuration,
      avgPages: this.model.stats.avgPages,
    };
  }

  constructor() {
    super("bookstats:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["sessions/request", {}]);

    this.addEventListener("session-added", () => {
      this.dispatchMessage(["sessions/request", {}]);
    });

    this.addEventListener("session-deleted", () => {
      this.dispatchMessage(["sessions/request", {}]);
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
            <session-list></session-list>
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
