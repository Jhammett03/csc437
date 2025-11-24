import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class SessionFormElement extends LitElement {
  @state()
  private showForm = false;

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
    });
  }

  static styles = css`
    :host {
      display: block;
    }
    .add-button {
      background: var(--color-primary);
      color: var(--text-inv);
      border: none;
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-s);
      font-size: var(--size-2);
      font-weight: 600;
      cursor: pointer;
      margin-bottom: var(--space-4);
      font-family: var(--font-sans);
    }
    .add-button:hover {
      background: var(--color-primary-600);
    }
    .form-container {
      background: var(--surface-2);
      border: 1px solid var(--line);
      border-radius: var(--radius-m);
      padding: var(--space-5);
      margin-bottom: var(--space-4);
      box-shadow: var(--shadow-1);
    }
    .form-container h3 {
      color: var(--color-primary);
      margin: 0 0 var(--space-4);
      font-family: var(--font-sans);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    label {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      color: var(--text-1);
      font-weight: 500;
    }
    input,
    textarea {
      padding: var(--space-2);
      border: 1px solid var(--line);
      border-radius: var(--radius-s);
      font-size: var(--size-2);
      font-family: var(--font-body);
      background: var(--surface-1);
      color: var(--text-1);
    }
    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--focus);
    }
    textarea {
      min-height: 80px;
      resize: vertical;
    }
    .button-group {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }
    button[type="submit"] {
      background: var(--color-primary);
      color: var(--text-inv);
      border: none;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-s);
      font-size: var(--size-2);
      font-weight: 600;
      cursor: pointer;
    }
    button[type="submit"]:hover {
      background: var(--color-primary-600);
    }
    button[type="button"] {
      background: var(--surface-3);
      color: var(--text-1);
      border: 1px solid var(--line);
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-s);
      font-size: var(--size-2);
      cursor: pointer;
    }
    button[type="button"]:hover {
      background: var(--line);
    }
  `;

  private handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const sessionData = {
      "book-name": formData.get("bookName"),
      bookName: formData.get("bookName"),
      duration: formData.get("duration"),
      pages: formData.get("pages"),
      notes: formData.get("notes"),
      date: new Date().toLocaleDateString(),
      "img-src": "/crimeandpunishment.jpg",
      "img-alt": formData.get("bookName") + " cover",
      "book-href": "/app/books/1",
    };

    fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.authorization,
      },
      body: JSON.stringify(sessionData),
    })
      .then((res) => res.json())
      .then(() => {
        this.showForm = false;
        form.reset();
        // Dispatch event to notify parent to refresh
        this.dispatchEvent(
          new CustomEvent("session-added", {
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch((err) => {
        console.error("Error adding session:", err);
        alert("Failed to add session. Please try again.");
      });
  }

  render() {
    return html`
      <div>
        ${!this.showForm
          ? html`
              <button
                class="add-button"
                @click=${() => (this.showForm = true)}
              >
                + Add New Session
              </button>
            `
          : html`
              <div class="form-container">
                <h3>Add Reading Session</h3>
                <form @submit=${this.handleSubmit}>
                  <label>
                    <span>Book Name</span>
                    <input
                      type="text"
                      name="bookName"
                      required
                      placeholder="Crime and Punishment"
                    />
                  </label>

                  <label>
                    <span>Duration (minutes)</span>
                    <input
                      type="number"
                      name="duration"
                      required
                      min="1"
                      placeholder="45"
                    />
                  </label>

                  <label>
                    <span>Pages Read</span>
                    <input
                      type="number"
                      name="pages"
                      required
                      min="1"
                      placeholder="20"
                    />
                  </label>

                  <label>
                    <span>Notes (optional)</span>
                    <textarea
                      name="notes"
                      placeholder="Add your thoughts about this session..."
                    ></textarea>
                  </label>

                  <div class="button-group">
                    <button type="submit">Add Session</button>
                    <button
                      type="button"
                      @click=${() => (this.showForm = false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            `}
      </div>
    `;
  }
}
