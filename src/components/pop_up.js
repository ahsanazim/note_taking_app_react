import React, { Component } from 'react';
import { authSignIn, authSignUp } from '../firebase.js';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: true,
      email: '',
      password: '',
      warning: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPassInputChange = this.onPassInputChange.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.renderWarning = this.renderWarning.bind(this);
    this.respondSignUpInMsg = this.respondSignUpInMsg.bind(this);
  }

  onEmailInputChange(event) {
    this.setState({ email: event.target.value });
  }

  onPassInputChange(event) {
    this.setState({ password: event.target.value });
  }

  toggleSignIn() {
    this.setState({ signUp: false });
  }

  toggleSignUp() {
    this.setState({ signUp: true });
  }

  respondSignUpInMsg(retVal) {
    if (retVal === 'no problems') {
      // this.setState({ appear: false });
      this.props.chngVisibility();
      this.props.setName(this.state.email);
    } else {
      console.log(retVal);
      this.setState({ warning: retVal });
    }
  }

  handleClick() {
    if (this.state.signUp) {
      authSignUp(this.state.email, this.state.password)
      .then((retVal) => {
        // this.setState({ appear: false });
        this.props.chngVisibility();
        this.props.setName(this.state.email);
      })
      .catch((retVal) => {
        console.log(retVal);
        this.setState({ warning: retVal });
      });
    } else {
      authSignIn(this.state.email, this.state.password)
      .then((retVal) => {
        // this.setState({ appear: false });
        this.props.chngVisibility();
        this.props.setName(this.state.email);
      })
      .catch((retVal) => {
        console.log(retVal);
        this.setState({ warning: retVal });
      });
    }
  }

  renderWarning() {
    if (this.state.warning === '') {
      return (<div></div>);
    } else {
      console.log(this.state.warning);
      return (<div>{this.state.warning}</div>);
    }
  }

  render() {
    let result;
    if (this.props.visible) {
      result = (
        <div id="popup" key="a">
          <h1>a realtime collborative post-it note app built with React</h1>
          <div className="signUpIn">
            <p>first choose: </p>
            <button onClick={this.toggleSignUp} id="signUp">sign up</button>
            <p>or</p>
            <button onClick={this.toggleSignIn} id="signIn">sign in</button>
            <p>?</p>
          </div>
          <div className="emailPass">
            <input placeholder="email" onChange={this.onEmailInputChange} />
            <input type="password" placeholder="password" onChange={this.onPassInputChange} />
            <button onClick={this.handleClick}>done</button>
          </div>
          <div id="warning">
            {this.renderWarning()}
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
