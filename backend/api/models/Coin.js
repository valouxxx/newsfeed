/**
 * Coin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    code:{
      type: 'string',
      required: true,
      unique: true
    },
    fb_page:{
      model : 'fbpage'
    },
    status: {
      type: 'string',
      defaultsTo: 'active'
    }
    // linkedin:{
    //   model: 'linkedin'
    // },
    // website:{
    //   model: 'website'
    // },
  }

};

