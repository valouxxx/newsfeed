/**
 * FbPage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fb_id: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',
      unique: true
    },
    username: {
      type: 'string',
      unique: true
    },
    fb_posts: {
      collection: 'fbpost',
      via: 'fb_page'
    },
    about: 'text',
    link: 'string',
    website: 'string',
    fan_count: 'string',
    picture: 'json',
    status: 'string'
  }
};


