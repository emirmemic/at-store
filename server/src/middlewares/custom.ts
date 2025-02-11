export default () => {
  return async (ctx, next) => {
    if (
      ctx.request.header["x-forwarded-proto"] !== "https" &&
      process.env.NODE_ENV === "production"
    ) {
      return ctx.redirect(
        `https://${ctx.request.header.host}${ctx.request.url}`
      );
    }
    await next();
  };
};
