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
		Product.find().exec(function (err,products) {
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

		return res.view('advanced-search');
	}
};
