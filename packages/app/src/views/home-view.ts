import { html, css, LitElement } from "lit";

export class HomeViewElement extends LitElement {
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
  `;

  render() {
    return html`
      <div class="container">
        <header>
          <h1>Dashboard</h1>
          <p>Welcome back to BookStats!</p>
        </header>

        <main class="dashboard-grid">
          <section class="card">
            <h2>Recent Reading Sessions</h2>
            <p>Your recent activity will appear here.</p>
          </section>

          <aside class="card">
            <h2>Quick Stats</h2>
            <dl class="stats">
              <div>
                <dt>Total Books</dt>
                <dd>0</dd>
              </div>
              <div>
                <dt>Hours Read</dt>
                <dd>0</dd>
              </div>
              <div>
                <dt>Current Book</dt>
                <dd>-</dd>
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
