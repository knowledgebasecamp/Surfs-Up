/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const jsesc = require('jsesc');
module.exports = {
	'details':function (req,res) {
		var productId = req.param('product_id');

		Product.findOne({id:productId}).populate('reviews').exec(function (err,product) {
				if (err) {
					console.log(err);
				}
				if (!product) {
					return res.notFound();
				}
				else{
					if (!req.session.viewedProducts) {
						req.session.viewedProducts = [];
					}
					if (!req.session.viewedProducts.includes(product.id)) {
						req.session.viewedProducts.push(product.id);
						product.viewCount++;
						product.save(function (err) {
							if (err) {
								console.log(err);
							}
							var userAuthenticated = req.session.authenticated || false;
							return res.view('product',{product:product,authenticated:userAuthenticated});
						});
					}else {
						var userAuthenticated = req.session.authenticated || false;
						return res.view('product',{product:product,authenticated:userAuthenticated});
					}
				}
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
	},
	'writeReview':function (req,res) {
		var productId = req.param('product_id');
		Product.findOne({id:productId}).exec(function (err,product) {
			if (err) {
				console.log(err);
			}
			return res.view('review',{product:product});
		});

	},
	'postReview':function (req,res) {
		var reviewData = req.params.all();
		Product.findOne({id:reviewData.product_id}).populate('reviews').exec(function (err,product) {
			if (err) {
				console.log(err);
			}
			delete reviewData.product_id;
			reviewData.product = product;
			Review.create(reviewData).exec(function (err,review) {
				if (err) {
					console.log(err);
				}
				return res.redirect('product/'+ product.id);
			});

		});
	}
};
