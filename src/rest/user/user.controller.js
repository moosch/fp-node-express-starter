import Task from 'data.task';
import R from 'ramda';

import UserModel from '../../service/user/user.model';

export default {
  findAll: (req) => {
    /**
     * Task is like a lazy promise. Calling .fork will invoke it.
     * So calling a bunch of pure functions within a task,
     * then handling any errors in one place at .fork is easy!
     */
    return new Task((rej, res) => {
      return UserModel.findAll({
        limit: R.path(['query', 'limit'], req),
        offset: R.path(['query', 'offset'], req),
      }).fork(
        err => rej(err),
        users => res({
          status: 200,
          body: users,
        }),
      );
    });
  },
};
