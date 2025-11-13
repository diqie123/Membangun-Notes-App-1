// Main application entry point
import './styles/style.css';
import './components/app-bar.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/note-list.js';
import './components/loading-indicator.js';
import { getAllNotes, addNote, deleteNote } from './services/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const noteListElement = document.querySelector('note-list');
  const noteFormElement = document.querySelector('note-form');
  const mainElement = document.querySelector('main');
  
  // Tambahkan loading indicator ke DOM
  const loadingIndicator = document.createElement('loading-indicator');
  loadingIndicator.id = 'loading-indicator';
  document.body.appendChild(loadingIndicator);

  // Fungsi untuk merender ulang daftar catatan dari API
  const fetchAndRenderNotes = async () => {
    try {
      const notes = await getAllNotes();
      noteListElement.renderNotes(notes);
    } catch (error) {
      console.error('Gagal mengambil catatan:', error);
      // Tampilkan pesan error ke pengguna
      alert('Gagal mengambil catatan. Silakan coba lagi.');
    }
  };

  // Event listener untuk menangkap event 'note-added' dari note-form
  noteFormElement.addEventListener('note-added', async (event) => {
    const { title, body, transactionType, amount, transactionDate } = event.detail;
    try {
      await addNote(title, body, transactionType, amount, transactionDate);
      // Setelah berhasil menambahkan catatan, ambil dan render ulang semua catatan
      await fetchAndRenderNotes();
    } catch (error) {
      console.error('Gagal menambahkan catatan:', error);
      alert('Gagal menambahkan catatan. Silakan coba lagi.');
    }
  });
  
  // Event listener untuk menangkap event 'note-delete' dari note-item
  document.addEventListener('note-delete', async (event) => {
    const { id } = event.detail;
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      try {
        await deleteNote(id);
        // Setelah berhasil menghapus catatan, ambil dan render ulang semua catatan
        await fetchAndRenderNotes();
      } catch (error) {
        console.error('Gagal menghapus catatan:', error);
        alert('Gagal menghapus catatan. Silakan coba lagi.');
      }
    }
  });

  // Render catatan untuk pertama kali
  await fetchAndRenderNotes();
});