/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'details':function (req,res) {
		var productId = req.param('product_id');

		Product.findOne({id:productId}).exec(function (err,product) {
				if (err) {
					console.log(err);
				}

				return res.view('product',{product:product});
		});

	}
};
