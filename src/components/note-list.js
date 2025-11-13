// Komponen NoteList (Container)
class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  renderNotes(notes) {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .note-list-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .empty-message { text-align: center; color: #777; font-style: italic; }
      </style>
      <div class="note-list-container"></div>
      <p class="empty-message" style="display: none;">Tidak ada catatan untuk ditampilkan.</p>
    `;
    const container = this.shadowRoot.querySelector('.note-list-container');
    const emptyMessage = this.shadowRoot.querySelector('.empty-message');
    container.innerHTML = '';
    if (notes.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      notes.forEach(note => {
        const noteItem = document.createElement('note-item');
        noteItem.note = note;
        container.appendChild(noteItem);
      });
    }
  }
}

customElements.define('note-list', NoteList);