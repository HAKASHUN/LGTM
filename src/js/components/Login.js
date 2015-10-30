import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  handleClick() {
    this.props.onLoginClick();
  }
  render() {
    return (
      <div onClick={(e) => this.handleClick(e)}>
        ログイン
      </div>
    );
  }
}
