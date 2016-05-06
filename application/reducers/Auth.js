import { RECEIVE_ACCESS_TOKEN } from '../actions/Auth';
import { Map } from 'immutable';

function wrap (login) {
  return {
    loggedIn: login && login.length > 0,
    login: login,
    accessToken: login
  }
}

const defaultState = Map({ user: wrap(undefined), pushToken: undefined });

const Auth = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKEN:
      return state.set('user', wrap(action.accessToken);
    case RECEIVE_PUSH_TOKEN:
      return Object.assign({}, state, { pushToken: action.pushToken });
    default:
      return state;
  }
}

export default Auth;
