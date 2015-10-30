import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Header extends Component {
  handleClick() {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    if (text) {
      this.props.onSearchClick(text);
    }
  }
  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>
          Search
        </button>
      </div>
    );
  }
}
