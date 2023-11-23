const authentication = (req, res, next) => {
  console.log("Authenticating...");
  next();
};

export default authentication;
