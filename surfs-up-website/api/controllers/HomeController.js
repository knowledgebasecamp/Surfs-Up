/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index':function (req,res) {
		Product.find().exec(function (err,allProducts) {
			if (err) {
				console.log(err);
			}
			return res.view('homepage',{products:allProducts})
		});

	}
};
