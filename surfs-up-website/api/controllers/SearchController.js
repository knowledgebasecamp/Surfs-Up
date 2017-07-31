/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'search': function (req,res) {
		var q = jsesc(req.param('q'));

		Product.find({title:{'contains':q}}).exec(function (err,products) {
			if (err) {
				console.log(err);
			}
			var noResults = false;
			if (products.length < 1) {
				noResults = true;
			}

			return res.view('products',{products:products,pageHeading:"Search Results",noResults:noResults,searchText:req.param('q')});
		});
	},
	'searchAdvanced':function (req,res) {
		var allParams = req.allParams();
		var searchOptions = {};

		allParams.title !== "" ? searchOptions.title = {'contains':allParams.title}:null;
		if (allParams.price !== "*") {
			var prices = [allParams.price.split(' - ')[0],allParams.price.split(' - ')[1]];
			searchOptions.price = {'>':prices[0],'<':prices[1]};
		}

		allParams.category !== "*" ? searchOptions.category = allParams.category:null;
		allParams.onSale === "on" ? searchOptions.onSale = true:null;
		console.log(searchOptions);
		Product.find(searchOptions).exec(function (err,products) {
			if (err) {
				console.log(err);
			}
			var noResults = false;
			if (products.length < 1) {
				noResults = true;
			}

			return res.view('products',{products:products,pageHeading:"Search Results",noResults:noResults});
		});
	},
	'advanced':function (req,res) {
		Category.find().exec(function (err,categories) {
			if (err) {
				console.log(err);
			}
			return res.view('advanced-search',{categories:categories});
		});
	}
};
