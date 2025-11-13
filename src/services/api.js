// API Service untuk berinteraksi dengan RESTful API
// Import data lokal untuk digunakan sebagai fallback jika API tidak tersedia
import { notesData } from '../data/notes.js';

// Base URL untuk RESTful API
// Catatan: API ini mungkin memerlukan autentikasi khusus atau memiliki pembatasan akses
// Jika API tidak tersedia, aplikasi akan menggunakan data lokal sebagai fallback
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fungsi untuk menampilkan indikator loading
const showLoading = () => {
  const loadingElement = document.getElementById('loading-indicator');
  if (loadingElement) {
    loadingElement.style.display = 'flex';
  }
};

// Fungsi untuk menyembunyikan indikator loading
const hideLoading = () => {
  const loadingElement = document.getElementById('loading-indicator');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
};

// Menggunakan data lokal sebagai fallback jika API tidak tersedia

// Fungsi untuk mendapatkan semua catatan
export const getAllNotes = async () => {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': 'dicoding-notes-app'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseJson = await response.json();
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    // Mengembalikan data langsung tanpa mengakses property notes
    // karena responseJson.data sudah berisi array catatan
    return responseJson.data;
  } catch (error) {
    console.error('Error getting notes from API, using local data instead:', error);
    // Gunakan data lokal sebagai fallback
    return notesData;
  } finally {
    hideLoading();
  }
};

// Fungsi untuk menambahkan catatan baru
export const addNote = async (title, body, transactionType = null, amount = null, transactionDate = null) => {
  showLoading();
  try {
    const noteData = { title, body };
    
    // Tambahkan properti transaksi jika ada
    if (transactionType) {
      noteData.transactionType = transactionType;
      noteData.amount = amount;
      noteData.transactionDate = transactionDate || new Date().toISOString();
    }
    
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': 'dicoding-notes-app'
      },
      body: JSON.stringify(noteData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseJson = await response.json();
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    return responseJson.data.note;
  } catch (error) {
    console.error('Error adding note to API, creating local note instead:', error);
    // Buat catatan lokal sebagai fallback
    const newNote = {
      id: `notes-${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
      transactionType,
      amount,
      transactionDate: transactionDate || (transactionType ? new Date().toISOString() : null),
    };
    notesData.unshift(newNote); // Tambahkan ke awal array
    return newNote;
  } finally {
    hideLoading();
  }
};

// Fungsi untuk menghapus catatan
export const deleteNote = async (id) => {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': 'dicoding-notes-app'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseJson = await response.json();
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting note from API, deleting local note instead:', error);
    // Hapus catatan dari data lokal sebagai fallback
    const index = notesData.findIndex(note => note.id === id);
    if (index !== -1) {
      notesData.splice(index, 1);
    }
    return true;
  } finally {
    hideLoading();
  }
};