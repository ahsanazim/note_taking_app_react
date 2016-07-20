import React, { Component } from 'react';
import Draggable from 'react-draggable'; // Both at the same time
import marked from 'marked';

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
    this.renderTextSection = this.renderTextSection.bind(this);
    this.renderEditIcon = this.renderEditIcon.bind(this);
    this.textEditing = this.textEditing.bind(this);
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

  textEditing(event) {
    this.setState({
      note: {
        x: this.state.note.x,
        y: this.state.note.y,
        title: this.state.note.title,
        text: event.target.value,
        zIndex: this.state.note.zIndex,
      },
    });
  }

  renderEditIcon() {
    let iconText = '';
    if (this.state.isEditing) {
      iconText = 'fa fa-check';
    } else {
      iconText = 'fa fa-pencil-square-o';
    }
    return (
      <div>
        <i onClick={() => this.setState({ isEditing: !this.state.isEditing })} className={iconText} aria-hidden="true"></i>
      </div>
    );
  }

  renderTextSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <textarea value={this.state.note.text} onChange={this.textEditing} />
        </div>
      );
    } else {
      return (
        <div id="notEditing" dangerouslySetInnerHTML={{ __html: marked(this.state.note.text || '') }} />
      );
    }
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
            {this.renderEditIcon()}
            <i onClick={() => this.props.del()} className="fa fa-trash" aria-hidden="true"></i>
            <i className="fa fa-arrows handle" aria-hidden="true"></i>
          </div>
          <div className="textSection">
            {this.renderTextSection()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
