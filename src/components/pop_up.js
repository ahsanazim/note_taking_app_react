import React, { Component } from 'react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appear: true,
      name: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ name: event.target.value });
  }

  handleClick() {
    this.setState({ appear: false });
    this.props.setName(this.state.name);
  }

  render() {
    let result;
    if (this.state.appear) {
      result = (
        <div id="popup" key="a">
          <h1>a realtime collborative post-it note app built with React</h1>
          <div>
            <input placeholder="your name goes here" onChange={this.onInputChange} />
            <button onClick={this.handleClick}>done</button>
          </div>
        </div>
      );
    } else {
      result = <div key="b"></div>;
    }
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {result}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default PopUp;
