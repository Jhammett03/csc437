import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

interface RegisterFormData {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export class RegisterFormElement extends LitElement {
  @state()
  formData: RegisterFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/app";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(
      this.api &&
      this.formData.username &&
      this.formData.password &&
      this.formData.confirmPassword &&
      this.formData.password === this.formData.confirmPassword
    );
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Sign Up</button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
      .error:not(:empty) {
        color: var(--color-error, red);
        border: 1px solid var(--color-error, red);
        padding: var(--size-spacing-medium, 1rem);
        margin-top: 1rem;
      }
      :host {
        display: block;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 0.75rem 1.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 1rem;
        width: 100%;
        max-width: 200px;
      }
      button:hover:not(:disabled) {
        background-color: #0056b3;
      }
      button:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
        opacity: 0.6;
      }
    `,
  ];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
      case "confirmPassword":
        this.formData = { ...prevData, confirmPassword: value };
        break;
    }
    if (this.error) {
      this.error = undefined;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = "Passwords do not match";
      return;
    }

    if (this.canSubmit) {
      fetch(this?.api || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.formData.username,
          password: this.formData.password,
        }),
      })
        .then((res) => {
          if (res.status === 409) {
            return res.json().then((json) => {
              throw json.error || "Username already exists";
            });
          }
          if (res.status !== 201) {
            throw "Registration failed";
          }
          return res.json();
        })
        .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect: this.redirect }],
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
        })
        .catch((error: Error | string) => {
          console.log(error);
          this.error = typeof error === "string" ? error : error.message || "Registration failed";
        });
    }
  }
}

