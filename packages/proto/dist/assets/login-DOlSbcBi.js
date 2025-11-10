import{b as h,i as p,x as u,r as l,n as m,d as b,a as f}from"./state-C3ECjc58.js";import{r as g}from"./reset.css-B1UrBa_v.js";const v=h`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }
`,y={styles:v};var w=Object.defineProperty,i=(d,r,t,a)=>{for(var e=void 0,s=d.length-1,c;s>=0;s--)(c=d[s])&&(e=c(r,t,e)||e);return e&&w(r,t,e),e};const n=class n extends p{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return u`
      <form
        @change=${r=>this.handleChange(r)}
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(r){const t=r.target,a=t?.name,e=t?.value,s=this.formData;switch(a){case"username":this.formData={...s,username:e};break;case"password":this.formData={...s,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:a}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:a,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[g.styles,y.styles,h`
      .error:not(:empty) {
        color: var(--color-error, red);
        border: 1px solid var(--color-error, red);
        padding: var(--size-spacing-medium, 1rem);
        margin-top: 1rem;
      }
      :host {
        display: block;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 0.75rem 1.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 1rem;
        width: 100%;
        max-width: 200px;
      }
      button:hover:not(:disabled) {
        background-color: #0056b3;
      }
      button:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
        opacity: 0.6;
      }
    `];let o=n;i([l()],o.prototype,"formData");i([m()],o.prototype,"api");i([m()],o.prototype,"redirect");i([l()],o.prototype,"error");b({"mu-auth":f.Provider,"login-form":o});
