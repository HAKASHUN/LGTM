import React, { Component, PropTypes } from 'react';

export default class List extends Component {
  handleClick() {
    const { nextUrl } = this.props;
    this.props.onLoadMoreClick(nextUrl);
  }
  render() {
    const { list, nextUrl } = this.props;
    var loadMore;
    if (nextUrl) {
      loadMore = <button onClick={() => this.handleClick()}>もっと見る</button>
    }
    return (
      <div>
        <ul>
          {
            list.map((item, index) =>
                <li>
                  <img src={item.images.low_resolution.url} />
                </li>
            )
          }
        </ul>
        {loadMore}
      </div>
    );
  }
}
