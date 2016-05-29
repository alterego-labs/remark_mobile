import { RemarksApiGateway } from 'remark-api-client-node';

class RemarksService {
  /**
   * Calls and process creating new remark
   *
   * @example
   * RemarksService.doCreate(
   *  { login: 'some_user', message: { body: 'Some thoughts' } },
   *  (success_data) => { console.log("Success!"); }
   *  (failure_data) => { console.log("Failure((("); }
   * )
   *
   * @param {Object} opts - Options for create request
   * @param {string} opts.login - A login of an user
   * @param {Object} opts.message - A object with opts of posted remark
   * @param {function} successCallback
   * @param {function} failureCallback
   * @returns {undefined}
   */
  static doCreate(opts, successCallback, failureCallback) {
    RemarksApiGateway.create(opts.login, { message: opts.message })
      .then((response) => {
        successCallback(response.data);
      }).catch((error) => {
        var response_json = error.response;
        failureCallback(response_json.data);
      });
  }
}

export default RemarksService;
