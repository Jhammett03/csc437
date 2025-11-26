import { define, Auth, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./header";
import { HomeViewElement } from "./views/home-view";
import { SessionsViewElement } from "./views/sessions-view";
import { SessionViewElement } from "./views/session-view";
import { BooksViewElement } from "./views/books-view";
import { BookViewElement } from "./views/book-view";
import { AuthorsViewElement } from "./views/authors-view";
import { AuthorViewElement } from "./views/author-view";
import { LoginViewElement } from "./views/login-view";
import { SessionListElement } from "./session-list";
import { BookSessionElement } from "./book-session";
import { LoginFormElement } from "./auth/login-form";
import { SessionFormElement } from "./components/session-form";

const routes = [
  {
    path: "/app/sessions/:id",
    view: (params: Switch.Params) => html`
      <session-view session-id=${params.id}></session-view>
    `
  },
  {
    path: "/app/sessions",
    view: () => html`
      <sessions-view></sessions-view>
    `
  },
  {
    path: "/app/books/:id",
    view: (params: Switch.Params) => html`
      <book-view book-id=${params.id}></book-view>
    `
  },
  {
    path: "/app/books",
    view: () => html`
      <books-view></books-view>
    `
  },
  {
    path: "/app/authors/:id",
    view: (params: Switch.Params) => html`
      <author-view author-id=${params.id}></author-view>
    `
  },
  {
    path: "/app/authors",
    view: () => html`
      <authors-view></authors-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/login",
    view: () => html`
      <login-view></login-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "bookstats-header": HeaderElement,
  "home-view": HomeViewElement,
  "sessions-view": SessionsViewElement,
  "session-view": SessionViewElement,
  "books-view": BooksViewElement,
  "book-view": BookViewElement,
  "authors-view": AuthorsViewElement,
  "author-view": AuthorViewElement,
  "login-view": LoginViewElement,
  "session-list": SessionListElement,
  "session-form": SessionFormElement,
  "book-session": BookSessionElement,
  "login-form": LoginFormElement,
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "bookstats:auth")
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "bookstats:history", "bookstats:auth");
    }
  }
});
