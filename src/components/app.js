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
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.drag = this.drag.bind(this);
    this.edit = this.edit.bind(this);
    this.idCount = 0;
  }

  onDeleteClick(id) {
    console.log(`deleting id ${id}`);
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  drag(id, e, ui) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x: n.x + ui.deltaX, y: n.y + ui.deltaY }); }),
    });
    console.log(this.state.notes.get(id).x);
    console.log(this.state.notes.get(id).x);
  }

  edit(id, event) {
    console.log(`new text: ${event.target.value}`);
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: event.target.value }); }),
    });
    console.log(this.state.notes.get(id).text);
  }

  // click create twice to see the size coming up correctly
  createNote(noteTitle) {
    const id = this.idCount;
    const note = {
      title: noteTitle,
      text: '',
      x: 100,
      y: 100,
      zIndex: this.idCount,
    };
    this.idCount++;

    console.log(`new note with title: ${noteTitle}, id ${this.state.notes.size}`);
    this.setState({
      notes: this.state.notes.set(id, note),
    });
    console.log(`note contains: ${this.state.notes.size}`);
    console.log(`total: ${this.state.notes}`);
    return;
  }

  render() {
    console.log(`total (from within app render): ${this.state.notes}`);
    return (
      <div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <NoteContainer notes_map={this.state.notes} del={(id) => this.onDeleteClick(id)} edit={(nId, event) => this.edit(nId, event)} drag={(nId, e, ui) => this.drag(nId, e, ui)} />
      </div>
    );
  }
}

export default App;
