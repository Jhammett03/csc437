import { html, css, LitElement } from "lit";

export class LoginViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: var(--space-5, 3rem);
    }
    h2 {
      color: var(--color-primary);
      text-align: center;
      margin-bottom: var(--space-4, 2rem);
    }
    .card {
      background: var(--color-surface, white);
      padding: var(--space-4, 2rem);
      border-radius: var(--radius-2, 8px);
      box-shadow: var(--shadow-1);
      margin-bottom: var(--space-3, 1rem);
    }
    p {
      text-align: center;
      color: var(--color-text-secondary);
    }
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>User Login</h2>
        <main class="card">
          <login-form api="/auth/login">
            <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" />
            </label>
          </login-form>
        </main>
        <p>
          Or did you want to
          <a href="/app/register">Sign up as a new user</a>?
        </p>
      </div>
    `;
  }
}
