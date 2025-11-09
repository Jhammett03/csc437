"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var session_list_exports = {};
__export(session_list_exports, {
  SessionListElement: () => SessionListElement
});
module.exports = __toCommonJS(session_list_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class SessionListElement extends import_lit.LitElement {
  @((0, import_decorators.property)({ type: String }))
  src;
  @((0, import_decorators.state)())
  sessions = [];
  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this.hydrate(this.src);
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("src") && this.src) {
      this.hydrate(this.src);
    }
  }
  hydrate(src) {
    fetch(src).then((res) => res.json()).then((json) => {
      if (json) {
        const data = json;
        this.sessions = Array.isArray(data) ? data : [];
      }
    }).catch((err) => {
      console.error("Error loading session data:", err);
    });
  }
  render() {
    const { sessions } = this;
    const renderSession = (session, index) => {
      const showDateHeader = session.date && (index === 0 || sessions[index - 1].date !== session.date);
      return import_lit.html`
        ${showDateHeader ? import_lit.html`<h2>${session.date}</h2>` : ""}
        <book-session
          img-src=${session["img-src"] || ""}
          img-alt=${session["img-alt"] || ""}
          book-href=${session["book-href"] || ""}
          book-name=${session["book-name"] || ""}
          duration=${session.duration || ""}
          pages=${session.pages || ""}
        >
          ${session.notes || ""}
        </book-session>
      `;
    };
    return import_lit.html` <div>${sessions.map(renderSession)}</div> `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SessionListElement
});
