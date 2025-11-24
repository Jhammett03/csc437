import { html, css, LitElement } from "lit";

export class BooksViewElement extends LitElement {
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
    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-4);
    }
    .book-card {
      background: var(--surface-2);
      border: 1px solid var(--line);
      border-radius: var(--radius-m);
      padding: var(--space-4);
      box-shadow: var(--shadow-1);
      transition: transform 0.2s;
    }
    .book-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px hsl(220 40% 2% / 0.15);
    }
    .book-card h3 {
      color: var(--color-primary);
      margin: 0 0 var(--space-2);
      font-family: var(--font-sans);
      font-size: var(--size-3);
    }
    .book-card p {
      color: var(--text-2);
      margin: var(--space-1) 0;
      font-size: var(--size-1);
    }
    .book-card .author {
      color: var(--text-1);
      font-weight: 500;
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
          <h1>Books</h1>
        </header>

        <div class="books-grid">
          <div class="book-card">
            <h3><a href="/app/books/1">Crime and Punishment</a></h3>
            <p class="author">by Fyodor Dostoevsky</p>
            <p>Philosophical Fiction • 1866</p>
          </div>

          <div class="book-card">
            <h3><a href="/app/books/2">The Brothers Karamazov</a></h3>
            <p class="author">by Fyodor Dostoevsky</p>
            <p>Philosophical Fiction • 1880</p>
          </div>

          <div class="book-card">
            <h3><a href="/app/books/3">White Nights</a></h3>
            <p class="author">by Fyodor Dostoevsky</p>
            <p>Romance • 1848</p>
          </div>

          <div class="book-card">
            <h3><a href="/app/books/4">Demons</a></h3>
            <p class="author">by Fyodor Dostoevsky</p>
            <p>Political Fiction • 1872</p>
          </div>

          <div class="book-card">
            <h3><a href="/app/books/5">The Gambler</a></h3>
            <p class="author">by Fyodor Dostoevsky</p>
            <p>Psychological Fiction • 1866</p>
          </div>
        </div>
      </div>
    `;
  }
}
