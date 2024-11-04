export const setLastVisit = (req, res, next) => {
  //1. If cookie is set, then add a local variable with last visit time data.
  if (req.cookies.lastVisit) {
    //This checks if the lastVisit cookie exists in the user's request. Cookies are sent by the client to the server with each request.

    //If the user has visited before and the cookie exists, the code inside the block will execute.

    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();

    //res.locals.lastVisit: This stores the formatted date into res.locals, making it available to the view layer (like a template engine). This means you can access lastVisit in the views rendered for this request.

    //new Date(req.cookies.lastVisit): Converts the string from the cookie into a Date object so it can be manipulated.
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    //res.cookie("lastVisit", ...): This sets a new cookie on the user's browser named lastVisit.

    //res.cookie(...): This is the method provided by Express to set a single cookie in the response. It sets a specific cookie on the client's browser with a name, value, and optional settings (like maxAge, secure, etc.).
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};
