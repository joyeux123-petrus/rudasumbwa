// Teacher Notes Frontend Logic
// Assumes notes.html structure as provided
const NOTES_API = 'http://localhost:3000/api/notes';

async function fetchNotes() {
  const tbody = document.querySelector('.notes-list-table tbody');
  tbody.innerHTML = '<tr><td colspan="7">Loading...</td></tr>';
  try {
    const res = await fetch(NOTES_API);
    const notes = await res.json();
    if (!notes.length) {
      tbody.innerHTML = '<tr><td colspan="7">No notes found.</td></tr>';
      return;
    }
    tbody.innerHTML = '';
    notes.forEach(note => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${note.title}</td>
        <td>${note.subject}</td>
        <td>${note.class}</td>
        <td><span class="notes-tag">${(note.tags || '').split(',')[0] || '-'}</span></td>
        <td>${note.createdAt ? new Date(note.createdAt).toLocaleDateString() : '-'}</td>
        <td>Published</td>
        <td><button class="notes-btn" onclick="editNote(${note.id})">Edit</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7">Failed to load notes.</td></tr>';
  }
}

// Handle note creation
function setupNoteEditor() {
  const editor = document.querySelector('.notes-editor');
  if (!editor) return;
  const titleInput = editor.querySelector('input[type="text"]');
  const subjectSelect = editor.querySelector('select');
  const classSelect = editor.querySelectorAll('select')[1];
  const tagsInput = editor.querySelectorAll('input[type="text"]')[1];
  const contentTextarea = editor.querySelector('textarea');
  const saveBtn = editor.querySelector('button.notes-btn');
  saveBtn.onclick = async function() {
    const note = {
      title: titleInput.value,
      subject: subjectSelect.value,
      class: classSelect.value,
      tags: tagsInput.value,
      content: contentTextarea.value,
      teacherName: 'Teacher' // Replace with actual teacher name if available
    };
    if (!note.title || !note.subject || !note.class || !note.content) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const res = await fetch(NOTES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Note created successfully!');
        fetchNotes();
      } else {
        alert(data.message || 'Failed to create note.');
      }
    } catch (err) {
      alert('Error creating note.');
    }
  };
}

// Optionally, implement editNote, preview, export, etc.

window.addEventListener('DOMContentLoaded', function() {
  fetchNotes();
  setupNoteEditor();
});
