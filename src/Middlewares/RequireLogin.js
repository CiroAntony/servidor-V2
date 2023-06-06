const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send("Restringido");
    return;
  }
  next();
};

module.exports = requireLogin;
