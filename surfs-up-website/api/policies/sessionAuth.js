/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller+
  if (req.session.authenticated) {
    return next();
  }
  var errDescription = 'Please Login before continuing';
  // write review route
  if (req.url.indexOf('/write-review') !== -1) {
      errDescription = 'Please Login before you write a review';
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  if (req.method === "POST" || req.method === "PUT") {
    return res.forbidden('You are not permitted to perform this action.');
  }

  // User is not allowed
  // return user to this url
  req.session.flash =  {err: {
    description: errDescription
  }};
  req.session.returnUrl = req.url;
  console.log(req.session);
  return res.redirect('/admin');

};
