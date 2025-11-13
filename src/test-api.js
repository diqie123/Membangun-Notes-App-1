// File untuk menguji API secara langsung
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fungsi untuk mendapatkan semua catatan
async function testGetAllNotes() {
  try {
    console.log('Fetching from URL:', `${BASE_URL}/notes`);
    const response = await fetch(`${BASE_URL}/notes`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': 'dicoding-notes-app'
      }
    });
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    const responseText = await response.text();
    console.log('Response text (first 100 chars):', responseText.substring(0, 100));
    const responseJson = JSON.parse(responseText);
    
    console.log('Response Status:', responseJson.status);
    console.log('Response Data:', responseJson.data);
    
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    
    return responseJson.data;
  } catch (error) {
    console.error('Error getting notes:', error);
    throw error;
  }
}

// Jalankan test
testGetAllNotes().then(data => {
  console.log('Test berhasil:', data);
}).catch(error => {
  console.error('Test gagal:', error);
});