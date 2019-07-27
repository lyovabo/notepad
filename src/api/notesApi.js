import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/notepad/";

export function getNotes() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function addNote(note) {
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(note)
  })
    .then(handleResponse)
    .catch(handleError);
}
export function saveNotes(notes) {
  return fetch(baseUrl, {
    method: "PATCH", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(notes)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteNote(noteId) {
  return fetch(baseUrl + noteId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
