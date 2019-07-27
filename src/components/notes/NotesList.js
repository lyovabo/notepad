import React from "react";
import PropTypes from "prop-types";
import Note from "./Note";
import { Link } from "react-router-dom";

const NotesList = ({ notes, onDeleteClick }) => {
  return (
    <>
      {notes.map(note => {
        return (
          <Note
            className="col-12"
            key={note.id}
            note={note}
            onDelete={onDeleteClick}
          />
        );
      })}
    </>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default NotesList;
