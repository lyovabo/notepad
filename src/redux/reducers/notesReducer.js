import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { assignmentPattern } from "@babel/types";

export default function notesReducer(state = initialState.notes, action) {
  switch (action.type) {
    case types.CREATE_NOTE_SUCCESS:
      var list = [...state.list];
      list.push(action.notes);
      return Object.assign({}, state, { list: list });
    case types.UPDATE_NOTES_STORE:
      var list = [...state.list],
        updates = [...state.updates];
      var id = list.findIndex(n => n.id == action.notes.id);
      list[id] = action.notes;
      var uid = updates.indexOf(action.notes.id);
      if (uid !== -1) {
        updates[uid] = action.notes.id;
      } else {
        updates.push(action.notes.id);
      }
      return Object.assign({}, state, { list, updates });

    case types.LOAD_NOTES_SUCCESS:
      return { list: action.notes, updates: [] };
    case types.DELETE_NOTE_OPTIMISTIC:
      state.list = state.list.filter(note => note.id !== action.notes.id);
      return Object.assign({}, state);
    default:
      return state;
  }
}
