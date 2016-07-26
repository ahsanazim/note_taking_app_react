import React, { Component } from 'react';
import Immutable from 'immutable';
import CreateBar from './note_create_bar';
import NoteContainer from './note_container';
import PopUp from './pop_up.js';
import { updtInternalId,
         fetchNotes,
         deleteNote,
         editNote,
         dragNote,
         pushNote,
         balZIndex,
         setNotEditing,
         authSignOut } from '../firebase.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      name: '',
      popUpVisible: true,
    };

    this.createNote = this.createNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setName = this.setName.bind(this);
    this.signOut = this.signOut.bind(this);
    this.idCount = 0;
  }

  componentDidMount() {
    fetchNotes(newNotes =>
      this.setState({
        notes: Immutable.Map(newNotes),
      })
    );
  }

  setName(name) {
    this.setState({ name });
  }

  createNote(noteTitle) {
    const note = {
      title: noteTitle,
      text: '',
      x: 100,
      y: 100,
      lastEdited: '',
      zIndex: 0,
      id: '',
      isEditing: false,
    };
    const fbId = pushNote(note, this.state.name);
    updtInternalId(fbId);
  }

  signOut() {
    authSignOut()
    .then(() => {
      this.setState({ popUpVisible: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <div className="topBar">
          <div id="username">{this.state.name}</div>
          <div id="signOut">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <button onClick={this.signOut}>sign out</button>
          </div>
        </div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <PopUp setName={(name) => this.setName(name)} visible={this.state.popUpVisible}
          chngVisibility={() => this.setState({ popUpVisible: !this.state.popUpVisible })}
        />
        <NoteContainer notes_map={this.state.notes} bal={(id) => balZIndex(id)}
          del={(id) => deleteNote(id)} edit={(nId, event) => editNote(nId, event.target.value, this.state.name)}
          drag={(nId, e, ui) => dragNote(nId, this.state.notes.get(nId).x, this.state.notes.get(nId).y, ui)}
          setNotEditing={(id) => setNotEditing(id)}
        />
      </div>
    );
  }
}

export default App;
