import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as noteActions from "../../redux/actions/noteActions";
import { toast } from "react-toastify";
import { validate } from "@babel/types";

class NoteAdd extends React.Component {
  state = {
    note: {
      title: "",
      description: ""
    }
  };

  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onDescriptionInput = this.onDescriptionInput.bind(this);
  }
  async addNote() {
    toast.success("Note added");
    try {
      await this.props.actions.addNote(this.state.note);
    } catch (error) {
      toast.error("Add failed. " + error.message, { autoClose: false });
    }
  }
  onTitleInput(e) {
    this.setState({
      note: {
        ...this.state.note,
        title: e.target.value
      }
    });
  }

  onDescriptionInput(e) {
    this.setState({
      note: {
        ...this.state.note,
        description: e.target.value
      }
    });
  }

  render() {
    let { loading } = this.props;
    let { addNote, onDescriptionInput, onTitleInput } = this;
    let { note } = this.state;
    return (
      <>
        <input
          onChange={onTitleInput}
          type="text"
          className="form-control"
          defaultValue={note.title}
        />
        <textarea
          onChange={onDescriptionInput}
          className="form-control"
          defaultValue={note.description}
        />

        <button
          onClick={addNote}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "loading..." : "Add"}
        </button>
      </>
    );
  }
}
NoteAdd.propTypes = {
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
      addNote: bindActionCreators(noteActions.addNote, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteAdd);
