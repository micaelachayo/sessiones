export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()|| req.user) {
    return next();
  }
  res.redirect("/login");
};

export const isGuest = (req, res, next) => {
  if (!req.isAuthenticated()&& !req.user) {
    return next();
  }
  res.redirect("/current");
};
