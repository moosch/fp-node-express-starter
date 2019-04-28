/**
 * The controllers are used to call services and in some patterns to validate requests.
 * They are also the final stop where you respond to requests and handle errors.
 * It's also good practice to implement logging here (and in the service layer).
 */
import Future from 'fluture';
import R from 'ramda';

import userService from '../../service/user/user.service';

export default {
  find: async (req) => {
    const { params: { id } } = req;

    try {
      const user = await userService.find(id);
      return { status: 200, body: user };
    } catch (err) {

    }
  },

  findAll: (req) => {
    /**
     * TODO: Look into awaiting multiple futures in the same pattern as controller -> service -> persistence
     * async pipe/seq needed
     */
    return Future((reject, resolve) => {
      userService.findAll({
        limit: R.path(['query', 'limit'], req),
        offset: R.path(['query', 'offset'], req),
      })
        .then(users => {
          return resolve({
            status: 200,
            body: users,
          });
        })
        .catch((err) => {
          return reject({
            status: 400,
            body: err.message,
          });
        });
    });
  },
};
