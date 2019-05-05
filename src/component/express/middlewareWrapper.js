import R from 'ramda';

const handleError = (errors) => (error) => {
  // TODO: This is NOT functional. Remove state with Either and don't access err[0]
  const results = R.filter((err) => err[0] === error.constructor)
  if (R.isEmpty(results)) {
    return {
      status: 500,
      body: { code: 'INTERNAL_SERVER_ERROR' },
    };
  }

  return {
    status: results[1],
    body: { code: results[2], message: error.message },
  };
};

// Here we invoke the lazy promise (Future) and handle any errors.
// We can check for these errors in one place. Pretty sweet
const middlewareWrapper = (errors) => (f) => (req, res, next) => {
  return f(req).fork(
    ({ headers = [], status = 200, body = [] } = handleError(errors)) => 
      res.status(status).set(headers).json(body),
    ({ headers = [], status = 200, body = [] }) => res.status(status).set(headers).json(body),
  );
};

export default middlewareWrapper;
