/**
 * The service layer is used to process actions to the persistence layer.
 * It's also the place where you can call other services to get data.
 * Additionally this would be a great place to emit Node events for subscribers.
 * For example creating a record is a common task that may have subscribers.
 * Emitting a 'USER_CREATED' event may be useful to trigger registration emails etc.
 */
import UserModel from './user.model';

export default {
  find: async (id) => {
    return id;
  },

  findAll: ({ limit, offset }) => {
    return UserModel.findAll(limit, offset);
  },
};