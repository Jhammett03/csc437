import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface Book {
  title: string;
  author: string;
  genre: string;
  coverImage?: string;
  firstPublished?: string;
  summary?: string;
  progress?: number;
  pagesRead?: number;
  totalPages?: number;
  sessions?: number;
}

export class BookViewElement extends LitElement {
  @property({ attribute: "book-id" })
  bookId?: string;

  @state()
  private book?: Book;

  _authObserver = new Observer<Auth.Model>(this, "bookstats:auth");
  _user?: Auth.User;

  get src() {
    return `/api/books/${this.bookId}`;
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
      if (this.bookId) {
        this.hydrate(this.src);
      }
    });
    if (this.bookId) {
      this.hydrate(this.src);
    }
  }

  private hydrate(src: string) {
    fetch(src, { headers: this.authorization })
      .then((res) => res.json())
      .then((data: Book) => {
        this.book = data;
      })
      .catch((err) => {
        console.error("Error loading book data:", err);
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
    .book-layout {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--space-4, 2rem);
    }
    .book-cover img {
      max-width: 200px;
      border-radius: var(--radius-1);
      box-shadow: var(--shadow-2);
    }
    .book-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .book-info div {
      display: flex;
      flex-direction: column;
    }
    dt {
      font-weight: bold;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-1, 0.25rem);
    }
    dd {
      color: var(--color-text);
      margin: 0;
    }
    .progress-stats {
      display: flex;
      flex-direction: column;
      gap: var(--space-3, 1rem);
    }
    .progress-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .label {
      font-weight: bold;
      color: var(--color-text-secondary);
    }
    .value {
      font-size: var(--size-3, 1.25rem);
      color: var(--color-primary);
    }
  `;

  render() {
    if (!this.book) {
      return html`
        <div class="container">
          <p>Loading book details...</p>
        </div>
      `;
    }

    return html`
      <div class="container">
        <header>
          <h1>${this.book.title}</h1>
        </header>

        <main>
          <section class="card book-main">
            <h2>${this.book.genre}</h2>

            <div class="book-layout">
              ${this.book.coverImage
                ? html`
                    <div class="book-cover">
                      <img src=${this.book.coverImage} alt="${this.book.title} cover" />
                    </div>
                  `
                : ""}

              <dl class="book-info">
                <div>
                  <dt>Author</dt>
                  <dd>${this.book.author}</dd>
                </div>
                ${this.book.firstPublished
                  ? html`
                      <div>
                        <dt>First Published</dt>
                        <dd>${this.book.firstPublished}</dd>
                      </div>
                    `
                  : ""}
                ${this.book.summary
                  ? html`
                      <div>
                        <dt>Summary</dt>
                        <dd>${this.book.summary}</dd>
                      </div>
                    `
                  : ""}
              </dl>
            </div>
          </section>

          <aside class="card book-progress">
            <h2>Reading Progress</h2>
            <div class="progress-stats">
              ${this.book.progress !== undefined
                ? html`
                    <div class="progress-item">
                      <span class="label">Progress</span>
                      <span class="value">${this.book.progress}%</span>
                    </div>
                  `
                : ""}
              ${this.book.pagesRead && this.book.totalPages
                ? html`
                    <div class="progress-item">
                      <span class="label">Pages Read</span>
                      <span class="value">${this.book.pagesRead}/${this.book.totalPages}</span>
                    </div>
                  `
                : ""}
              ${this.book.sessions !== undefined
                ? html`
                    <div class="progress-item">
                      <span class="label">Reading Sessions</span>
                      <span class="value">${this.book.sessions}</span>
                    </div>
                  `
                : ""}
            </div>
          </aside>
        </main>
      </div>
    `;
  }
}
