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
				if (!product) {
					return res.notFound();
				}

				return res.view('product',{product:product});
		});

	},
	'onSale':function (req,res) {
		Product.find({onSale:true}).exec(function (err,products) {
			if (err) {
				console.log(err);
			}
			var noResults = false;
			if (products.length < 1) {
				noResults = true;
			}

			return res.view('products',{products:products,pageHeading:"Items On Sale",noResults:noResults});
		});
	}
};
