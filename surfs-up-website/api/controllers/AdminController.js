/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var CryptoJS = require('crypto-js');

module.exports = {
	'index':function (req,res) {
		res.locals.flash = _.clone(req.session.flash);
		req.session.flash = {};
		return res.view('admin');
	},
	'login':function (req,res) {
		var loginInfo = req.params.all();
		req.session.flash = {};

		// confirm userName and password have been sent
		if (!loginInfo.userName || !loginInfo.password) {
			req.session.flash =  {err: {
				description: 'Both a username and password are required'
			}};
			return res.redirect('/admin');
		}

		// Encrypt the password to compare
		var ciphertext = CryptoJS.SHA256(loginInfo.password).toString();

		User.findOne({
			userName: loginInfo.userName,
			encryptedPassword: ciphertext,
		}).exec(function (err, user){
			if (err || !user) {
				req.session.flash =  {err: {
					description: 'Username or Password is incorrect'
				}};
				return res.redirect('/admin');
			}
			if (user) {
				req.session.authenticated = true;
				req.session.user = user;

				// setup the expiration 2 hours
				var now = new Date();
				var expiry = new Date(now.getTime() + (2*60*60*1000));
				console.log(expiry);
				req.session.cookie._expires = expiry;
				return res.redirect('/admin/dashboard/');
			}else {
				return res.redirect('/admin');
			}

		});
	},
	'dashboard':function (req,res) {
		return res.view('dashboard');
	}

};
