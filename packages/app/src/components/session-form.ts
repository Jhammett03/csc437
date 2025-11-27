import { View, Form, define } from "@calpoly/mustang";
import { html, css } from "lit";
import { state } from "lit/decorators.js";
import { Model, Session } from "../model";
import { Msg } from "../messages";

export class SessionFormElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @state()
  private showForm = false;

  constructor() {
    super("bookstats:model");
  }

  static styles = css`
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

    label {
      display: flex !important;
      flex-direction: column !important;
      gap: var(--space-1) !important;
      color: var(--text-1);
      font-weight: 500;
      grid-column: 1 !important;
      grid-template-columns: none !important;
      width: 100%;
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
      width: 100%;
      box-sizing: border-box;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--focus);
    }

    textarea {
      min-height: 100px;
      resize: vertical;
      font-family: var(--font-body);
    }

    .button-group {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-4);
      width: 100%;
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

  handleSubmit = (event: Form.SubmitEvent<Record<string, string>>) => {
    const formData = event.detail;

    // Transform form data to match original format
    const sessionData = {
      "book-name": formData["book-name"],
      duration: formData.duration,
      pages: formData.pages,
      notes: formData.notes || "",
      date: new Date().toLocaleDateString(),
      "img-src": "/crimeandpunishment.jpg",
      "img-alt": formData["book-name"] + " cover",
      "book-href": "/app/books/1",
    };

    this.dispatchMessage([
      "session/save",
      { session: sessionData as Session },
      {
        onSuccess: () => {
          this.showForm = false;
          console.log("Session saved successfully");
        },
        onFailure: (error: Error) => {
          console.error("Error saving session:", error);
          alert("Failed to save session. Please try again.");
        }
      }
    ]);
  };

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
                <mu-form @mu-form:submit=${this.handleSubmit}>
                  <label>
                    <span>Book Name</span>
                    <input
                      type="text"
                      name="book-name"
                      required
                      autocomplete="off"
                    />
                  </label>
                  <label>
                    <span>Duration (minutes)</span>
                    <input
                      type="text"
                      name="duration"
                      required
                      autocomplete="off"
                    />
                  </label>
                  <label>
                    <span>Pages Read</span>
                    <input
                      type="text"
                      name="pages"
                      required
                      autocomplete="off"
                    />
                  </label>
                  <label>
                    <span>Notes (optional)</span>
                    <textarea
                      name="notes"
                      autocomplete="off"
                      placeholder="Add your thoughts about this session..."
                    ></textarea>
                  </label>
                
                </mu-form>
                <div class="button-group">
                  <button
                    type="button"
                    @click=${() => (this.showForm = false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            `}
      </div>
    `;
  }
}
