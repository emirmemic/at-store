export default () => {
  return async (ctx, next) => {
    const { user } = ctx.state;

    if (!user) {
      return ctx.unauthorized("You are not authorized to access this resource");
    }

    // Add a filter to only show the current user's resources
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
