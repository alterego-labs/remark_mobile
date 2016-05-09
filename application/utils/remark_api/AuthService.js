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
   * @param {Object} opts - Options for request
   * @param {string} opts.login - A login of an user
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
      failureCallback(response.data);
      return response;
    });
  }
}

export default AuthService;
