/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index':function (req,res) {
		var categoryName = req.param('category_name');

		Product.find({category:categoryName}).exec(function (err,products) {
			if (err) {
				console.log(err);
			}
			var noResults = false;
			if (products.length < 1) {
				noResults = true;
			}
			return res.view('products',{products:products,pageHeading:"Category: " + categoryName,noResults:noResults});
		});


	},
	list:function (req,res) {
		Category.find().exec(function (err,allCategories) {
			if (err) {
				console.log(err);
			}
			return res.view('categoryList',{categories:allCategories})
		});
	}
};
