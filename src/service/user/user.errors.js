import SerialisedError from '../../component/error/serialisedError';

class InvalidRequestError extends SerialisedError {
  constructor(message) {
    super(message)
    this.name = 'InvalidRequestError'
    this.message = message
  }
}

class UserNotFoundError extends SerialisedError {
  constructor(message) {
    super(message)
    this.name = 'UserNotFoundError'
    this.message = message
  }
}

export default {
  InvalidRequestError,
  UserNotFoundError,
};
