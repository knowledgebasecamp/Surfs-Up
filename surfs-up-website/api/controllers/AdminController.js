/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var CryptoJS = require('crypto-js');
 fs = require('fs-extra');

module.exports = {
	'index':function (req,res) {
		res.locals.flash = _.clone(req.session.flash);
		req.session.flash = {};
		return res.view('admin');
	},
	'login':function (req,res) {
		var loginInfo = req.params.all();
		var returnUrl = req.session.returnUrl;
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
				req.session.cookie.maxAge = expiry;
				if (returnUrl) {
					req.session.returnUrl = null;
					return res.redirect(returnUrl);
				}
				return res.redirect('/admin/dashboard/');
			}else {
				return res.redirect('/admin');
			}

		});
	},
	'logout': function(req, res) {
		req.session.destroy(function(err) {
			if (err) {
				console.log(err);
			}
			 setTimeout(function(){
				 return res.redirect('/admin/dashboard');
			 }, 500);
		});
	},
	'dashboard':function (req,res) {
		return res.view('dashboard');
	},
	productList:function (req,res) {
		Product.find().populate('reviews').exec(function (err,allProducts) {
			if (err) {
				console.log(err);
			}
			return res.view('productList',{products:allProducts})
		});
	},
	addProduct:function (req,res) {
	   return res.view('addProduct');
   	},
	createProduct:function (req,res) {
		var productData = req.params.all();

		uploadImage(req,'thumbNailImg',function (photoName) {
			productData.thumbNailImg = photoName;
			uploadImage(req,"productPhotos",function (photoNames) {
				productData.allPhotos = photoNames;
				Product.create(productData).exec(function (err,product) {
					if (err) {
						console.log(err);
					}
					return res.redirect('admin/products');
				});
			});
		});
	},
    editProduct:function (req,res) {
        var productId = req.param('product_id');

        Product.findOne({id:productId}).exec(function (err,product) {
			if (err) {
				console.log(err);
			}
			return res.view('editProduct',{product:product});
		});
   	},
    updateProduct:function (req,res) {
        var productData = req.params.all();
        if (productData.onSale === "on") {
            productData.onSale = true;
        }else {
            productData.onSale = false;
        }
        console.log(productData);

        uploadImage(req,'thumbNailImg',function (photoName) {
            productData.thumbNailImg = photoName;
            uploadImage(req,"productPhotos",function (photoNames) {
                productData.allPhotos = photoNames;
                Product.update(productData.id,productData).exec(function (err,product) {
                    if (err) {
                        console.log(err);
                    }
                    return res.redirect('admin/products');
                });
            });
        });
    }

};

function uploadImage(req,imgFormName,cb) {
  var fileNames = [];

  req.file(imgFormName).upload(function onUploadComplete(err, uploadedFiles) {
	  // copy each image to the assets folder to ensure it is saved
	  if (err) { sails.log('error:', err); }
	  if (!uploadedFiles) {
		  cb();
	  }

	  uploadedFiles.forEach(function (file) {
		  var splitFileName = file.fd.split('\\');
		  var fileName = splitFileName[splitFileName.length -1];
		  fileNames.push(fileName);
		  fs.copy(file.fd, 'assets/images/'+fileName, function (err) {
			  if (err) { return sails.log('error:', err); }
		  });
	  });

	  if (fileNames.length === 1) {
		  cb(fileNames[0]);
	  }else {
		  cb(fileNames);
	  }

  });

}
