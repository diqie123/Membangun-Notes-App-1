// Komponen AppBar
class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: #3498db;
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          margin: 0;
          padding: 16px;
          text-align: center;
          font-size: 1.5em;
        }
      </style>
      <header>
        <h1>My Notes App</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);