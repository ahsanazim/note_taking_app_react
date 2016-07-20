import React, { Component } from 'react';

class CreateBar extends Component {

  constructor(props) {
    super(props);
    this.state = { notetitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ notetitle: event.target.value });
  }

  render() {
    return (
      <div id="createBar">
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        <input onChange={this.onInputChange} value={this.state.notetitle} placeholder={"new note title"} />
        <button onClick={() => this.props.onCreateClick(this.state.notetitle)}>Create</button>
      </div>
    );
  }

}

export default CreateBar;
