import fetch from 'isomorphic-fetch';
const chrome = window.chrome;

function requestUserLogin() {
  return { type: 'REQUEST_USER_LOGIN' };
}

function requestUserInfo() {
  return { type: 'REQUEST_USER_INFO' };
}

function receiveUserInfo(token) {
  return { type: 'RECEIVE_USER_INFO', token };
}

function requestUserInfoFail() {
  return { type: 'REQUEST_USER_INFO_FAIL' };
}

function requestSearch() {
  return { type: 'REQUEST_SEARCH' };
}

function receiveSearch(res) {
  return { type: 'RECEIVE_SEARCH', data: res.data, pagination: res.pagination, meta: res.meta };
}

function requestMore() {
  return { type: 'REQUEST_MORE' };
}

function receiveMore(res) {
  return { type: 'RECEIVE_MORE', data: res.data, pagination: res.pagination, meta: res.meta };
}

/**
 * login action
 */
export function login() {
  return function(dispatch) {
    dispatch(requestUserLogin());
    chrome.runtime.getBackgroundPage(function(background) {
      background.login(function(data) {
        if(data.accessToken) {
          dispatch(receiveUserInfo(data.accessToken));
        } else {
          dispatch(requestUserInfoFail());
        }
      });
    });

  }
}

/**
 * user fetch action
 */
export function fetchUser() {
  return function(dispatch) {
    dispatch(requestUserInfo());
    chrome.runtime.getBackgroundPage(function(background){
      background.fetchUser(function(data) {
        if (data.accessToken) {
          dispatch(receiveUserInfo(data.accessToken));
        } else {
          dispatch(requestUserInfoFail());
        }
      });
    });
  }
}

/**
 * search Images
 */
export function search(text) {
  return function(dispatch, getState) {
    const { user } = getState();
    dispatch(requestSearch());
    /**
     * TODO: apiのURLなどは綺麗に管理する
     */
    const url = 'https://api.instagram.com/v1/tags/'+ text +'/media/recent' + '?access_token=' + user.token +'&client_id=' + '4ebf7c4324c349ce9606a59606b7459b';
    fetch(url)
      .then(response => response.json())
      .then(function(json) {
        dispatch(receiveSearch(json));
      });
  }
}

/**
 * load more images
 */
export function loadMore(url) {
  return function(dispatch) {
    dispatch(requestMore());
    fetch(url)
      .then(response => response.json())
      .then(function(json) {
        dispatch(receiveMore(json));
      })
  }
}
