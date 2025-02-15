const setJwtCookie = (token: string, maxAge: number = 604800) => {
  document.cookie = `jwt=${token}; path=/; max-age=${maxAge}`; // Default 1 week
};

export { setJwtCookie };
