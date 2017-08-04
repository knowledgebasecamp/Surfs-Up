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
	},
	addCategory:function (req,res) {
	   return res.view('addCategory');
	},
	createCategory:function (req,res) {
		var categoryData = req.params.all();

		Category.create(categoryData).exec(function (err,category) {
			if (err) {
				console.log(err);
			}
			return res.redirect('admin/categories');
		});

	},
	deleteCategory:function(req,res){
		var categoryId = req.param('category_id');

		Category.destroy({id:categoryId}).exec(function (err) {
			if (err) {
				console.log(err);
			}
			return res.redirect('admin/categories');
		});
	}
};
