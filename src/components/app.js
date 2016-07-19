import React, { Component } from 'react';
import Immutable from 'immutable';
import CreateBar from './note_create_bar';
import NoteContainer from './note_container';

class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      //...
    };
    this.createNote = this.createNote.bind(this);
  }

  // click create twice to see the size coming up correctly
  createNote(noteTitle) {
    const id = this.state.notes.size;
    const note = {
      title: noteTitle,
      text: '',
      x: 100,
      y: 100,
      zIndex: id,
    };
    console.log(`new note with title: ${noteTitle}, id ${this.state.notes.size}`);
    this.setState({
      notes: this.state.notes.set(id, note),
    });
    console.log(`note contains: ${this.state.notes.get(this.state.notes.size - 1).title}`);
    console.log(`note contains: ${this.state.notes.size}`);
    console.log(`total: ${this.state.notes}`);
    return;
  }

  render() {
    return (
      <div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <NoteContainer notes_map={this.state.notes} />
      </div>
    );
  }
}

export default App;
