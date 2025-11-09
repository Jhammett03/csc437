"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var book_session_exports = {};
__export(book_session_exports, {
  BookSessionElement: () => BookSessionElement
});
module.exports = __toCommonJS(book_session_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_reset_css = __toESM(require("./styles/reset.css.ts"));
class BookSessionElement extends import_lit.LitElement {
  @((0, import_decorators.property)({ type: String, attribute: "img-src" }))
  imgSrc = "";
  @((0, import_decorators.property)({ type: String, attribute: "img-alt" }))
  imgAlt = "";
  @((0, import_decorators.property)({ type: String, attribute: "book-href" }))
  bookHref = "";
  @((0, import_decorators.property)({ type: String, attribute: "book-name" }))
  bookName = "";
  @((0, import_decorators.property)({ type: String }))
  duration = "";
  @((0, import_decorators.property)({ type: String }))
  pages = "";
  render() {
    return import_lit.html`
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
    import_reset_css.default.styles,
    import_lit.css`
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
    `
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookSessionElement
});
