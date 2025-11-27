import { html, css, LitElement } from "lit";

export class RegisterViewElement extends LitElement {
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
        <h2>Create New Account</h2>
        <main class="card">
          <register-form api="/auth/register" redirect="/app">
            <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" required />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" required />
            </label>
            <label>
              <span>Confirm Password:</span>
              <input type="password" name="confirmPassword" required />
            </label>
          </register-form>
        </main>
        <p>
          Already have an account?
          <a href="/app/login">Log in</a>
        </p>
      </div>
    `;
  }
}

