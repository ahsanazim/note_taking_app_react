import React, { Component } from 'react';
import Note from './note';

class NoteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allNotes: this.props.notes_map,
    };
    console.log(`state inside constructor: ${this.state.allNotes}, ${this.props.notes_map}`);
    this.renderNotes = this.renderNotes.bind(this);
  }

  renderNotes() {
    return this.props.notes_map.entrySeq().map(([id, note]) => {
      return <Note id={id} note={note} key={id} del={() => this.props.del(id)} />;
    });
  }

  render() {
    console.log(`state (in render func): ${this.state.allNotes}, ${this.props.notes_map}`);

    return (
      <div id="noteContainer">
        {this.renderNotes()}
      </div>
    );
  }

}

export default NoteContainer;
