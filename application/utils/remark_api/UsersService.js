import { UsersApiGateway } from 'remark-api-client-node';

class UsersService {
  /**
   * Calls sending push token to the API server 
   * @param {string} login - A login of an user
   * @param {Object} params - Parameters object
   * @param {string} params.type - Type of a push token
   * @param {stirng} params.value - Value of a push token
   */
  static doSendPushToken(login, params) {
    UsersApiGateway.sendPushToken(login, params);
  }
}

export default UsersService;
