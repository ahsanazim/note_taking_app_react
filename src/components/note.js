import React, { Component } from 'react';
import Draggable from 'react-draggable'; // Both at the same time
import marked from 'marked';

class Note extends Component {

  constructor(props) {
    super(props);

    this.onDrag = this.onDrag.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.renderTextSection = this.renderTextSection.bind(this);
    this.renderEditIcon = this.renderEditIcon.bind(this);
    this.textEditing = this.textEditing.bind(this);
    this.renderEditingUser = this.renderEditingUser.bind(this);
  }

/*
  based on the following official react-draggable example:
  https://github.com/mzabriskie/react-draggable/blob/master/example/index.html
 */
  onDrag(e, ui) {
    this.props.drag(this.props.note.id, e, ui);
  }

  onStartDrag() {
    this.props.bringToFront(this.props.note.id);
  }

  textEditing(event) {
    this.props.edit(this.props.note.id, event);
  }

  renderEditIcon() {
    let iconText = '';
    if (this.props.note.isEditing) {
      iconText = 'fa fa-check';
    } else {
      iconText = 'fa fa-pencil-square-o';
    }
    return (
      <div>
        <i onClick={this.props.setNotEditing} className={iconText} aria-hidden="true"></i>
      </div>
    );
  }

  renderTextSection() {
    if (this.props.note.isEditing) {
      return (
        <div>
          <textarea value={this.props.note.text} onChange={this.textEditing} />
        </div>
      );
    } else {
      return (
        <div>
          <div id="notEditing" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    }
  }

  renderEditingUser() {
    if (this.props.note.isEditing) {
      return (
        <div>
          <span>editing: </span>{this.props.note.lastEdited}
        </div>

      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".handle"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        zIndex={this.props.note.zIndex}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
      >
        <div className="note_main" style={{ zIndex: this.props.note.zIndex }}>
          <div className="titleSection">
            <p>{`${this.props.note.title}`}</p>
            {this.renderEditIcon()}
            <i onClick={() => this.props.del()} className="fa fa-trash" aria-hidden="true"></i>
            <i className="fa fa-arrows handle" aria-hidden="true"></i>
          </div>
          <div className="textSection">
            {this.renderTextSection()}
          </div>
          <div className="editingUser">
            {this.renderEditingUser()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
