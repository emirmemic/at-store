/**
 * `isOwner` middleware
 */

export default () => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { user } = ctx.state;

    if (!user) {
      return ctx.unauthorized("You are not authorized to access this order");
    }
    // Add a filter to only show the current user's orders
    if (ctx.request.query.filters) {
      ctx.request.query.filters = {
        ...ctx.request.query.filters,
        user: user.id,
      };
    } else {
      ctx.request.query.filters = { user: user.id };
    }

    return next();
  };
};
