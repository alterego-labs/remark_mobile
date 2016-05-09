import {
  RECEIVE_ACCESS_TOKEN, RECEIVE_PUSH_TOKEN, PROCESS_LOGOUT
} from '../actions/Auth';

import { Map } from 'immutable';

import UsersService from '../utils/remark_api/UsersService';

function wrap (login) {
  return {
    loggedIn: login && login.length > 0,
    login: login,
    accessToken: login
  }
}

function sendPushTokenIfCould(state) {
  let login = state.get('user').login;
  let pushToken = state.get('pushToken');
  console.log('Trying to send token ' + pushToken + ' for user ' + login);
  if (login == undefined) return;
  if (pushToken == undefined) return;
  UsersService.doSendPushToken(login, { type: 'android', value: pushToken });
}

const defaultState = Map({ user: wrap(undefined), pushToken: undefined });

const Auth = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_ACCESS_TOKEN:
      var new_state = state.set('user', wrap(action.accessToken));
      sendPushTokenIfCould(new_state);
      return new_state;
    case RECEIVE_PUSH_TOKEN:
      var new_state = state.set('pushToken', action.pushToken);
      sendPushTokenIfCould(new_state);
      return new_state;
    case PROCESS_LOGOUT:
      var login = state.get('user').login;
      UsersService.doSendPushToken(login, { type: 'android', value: '' });
      return state.set('user', wrap(undefined));
    default:
      return state;
  }
}

export default Auth;
