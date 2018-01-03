/**
 * FbPost.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fb_id: {
      type: 'string',
      required: true,
      unique: true
    },
    // message: 'string',
    picture:'string',
    attachments: 'json',
    description: 'string',
    created_time: 'datetime',
    fb_page : {
      model : 'fbpage'
    },
    // source: 'string',
    story: 'string',
    likes: 'integer'

  }
};
//picture,attachments,description,created_time,message,source,story,likes

