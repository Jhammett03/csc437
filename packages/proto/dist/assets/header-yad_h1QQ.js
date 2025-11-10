import{i as h,O as u,e as v,x as o,b as g,r as l}from"./state-C3ECjc58.js";var p=Object.defineProperty,d=(s,e,t,b)=>{for(var n=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(n=c(e,t,n)||n);return n&&p(e,t,n),n};const i=class i extends h{constructor(){super(...arguments),this._authObserver=new u(this,"bookstats:auth"),this.loggedIn=!1}static initializeOnce(){}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:t}=e;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return o`
      <button
        @click=${e=>{v.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return o` <a href="/login.html"> Sign In… </a> `}render(){return o`
      <nav class="navbar">
        <div class="navbar-content">
          <div class="nav-brand">
            <h2>BookStats</h2>
          </div>
          <div class="nav-links">
            <label
              onchange="event.stopPropagation(); const isChecked = event.target.type === 'checkbox' ? event.target.checked : false; document.body.dispatchEvent(new CustomEvent('darkmode:toggle', { detail: { checked: isChecked } }));"
            >
              <input type="checkbox" autocomplete="off" />
              Dark mode
            </label>
            <a href="/index.html">Home</a>
            <a href="/session.html">Sessions</a>
            <a href="/book.html">Books</a>
            <a href="/author.html">Authors</a>
            <span>Hello, ${this.userid||"traveler"}</span>
            ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
          </div>
        </div>
      </nav>
    `}};i.styles=g`
    :host {
      display: block;
    }
    .navbar {
      background: var(--color-primary);
      color: var(--text-inv);
      padding: var(--space-3) 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-1);
      margin-bottom: var(--space-5);
      width: 100%;
    }
    .navbar-content {
      margin: 0 2%;
      padding: 0 var(--space-2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .navbar .nav-links {
      display: flex;
      gap: var(--space-4);
      align-items: center;
    }
    .nav-brand h2 {
      margin: 0;
      font-family: var(--font-sans);
      font-size: var(--size-4);
      color: var(--text-inv);
    }
    button {
      background: transparent;
      border: 1px solid currentColor;
      color: inherit;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: inherit;
      font-family: inherit;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    span {
      color: inherit;
    }
    label {
      color: inherit;
      cursor: pointer;
    }
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `;let r=i;d([l()],r.prototype,"loggedIn");d([l()],r.prototype,"userid");export{r as H};
