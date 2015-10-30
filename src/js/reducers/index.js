import { combineReducers } from 'redux';

/**
 * user reducer
 */
function user(state = {
  token: null,
  isFetching: false,
  isAuthenticated: false
}, action) {
  switch(action.type) {
    case 'REQUEST_USER_LOGIN':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'REQUEST_USER_INFO':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_USER_INFO':
      return Object.assign({}, state, {
        isFetching: false,
        token: action.token,
        isAuthenticated: !!action.token
      });
    case 'REQUEST_USER_INFO_FAIL':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    default:
      return state;
  }
}

/**
 * image reducer
 */
function image(state = {
  isFetching: false,
  nextUrl: null,
  results: []
}, action) {
  switch(action.type) {
    case 'REQUEST_SEARCH':
      return Object.assign({}, state, {
        isFetching: true,
        nextUrl: null,
        results: []
      });
    case 'RECEIVE_SEARCH':
      return Object.assign({}, state, {
        isFetching: false,
        nextUrl: action.pagination.next_url,
        results: state.results.concat(action.data)
      });
    case 'RECEIVE_MORE':
      return Object.assign({}, state, {
        isFetching: false,
        nextUrl: action.pagination.next_url,
        results: state.results.concat(action.data)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  image
});

export default rootReducer;
