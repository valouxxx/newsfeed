/**
 * Fb_page.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',

      unique: true
    },
    fb_posts: {
      collection: 'fb_post',
      via: 'fb_page'
    }


  }
};

