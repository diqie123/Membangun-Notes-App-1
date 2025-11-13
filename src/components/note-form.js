// Komponen NoteForm
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('form').addEventListener('submit', this._handleSubmit.bind(this));
    
    // Tambahkan event listener untuk toggle field transaksi
    const transactionTypeSelect = this.shadowRoot.querySelector('#transactionType');
    transactionTypeSelect.addEventListener('change', this._toggleTransactionFields.bind(this));
    
    // Inisialisasi tampilan field transaksi
    this._toggleTransactionFields();
  }
  
  _toggleTransactionFields() {
    const transactionTypeSelect = this.shadowRoot.querySelector('#transactionType');
    const transactionFieldsContainer = this.shadowRoot.querySelector('.transaction-fields');
    
    if (transactionTypeSelect.value !== 'none') {
      transactionFieldsContainer.style.display = 'block';
    } else {
      transactionFieldsContainer.style.display = 'none';
    }
  }
  
  _handleSubmit(event) {
    event.preventDefault();
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const transactionTypeSelect = this.shadowRoot.querySelector('#transactionType');
    const amountInput = this.shadowRoot.querySelector('#amount');
    const transactionDateInput = this.shadowRoot.querySelector('#transactionDate');
    
    if (titleInput.value && bodyInput.value) {
      const newNote = {
        title: titleInput.value,
        body: bodyInput.value,
        transactionType: transactionTypeSelect.value !== 'none' ? transactionTypeSelect.value : null,
        amount: amountInput.value ? parseInt(amountInput.value, 10) : null,
        transactionDate: transactionDateInput.value ? new Date(transactionDateInput.value).toISOString() : null
      };
      
      this.dispatchEvent(new CustomEvent('note-added', {
        detail: newNote,
        bubbles: true,
        composed: true
      }));
      
      // Reset form
      titleInput.value = '';
      bodyInput.value = '';
      transactionTypeSelect.value = 'none';
      amountInput.value = '';
      transactionDateInput.value = '';
      this._toggleTransactionFields();
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 600px;
          margin: 2rem auto;
          padding: 1.5rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input, textarea, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
          box-sizing: border-box;
        }
        textarea { min-height: 100px; resize: vertical; }
        button {
          padding: 12px 20px;
          border: none;
          background-color: #2ecc71;
          color: white;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:hover { background-color: #27ae60; }
        h2 { margin-top: 0; text-align: center; }
        .transaction-fields {
          border: 1px solid #e0e0e0;
          padding: 1rem;
          border-radius: 4px;
          margin-top: 0.5rem;
          background-color: #f9f9f9;
        }
        .transaction-fields h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #333;
        }
        .field-group {
          margin-bottom: 1rem;
        }
        .field-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .income-option { color: #27ae60; }
        .expense-option { color: #e74c3c; }
      </style>
      <section>
        <h2>Buat Catatan Baru</h2>
        <form>
          <input type="text" id="title" placeholder="Judul Catatan..." required>
          <textarea id="body" placeholder="Isi catatan..." required></textarea>
          
          <div class="field-group">
            <label for="transactionType">Jenis Transaksi:</label>
            <select id="transactionType">
              <option value="none">Bukan Transaksi</option>
              <option value="income" class="income-option">Pemasukan</option>
              <option value="expense" class="expense-option">Pengeluaran</option>
            </select>
          </div>
          
          <div class="transaction-fields">
            <h3>Detail Transaksi</h3>
            <div class="field-group">
              <label for="amount">Jumlah (Rp):</label>
              <input type="number" id="amount" placeholder="Masukkan jumlah uang..." min="0">
            </div>
            
            <div class="field-group">
              <label for="transactionDate">Tanggal Transaksi:</label>
              <input type="date" id="transactionDate">
            </div>
          </div>
          
          <button type="submit">Tambah Catatan</button>
        </form>
      </section>
    `;
  }
}

customElements.define('note-form', NoteForm);