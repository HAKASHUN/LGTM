import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';
import Header from '../components/Header';
import List from '../components/List';
import Footer from '../components/Footer';
import { fetchUser, login, load, search, loadMore } from '../actions';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser());
  }
  render() {
    const { dispatch, isAuthenticated, isFetching, results, nextUrl } = this.props;
    var context;
    if (isAuthenticated) {
      // UIを並べる
      // A. ヘッダー(検索BOX)
      // B. リスト
      // C. フッター
      context = (
        <div>
          <Header onSearchClick={text => dispatch(search(text))} />
          <List list={results} nextUrl={nextUrl} onLoadMoreClick={url => dispatch(loadMore(url))} />
          <Footer />
        </div>
      );
    } else if(isFetching) {
      context = <p>ログイン中...</p>
    } else {
      context = <Login onLoginClick={() => dispatch(login())} />
    }

    return (
      <div>
        {context}
      </div>
    )
  }
}

function mapStoreToProps(state) {
  const { user, image } = state;

  // pick user state
  const {
    isAuthenticated,
    isFetching,
    token
    } = user || {
    isFetching: true,
    isAuthenticated: false,
    token: null
  };

  // pick image state
  const {
    results,
    nextUrl
    } = image || {
    results: [],
    nextUrl: null
  };

  return {
    isAuthenticated,
    isFetching,
    token,
    results,
    nextUrl
  }
}

export default connect(mapStoreToProps)(App);
