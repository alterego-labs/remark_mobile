import { AuthApiGateway } from 'remark-api-client-node';

class AuthService {
  /**
   * Calls and process login in Remark API
   *
   * @example
   * AuthService.doLogin(
   *   { login: 'some_user' },
   *   (data) => { console.log("Success!"); },
   *   (data) => { console.log("Failure((("); }
   * )
   *
   * @param {object} opts - Object which contains login params.
   * @param {function} successCallback
   * @param {function} failureCallback
   * @returns {undefined}
   */
  static doLogin(opts, successCallback, failureCallback){
    AuthApiGateway.login({ user: { login: opts.login } }).then((response) => {
      successCallback(response.data);
      return response;
    }).catch(function(ex) {
      return ex.response.json();
    }).then((response) => {
      failureCallback(response.data)
      return response;
    });
  }
}

export default AuthService;
