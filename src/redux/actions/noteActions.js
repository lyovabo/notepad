import * as types from "./actionTypes";
import * as notesApi from "../../api/notesApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadNotesSuccess(notes) {
  return { type: types.LOAD_NOTES_SUCCESS, notes };
}

export function createNoteSuccess(notes) {
  return { type: types.CREATE_NOTE_SUCCESS, notes };
}

export function updateNotesSuccess(notes) {
  return { type: types.UPDATE_NOTES_SUCCESS, notes };
}
export function updateNotesStore(notes) {
  return { type: types.UPDATE_NOTES_STORE, notes };
}
export function deleteNoteOptimistic(notes) {
  return { type: types.DELETE_NOTE_OPTIMISTIC, notes };
}

export function loadNotes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return notesApi
      .getNotes()
      .then(notes => {
        dispatch(loadNotesSuccess(notes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function updateNotes(notes) {
  return function(dispatch, getState) {
    dispatch(updateNotesStore(notes));
  };
}
export function saveNote(notes) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return notesApi
      .saveNote(notes)
      .then(savedNotes => {
        dispatch(updateNotesSuccess(savedNotes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function saveNotes(notes) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return notesApi
      .saveNotes(notes)
      .then(savedNotes => {
        dispatch(updateNotesSuccess(savedNotes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function addNote(note) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return notesApi
      .addNote(note)
      .then(savedNotes => {
        dispatch(createNoteSuccess(savedNotes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function deleteNote(note) {
  return function(dispatch) {
    dispatch(deleteNoteOptimistic(note));
    return notesApi.deleteNote(note.id);
  };
}
