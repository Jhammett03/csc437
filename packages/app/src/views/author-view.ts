import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface Author {
  name: string;
  genre: string;
  bio?: string;
  photo?: string;
  works?: string[];
}

export class AuthorViewElement extends LitElement {
  @property({ attribute: "author-id" })
  authorId?: string;

  @state()
  private author?: Author;

  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");
  _user?: Auth.User;

  get src() {
    return `/api/authors/${this.authorId}`;
  }

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
      if (this.authorId) {
        this.hydrate(this.src);
      }
    });
    if (this.authorId) {
      this.hydrate(this.src);
    }
  }

  private hydrate(src: string) {
    fetch(src, { headers: this.authorization })
      .then((res) => res.json())
      .then((data: Author) => {
        this.author = data;
      })
      .catch((err) => {
        console.error("Error loading author data:", err);
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
      margin-bottom: var(--space-3, 1rem);
    }
    h2 {
      color: var(--color-text);
      margin-bottom: var(--space-2, 0.5rem);
    }
    main {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-4, 2rem);
    }
    .card {
      background: var(--color-surface, white);
      padding: var(--space-4, 2rem);
      border-radius: var(--radius-2, 8px);
      box-shadow: var(--shadow-1);
    }
    .author-layout {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-4, 2rem);
    }
    .author__photo {
      max-width: 200px;
      border-radius: var(--radius-1);
      box-shadow: var(--shadow-2);
    }
    .author__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .book-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-2, 0.5rem);
    }
    .book-list li {
      padding: var(--space-2, 0.5rem);
      background: var(--color-background);
      border-radius: var(--radius-1);
    }
  `;

  render() {
    if (!this.author) {
      return html`
        <div class="container">
          <p>Loading author details...</p>
        </div>
      `;
    }

    return html`
      <div class="container">
        <header>
          <h1>${this.author.name}</h1>
        </header>

        <main>
          <section class="card author author-main">
            <div class="author-layout">
              ${this.author.photo
                ? html`
                    <img
                      class="author__photo"
                      src=${this.author.photo}
                      alt=${this.author.name}
                    />
                  `
                : ""}
              <div class="author__content">
                <div>
                  <h2>Primary Genre</h2>
                  <p>${this.author.genre}</p>
                </div>
                ${this.author.bio
                  ? html`
                      <div>
                        <h2>Bio</h2>
                        <p>${this.author.bio}</p>
                      </div>
                    `
                  : ""}
              </div>
            </div>
          </section>

          <aside class="card author-sidebar">
            <h2>Published Works</h2>
            ${this.author.works && this.author.works.length > 0
              ? html`
                  <ul class="book-list">
                    ${this.author.works.map((work) => html`<li>${work}</li>`)}
                  </ul>
                `
              : html`<p>No works listed.</p>`}
          </aside>
        </main>
      </div>
    `;
  }
}
