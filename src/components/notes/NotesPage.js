import React from "react";
import { connect } from "react-redux";
import * as noteActions from "../../redux/actions/noteActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import NotesList from "./NotesList";
import NoteAdd from "./NoteAdd";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Header from "../common/Header";

class NotesPage extends React.Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.saveUpdates = this.saveUpdates.bind(this);
  }
  componentDidMount() {
    const { actions, deleteNote, notes } = this.props;

    if (notes.length === 0) {
      actions.loadNotes().catch(error => {
        alert("Loading notes failed" + error);
      });
    }
  }
  handleDeleteNote = async note => {
    toast.success("Note deleted");
    try {
      await this.props.actions.deleteNote(note);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  async saveUpdates(e) {
    event.preventDefault();
    toast.success("Updates saved");
    try {
      let updates = [];
      debugger;
      this.props.updates.forEach(uid => {
        this.props.notes.forEach(n => {
          if (n.id == uid) {
            updates.push(n);
          }
        });
      });
      await this.props.actions.saveNotes(updates);
    } catch (error) {
      toast.error("Save failed. " + error.message, { autoClose: false });
    }
  }
  async addNote(note) {
    toast.success("Note added");
    try {
      await this.props.actions.addNote(note);
    } catch (error) {
      toast.error("Add failed. " + error.message, { autoClose: false });
    }
  }

  render() {
    var { loading } = this.props;
    return (
      <>
        <h2>Notes</h2>
        <Header
          placeholder="blabla"
          name="header"
          label="some label"
          defaultValue=""
        />
        <button
          onClick={this.saveUpdates}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <NoteAdd
              add={note => {
                addNote(note);
              }}
            />
            <NotesList
              onDeleteClick={note => {
                this.handleDeleteNote(note);
              }}
              notes={this.props.notes}
            />
          </>
        )}
      </>
    );
  }
}

NotesPage.propTypes = {
  notes: PropTypes.array.isRequired,
  title: PropTypes.string,
  updates: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    notes: state.notes.list,
    updates: state.notes.updates,
    title: state.notes.title,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadNotes: bindActionCreators(noteActions.loadNotes, dispatch),
      deleteNote: bindActionCreators(noteActions.deleteNote, dispatch),
      addNote: bindActionCreators(noteActions.addNote, dispatch),
      saveNotes: bindActionCreators(noteActions.saveNotes, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesPage);
