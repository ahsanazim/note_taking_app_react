import React, { Component } from 'react';
import Note from './note';

class NoteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allNotes: this.props.notes_map,
    };
    this.renderNotes = this.renderNotes.bind(this);
  }

  renderNotes() {
    return this.props.notes_map.entrySeq().map(([id, note]) => {
      return <Note id={id} note={note} key={id} del={() => this.props.del(id)} edit={(nId, event) => this.props.edit(nId, event)} drag={(nId, e, ui) => this.props.drag(nId, e, ui)} />;
    });
  }

  render() {
    return (
      <div id="noteContainer">
        {this.renderNotes()}
      </div>
    );
  }

}

export default NoteContainer;
