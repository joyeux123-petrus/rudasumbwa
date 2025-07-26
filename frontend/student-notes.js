// Student Notes Frontend Logic
const NOTES_API = 'http://localhost:3000/api/notes';

async function fetchNotes() {
  const tbody = document.querySelector('.notes-library .notes-list-table tbody');
  tbody.innerHTML = '<tr><td colspan="7">Loading...</td></tr>';
  // Get filter values
  const classSelect = document.querySelector('.notes-filters select:nth-child(2)');
  const subjectSelect = document.querySelector('.notes-filters select:nth-child(1)');
  const params = new URLSearchParams();
  if (classSelect && classSelect.value && classSelect.value !== 'All Classes') params.append('class', classSelect.value);
  if (subjectSelect && subjectSelect.value && subjectSelect.value !== 'All Subjects') params.append('subject', subjectSelect.value);
  // Always fetch only published notes
  params.append('status', 'published');
  try {
    const res = await fetch(NOTES_API + '?' + params.toString());
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
        <td>${note.teacherName || '-'}</td>
        <td>${note.createdAt ? new Date(note.createdAt).toLocaleDateString() : '-'}</td>
        <td>Text</td>
        <td><span class="notes-tag">${(note.tags || '').split(',')[0] || '-'}</span></td>
        <td>
          <button class="notes-btn" onclick="previewNote(${note.id})">Preview</button>
          <button class="notes-export-btn" onclick="downloadNote(${note.id})">Download</button>
          <button class="notes-fav-btn">★</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7">Failed to load notes.</td></tr>';
  }
}

// Preview note content
window.previewNote = function(noteId) {
  fetch(NOTES_API)
    .then(res => res.json())
    .then(notes => {
      const note = notes.find(n => n.id === noteId);
      const preview = document.querySelector('.notes-preview-content');
      if (note) {
        preview.innerHTML = `<h3>${note.title}</h3><div><b>Subject:</b> ${note.subject}</div><div><b>Class:</b> ${note.class}</div><div><b>Teacher:</b> ${note.teacherName}</div><div style='margin-top:1rem;'>${note.content.replace(/\n/g, '<br>')}</div>`;
      } else {
        preview.innerHTML = 'Note not found.';
      }
    });
};

// Download note as text file
window.downloadNote = function(noteId) {
  fetch(NOTES_API)
    .then(res => res.json())
    .then(notes => {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        const blob = new Blob([note.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
};

window.addEventListener('DOMContentLoaded', function() {
  fetchNotes();
  // Add filter listeners
  document.querySelectorAll('.notes-filters select').forEach(sel => {
    sel.addEventListener('change', fetchNotes);
  });
});
