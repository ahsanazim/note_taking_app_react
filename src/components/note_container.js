import React from 'react';
import Note from './note';

const NoteContainer = (props) => {
  const allNotes = props.notes_map.entrySeq().map(([id, note]) => {
    return <Note id={id} note={note} />;
  });

  return (
    <div id="noteContainer">
      {allNotes};
    </div>
  );
};

export default NoteContainer;
