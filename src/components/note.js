import React, { Component } from 'react';
import Draggable from 'react-draggable'; // Both at the same time

class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      activeDrags: 0,
      note: props.note,
      isEditing: false,
    };

    this.onDrag = this.onDrag.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }

/*
  based on the following official react-draggable example:
  https://github.com/mzabriskie/react-draggable/blob/master/example/index.html
 */
  onDrag(e, ui) {
    const { x, y } = this.state.note;
    this.setState({
      note: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
        title: this.state.note.title,
        text: this.state.note.text,
        zIndex: this.state.note.zIndex,
      },
    });
  }

  onStartDrag() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStopDrag() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }

  render() {
    return (
      <Draggable
        handle=".handle"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.state.note.x, y: this.state.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note_main">
          <div className="titleSection">
            <p>{`${this.state.note.title}`}</p>
            <i onClick={() => this.props.del()} className="fa fa-trash" aria-hidden="true"></i>
            <i className="fa fa-arrows handle" aria-hidden="true"></i>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
