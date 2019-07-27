import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

import * as noteActions from "../../redux/actions/noteActions";

class Note extends React.Component {
  constructor(props, dispatch) {
    super(props);
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onDescriptionInput = this.onDescriptionInput.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.setState({ note: props.note });
  }
  onTitleInput(e) {
    this.props.actions.updateNote({
      ...this.props.note,
      description: e.target.value
    });
  }
  async deleteNote(note) {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteNote(note);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }
  onDescriptionInput(e) {
    this.props.actions.updateNote({
      ...this.props.note,
      description: e.target.value
    });
  }
  render() {
    let { loading } = this.props;
    let { deleteNote, onDescriptionInput, onTitleInput } = this;
    let { note } = this.props;

    return (
      <>
        <div className="field">
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={note.title}
            onChange={onTitleInput}
          />
          <textarea
            placeholder=""
            className="form-control"
            value={note.description}
            onChange={onDescriptionInput}
          />
        </div>
        <button
          onClick={() => {
            deleteNote(note);
          }}
          disabled={loading}
          className="btn btn-outline-danger"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteNote: bindActionCreators(noteActions.deleteNote, dispatch),
      updateNote: bindActionCreators(noteActions.updateNotes, dispatch)
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
