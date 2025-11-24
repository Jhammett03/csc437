import { html, css, LitElement } from "lit";

export class AuthorsViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-4);
    }
    header {
      margin-bottom: var(--space-4);
    }
    h1 {
      color: var(--color-primary);
      margin-bottom: var(--space-3);
      font-family: var(--font-sans);
    }
    .authors-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    .author-card {
      background: var(--surface-2);
      border: 1px solid var(--line);
      border-radius: var(--radius-m);
      padding: var(--space-5);
      box-shadow: var(--shadow-1);
      display: flex;
      gap: var(--space-4);
      align-items: center;
    }
    .author-card h3 {
      color: var(--color-primary);
      margin: 0 0 var(--space-2);
      font-family: var(--font-sans);
      font-size: var(--size-4);
    }
    .author-info {
      flex: 1;
    }
    .author-card p {
      color: var(--text-2);
      margin: var(--space-1) 0;
    }
    .author-card .genre {
      color: var(--text-1);
      font-weight: 500;
      font-size: var(--size-2);
    }
    .book-count {
      background: var(--surface-3);
      padding: var(--space-3);
      border-radius: var(--radius-s);
      text-align: center;
      min-width: 100px;
    }
    .book-count .number {
      font-size: var(--size-5);
      font-weight: bold;
      color: var(--color-primary);
      display: block;
    }
    .book-count .label {
      font-size: var(--size-1);
      color: var(--text-2);
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
        <header>
          <h1>Authors</h1>
        </header>

        <div class="authors-list">
          <div class="author-card">
            <div class="author-info">
              <h3><a href="/app/authors/1">Fyodor Dostoevsky</a></h3>
              <p class="genre">Philosophical Fiction</p>
              <p>
                Russian novelist regarded as one of the greatest novelists in
                world literature. Known for psychological depth and exploration
                of morality.
              </p>
            </div>
            <div class="book-count">
              <span class="number">5</span>
              <span class="label">Books</span>
            </div>
          </div>

          <div class="author-card">
            <div class="author-info">
              <h3><a href="/app/authors/2">Leo Tolstoy</a></h3>
              <p class="genre">Realist Fiction</p>
              <p>
                Russian author best known for War and Peace and Anna Karenina,
                considered among the greatest works of fiction ever written.
              </p>
            </div>
            <div class="book-count">
              <span class="number">3</span>
              <span class="label">Books</span>
            </div>
          </div>

          <div class="author-card">
            <div class="author-info">
              <h3><a href="/app/authors/3">Anton Chekhov</a></h3>
              <p class="genre">Drama & Short Stories</p>
              <p>
                Russian playwright and short-story writer who is considered to be
                one of the greatest writers of all time.
              </p>
            </div>
            <div class="book-count">
              <span class="number">2</span>
              <span class="label">Books</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
