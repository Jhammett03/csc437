import{i as h,x as p,b as v,n as a,r as b,O as y,d as u,a as k}from"./state-C3ECjc58.js";import{r as x}from"./reset.css-B1UrBa_v.js";import{H as g}from"./header-yad_h1QQ.js";var $=Object.defineProperty,d=(n,s,r,e)=>{for(var t=void 0,o=n.length-1,l;o>=0;o--)(l=n[o])&&(t=l(s,r,t)||t);return t&&$(s,r,t),t};const c=class c extends h{constructor(){super(...arguments),this.imgSrc="",this.imgAlt="",this.bookHref="",this.bookName="",this.duration="",this.pages=""}render(){return p`
      <div class="session-layout">
        <a href="${this.bookHref||"#"}" class="session-book">
          <img
            src="${this.imgSrc||""}"
            alt="${this.imgAlt||""}"
            loading="lazy"
          />
        </a>

        <dl class="session-info">
          <div>
            <dt>Duration</dt>
            <dd>
              <slot name="duration">${this.duration||""}</slot>
            </dd>
          </div>
          <div>
            <dt>Pages Read</dt>
            <dd>
              <slot name="pages">${this.pages||""}</slot>
            </dd>
          </div>
          <div>
            <dt>Book</dt>
            <dd>
              <a href="${this.bookHref||"#"}">
                <slot name="book-name">${this.bookName||""}</slot>
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
    `}};c.styles=[x.styles,v`
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
    `];let i=c;d([a({type:String,attribute:"img-src"})],i.prototype,"imgSrc");d([a({type:String,attribute:"img-alt"})],i.prototype,"imgAlt");d([a({type:String,attribute:"book-href"})],i.prototype,"bookHref");d([a({type:String,attribute:"book-name"})],i.prototype,"bookName");d([a({type:String})],i.prototype,"duration");d([a({type:String})],i.prototype,"pages");var _=Object.defineProperty,f=(n,s,r,e)=>{for(var t=void 0,o=n.length-1,l;o>=0;o--)(l=n[o])&&(t=l(s,r,t)||t);return t&&_(s,r,t),t};class m extends h{constructor(){super(...arguments),this.sessions=[],this._authObserver=new y(this,"bookstats:auth")}get authorization(){return this._user?.authenticated?{Authorization:`Bearer ${this._user.token}`}:void 0}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{this._user=s.user,this.src&&this.hydrate(this.src)}),this.src&&this.hydrate(this.src)}updated(s){super.updated(s),s.has("src")&&this.src&&this.hydrate(this.src)}hydrate(s){fetch(s,{headers:this.authorization}).then(r=>r.json()).then(r=>{if(r){const e=r;this.sessions=Array.isArray(e)?e:[]}}).catch(r=>{console.error("Error loading session data:",r)})}render(){const{sessions:s}=this,r=(e,t)=>{const o=e.date&&(t===0||s[t-1].date!==e.date);return p`
        ${o?p`<h2>${e.date}</h2>`:""}
        <book-session
          img-src=${e["img-src"]||""}
          img-alt=${e["img-alt"]||""}
          book-href=${e["book-href"]||""}
          book-name=${e["book-name"]||""}
          duration=${e.duration||""}
          pages=${e.pages||""}
        >
          ${e.notes||""}
        </book-session>
      `};return p` <div>${s.map(r)}</div> `}}f([a({type:String})],m.prototype,"src");f([b()],m.prototype,"sessions");u({"book-session":i,"session-list":m});u({"bookstats-header":g,"mu-auth":k.Provider});g.initializeOnce();
