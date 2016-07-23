import React, { Component } from 'react';
import Immutable from 'immutable';
import CreateBar from './note_create_bar';
import NoteContainer from './note_container';
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
    };

    this.createNote = this.createNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.zIndexBalance = this.zIndexBalance.bind(this);
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

  zIndexBalance(id) {
    if (this.state.notes.get(id).zIndex < this.maxZIndex) {
      balZIndex(id, this.maxZIndex);
      this.maxZIndex++;
    }
  }

  createNote(noteTitle) {
    const note = {
      title: noteTitle,
      text: '',
      x: 100,
      y: 100,
      zIndex: this.idCount,
      id: this.idCount,
    };
    const fbId = pushNote(note);
    updtInternalId(fbId);

    this.maxZIndex = this.idCount;
    this.idCount++;
  }

  render() {
    return (
      <div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <NoteContainer notes_map={this.state.notes} bal={(id) => this.zIndexBalance(id)}
          del={(id) => deleteNote(id)} edit={(nId, event) => editNote(nId, event.target.value)}
          drag={(nId, e, ui) => dragNote(nId, this.state.notes.get(nId).x, this.state.notes.get(nId).y, ui)}
        />
      </div>
    );
  }
}

export default App;
