// Komponen NoteItem
class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._note = null;
    this.attachShadow({ mode: 'open' });
  }
  
  set note(note) {
    this._note = note;
    this.render();
  }
  
  connectedCallback() {
    this.render();
    this._addEventListeners();
  }
  
  _addEventListeners() {
    const deleteButton = this.shadowRoot.querySelector('.delete-button');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('note-delete', {
          detail: { id: this._note.id },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  render() {
    if (!this._note) return;
    const formattedDate = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    
    // Format tanggal transaksi jika ada
    let transactionDateFormatted = '';
    if (this._note.transactionDate) {
      transactionDateFormatted = new Date(this._note.transactionDate).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }
    
    // Format jumlah uang jika ada
    let formattedAmount = '';
    if (this._note.amount !== null) {
      formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(this._note.amount);
    }
    
    // Tentukan warna berdasarkan jenis transaksi
    let transactionClass = '';
    if (this._note.transactionType === 'income') {
      transactionClass = 'income';
    } else if (this._note.transactionType === 'expense') {
      transactionClass = 'expense';
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          overflow-wrap: break-word;
        }
        .note-title { margin: 0 0 8px 0; font-size: 1.2em; font-weight: bold; }
        .note-date { margin: 0 0 12px 0; font-size: 0.8em; color: #666; }
        .note-body { margin: 0; white-space: pre-wrap; margin-bottom: 15px; }
        .delete-button {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background-color 0.2s;
        }
        .delete-button:hover {
          background-color: #c0392b;
        }
        .transaction-details {
          margin: 15px 0;
          padding: 10px;
          border-radius: 4px;
          background-color: #f0f0f0;
          border-left: 4px solid #ccc;
        }
        .transaction-details.income {
          border-left-color: #27ae60;
          background-color: rgba(39, 174, 96, 0.1);
        }
        .transaction-details.expense {
          border-left-color: #e74c3c;
          background-color: rgba(231, 76, 60, 0.1);
        }
        .transaction-amount {
          font-size: 1.2em;
          font-weight: bold;
          margin: 5px 0;
        }
        .transaction-amount.income {
          color: #27ae60;
        }
        .transaction-amount.expense {
          color: #e74c3c;
        }
        .transaction-date {
          font-size: 0.9em;
          color: #666;
          margin: 5px 0;
        }
        .transaction-type {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 0.8em;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .transaction-type.income {
          background-color: #27ae60;
          color: white;
        }
        .transaction-type.expense {
          background-color: #e74c3c;
          color: white;
        }
      </style>
      <article>
        <h3 class="note-title">${this._note.title}</h3>
        <p class="note-date">${formattedDate}</p>
        <p class="note-body">${this._note.body}</p>
        
        ${this._note.transactionType ? `
        <div class="transaction-details ${transactionClass}">
          <span class="transaction-type ${transactionClass}">
            ${this._note.transactionType === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </span>
          <p class="transaction-amount ${transactionClass}">${formattedAmount}</p>
          <p class="transaction-date">Tanggal Transaksi: ${transactionDateFormatted}</p>
        </div>
        ` : ''}
        
        <button class="delete-button">Hapus</button>
      </article>
    `;
    this._addEventListeners();
  }
}

customElements.define('note-item', NoteItem);