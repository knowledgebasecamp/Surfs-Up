/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{
      type: 'string'
    },
    description:{
      type: 'string'
    },
    price:{
      type: 'float'
    },
    salePrice:{
      type: 'float'
    },
    thumbNailImg:{
      type: 'string'
    },
    allImages:{
      type: 'array'
    },
    category:{
      type: 'string'
    }
  }
};
