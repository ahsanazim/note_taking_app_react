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
    };

    this.createNote = this.createNote.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.drag = this.drag.bind(this);
    this.edit = this.edit.bind(this);
    this.idCount = 0;
    this.maxZIndex = 0;
  }

  onDeleteClick(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  drag(id, e, ui) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x: n.x + ui.deltaX, y: n.y + ui.deltaY }); }),
    });
  }

  zIndexBalance(id) {
    console.log(`before: zIndex - ${this.state.notes.get(id).zIndex}, max zIndex - ${this.maxZIndex}`);
    if (this.state.notes.get(id).zIndex < this.maxZIndex) {
      this.setState({
        notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { zIndex: this.maxZIndex + 1 }); }),
      });
      this.maxZIndex++;
    }
    console.log(`after:  zIndex - ${this.state.notes.get(id).zIndex}, max zIndex - ${this.maxZIndex}`);
  }

  edit(id, event) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: event.target.value }); }),
    });
  }

  createNote(noteTitle) {
    const id = this.idCount;
    const note = {
      title: noteTitle,
      text: '',
      x: 100,
      y: 100,
      zIndex: this.idCount,
      id: this.idCount,
    };
    this.maxZIndex = this.idCount;
    this.idCount++;

    this.setState({
      notes: this.state.notes.set(id, note),
    });
    return;
  }

  render() {
    return (
      <div>
        <CreateBar onCreateClick={title => this.createNote(title)} />
        <NoteContainer notes_map={this.state.notes} bal={(id) => this.zIndexBalance(id)}
          del={(id) => this.onDeleteClick(id)} edit={(nId, event) => this.edit(nId, event)}
          drag={(nId, e, ui) => this.drag(nId, e, ui)}
        />
      </div>
    );
  }
}

export default App;
