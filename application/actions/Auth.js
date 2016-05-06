import Store from '../Store';

export const RECEIVE_ACCESS_TOKEN = 'RECEIVE_ACCESS_TOKEN';
export const RECEIVE_PUSH_TOKEN = 'RECEIVE_PUSH_TOKEN';
export const PROCESS_LOGOUT = 'PROCESS_LOGOUT';

export function receiveAccessToken (opts) {
  return {
    type: RECEIVE_ACCESS_TOKEN,
    accessToken: opts.login,
    login: opts.login
  }
}

export function receivePushToken (opts) {
  return {
    type: RECEIVE_PUSH_TOKEN,
    pushToken: opts.token,
  }
}

export function processLogout() {
  return {
    type: PROCESS_LOGOUT
  }
}
