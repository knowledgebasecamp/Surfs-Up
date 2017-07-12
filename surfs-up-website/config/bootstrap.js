/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Product.create(products).exec(function (err,addedProducts) {
    if (err) {
      console.log(err);
    }
    console.log(addedProducts);
    cb();
  });
};

var products = [
  {
    title: 'Sticky Bumps Stand Up Paddle Grip Wax',
    description: 'Tacky Paddle Wax, Applies to handle and shaft of paddle Creates a secure bond between you and your paddle for better power transfer Prevents paddle twist,Dry grippy formula does not transfer to hands,Comes in White or Black,',
    price: 5.99,
    thumbNailImg: 'sticky-wax-paddle.png',
    allImages: null,
    category: 'Wax'
  },
  {
    title:"California Board Company 8' Surfboard",
    description: "High Density EPS, 100-Percent Waterproof core, Molded in laminated wood stringers, Tri-fin system, HD Polethylene slick bottom",
    price: 199.99,
    originalPrice: 249.99,
    onSale: true,
    thumbNailImg: 'board-wood.png',
    allImages: null,
    category: 'Board'
  },
  {
    title: 'Sticky Bumps Cool/cold Wax Single Bar',
    description: 'fresh from the factory, original formula, cool-cold formula for water below 68 degrees, made in the USA',
    price: 1.99,
    originalPrice: 3.99,
    onSale: true,
    thumbNailImg: 'sticky-wax.png',
    allImages: null,
    category: 'Wax'
  }
  // {
  //   title:,
  //   description: ,
  //   price: ,
  //   salePrice: ,
  //   thumbNailImg: ,
  //   allImages: ,
  // },
];
