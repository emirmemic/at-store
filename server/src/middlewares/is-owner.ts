export default () => {
  return async (ctx, next) => {
    const { user } = ctx.state;

    const token = process.env.APITOKEN;

    const isApiToken = ctx.request.header.authorization.includes(token);

    if (!user && !isApiToken) {
      return ctx.unauthorized('You are not authorized to access this resource');
    }

    if (user) {
      // Restrict REST responses to the signed-in user's orders
      if (ctx.request.query.filters) {
        ctx.request.query.filters = {
          ...ctx.request.query.filters,
          user: user.id,
        };
      } else {
        ctx.request.query.filters = { user: user.id };
      }
    }

    return next();
  };
};
