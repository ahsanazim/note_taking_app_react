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
         balZIndex } from '../firebase.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      name: '',
    };

    this.createNote = this.createNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.zIndexBalance = this.zIndexBalance.bind(this);
    this.setName = this.setName.bind(this);
    this.idCount = 0;
    this.maxZIndex = 0;
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
      zIndex: this.idCount,
      id: this.idCount,
    };
    const fbId = pushNote(note, this.state.name);
    updtInternalId(fbId);

    this.maxZIndex = this.idCount;
    this.idCount++;
  }

  zIndexBalance(id) {
    if (this.state.notes.get(id).zIndex < this.maxZIndex) {
      balZIndex(id, this.maxZIndex);
      this.maxZIndex++;
    }
  }

  render() {
    return (
      <div>
        <div id="username">{this.state.name}</div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <PopUp setName={(name) => this.setName(name)} />
        <NoteContainer notes_map={this.state.notes} bal={(id) => this.zIndexBalance(id)}
          del={(id) => deleteNote(id)} edit={(nId, event) => editNote(nId, event.target.value, this.state.name)}
          drag={(nId, e, ui) => dragNote(nId, this.state.notes.get(nId).x, this.state.notes.get(nId).y, ui)}
        />
      </div>
    );
  }
}

export default App;
