import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Events, Auth } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  static initializeOnce() {
    // Optional initialization hook
  }

  override connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: Event) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html` <a href="/login"> Sign In… </a> `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .navbar {
      background: var(--color-primary);
      color: var(--text-inv);
      padding: var(--space-3) 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-1);
      margin-bottom: var(--space-5);
      width: 100%;
    }
    .navbar-content {
      margin: 0 2%;
      padding: 0 var(--space-2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .navbar .nav-links {
      display: flex;
      gap: var(--space-4);
      align-items: center;
    }
    .nav-brand h2 {
      margin: 0;
      font-family: var(--font-sans);
      font-size: var(--size-4);
      color: var(--text-inv);
    }
    button {
      background: transparent;
      border: 1px solid currentColor;
      color: inherit;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: inherit;
      font-family: inherit;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    span {
      color: inherit;
    }
    label {
      color: inherit;
      cursor: pointer;
    }
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `;

  override render() {
    return html`
      <nav class="navbar">
        <div class="navbar-content">
          <div class="nav-brand">
            <h2>BookStats</h2>
          </div>
          <div class="nav-links">
            <label
              onchange="event.stopPropagation(); const isChecked = event.target.type === 'checkbox' ? event.target.checked : false; document.body.dispatchEvent(new CustomEvent('darkmode:toggle', { detail: { checked: isChecked } }));"
            >
              <input type="checkbox" autocomplete="off" />
              Dark mode
            </label>
            <a href="/app">Home</a>
            <a href="/app/sessions">Sessions</a>
            <a href="/app/books">Books</a>
            <a href="/app/authors">Authors</a>
            <span>Hello, ${this.userid || "traveler"}</span>
            ${this.loggedIn
              ? this.renderSignOutButton()
              : this.renderSignInButton()}
          </div>
        </div>
      </nav>
    `;
  }
}
