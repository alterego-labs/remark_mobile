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
    AuthApiGateway.login({ login: opts.login })
      .then((response) => {
        console.log('Success response');
        successCallback(response.data);
      }).catch(function(error) {
        var response_json = error.response;
        failureCallback(response_json.data);
      });
  }
}

export default AuthService;
