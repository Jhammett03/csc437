import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class BookSessionElement extends LitElement {
  @property({ type: String, attribute: "img-src" })
  imgSrc = "";

  @property({ type: String, attribute: "img-alt" })
  imgAlt = "";

  @property({ type: String, attribute: "book-href" })
  bookHref = "";

  @property({ type: String, attribute: "book-name" })
  bookName = "";

  @property({ type: String })
  duration = "";

  @property({ type: String })
  pages = "";

  override render() {
    return html`
      <div class="session-layout">
        <a href="${this.bookHref || "#"}" class="session-book">
          <img
            src="${this.imgSrc || ""}"
            alt="${this.imgAlt || ""}"
            loading="lazy"
          />
        </a>

        <dl class="session-info">
          <div>
            <dt>Duration</dt>
            <dd>
              <slot name="duration">${this.duration || ""}</slot>
            </dd>
          </div>
          <div>
            <dt>Pages Read</dt>
            <dd>
              <slot name="pages">${this.pages || ""}</slot>
            </dd>
          </div>
          <div>
            <dt>Book</dt>
            <dd>
              <a href="${this.bookHref || "#"}">
                <slot name="book-name">${this.bookName || ""}</slot>
              </a>
            </dd>
          </div>
          <div class="session-notes">
            <dt>Notes</dt>
            <dd>
              <slot></slot>
            </dd>
          </div>
        </dl>
      </div>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
        font-family: var(--font-body, serif);
        color: var(--text-1);
        border: 1px solid var(--line);
        border-radius: var(--radius-m, 0.5rem);
        padding: var(--space-4, 1rem);
        margin-bottom: var(--space-4, 1rem);
        background-color: var(--surface-3);
      }

      dl {
        margin: 0;
        padding: 0;
      }

      dt {
        margin: 0;
      }

      dd {
        margin: 0;
      }

      .session-layout {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-4, 1rem);
        align-items: start;
      }

      .session-book {
        grid-column: 1;
      }

      .session-book img {
        width: 100px;
        height: auto;
        display: block;
        border-radius: var(--radius-s, 0.375rem);
        box-shadow: var(--shadow-1);
      }

      .session-info {
        grid-column: 2;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-3, 0.75rem);
        align-items: start;
      }

      .session-info div {
        display: flex;
        flex-direction: column;
        gap: var(--space-1, 0.25rem);
      }

      .session-info dt {
        font-weight: 600;
        color: var(--text-2);
        font-size: var(--size-1, 0.875rem);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .session-info dd {
        color: var(--text-1);
        font-size: var(--size-2, 1rem);
      }

      .session-info a {
        color: var(--color-primary);
        text-decoration: none;
      }

      .session-info a:hover {
        text-decoration: underline;
      }

      .session-notes {
        border-top: 1px solid var(--line);
        padding-top: var(--space-3, 0.75rem);
        margin-top: var(--space-2, 0.5rem);
        grid-column: 1 / -1;
      }

      .session-notes dd {
        font-style: italic;
        color: var(--text-2);
      }

      @media (max-width: 768px) {
        .session-layout {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .session-info {
          grid-template-columns: 1fr;
        }

        .session-book img {
          width: 160px;
          margin: 0 auto;
        }

        .session-info {
          text-align: left;
        }
      }

      @media (max-width: 600px) {
        .session-book img {
          width: 120px;
        }
      }
    `,
  ];
}
