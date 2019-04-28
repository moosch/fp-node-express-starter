/**
 * This Express middleware wrapper allows us to not bother adding any try/catch to our controllers.
 * This handles any exceptions for us in one place.
*/

const middlewareWrapper = (f) => (req, res, next) => {
  return f(req).fork(
    ({ headers = [], status = 200, body = [] }) => res.status(status).set(headers).json(body),
    ({ headers = [], status = 500, body = { code: 'INTERNAL_SERVER_ERROR' } }) => res.status(status).set(headers).json(body),
    // (err) => {
    //   return next(err);
    // },
  );
};

export default middlewareWrapper;
