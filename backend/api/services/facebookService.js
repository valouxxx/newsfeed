/**
 * FACEBOOK SERVICE
 */

const fetch = require ('node-fetch')
const FB_URL = 'https://graph.facebook.com/v2.11/'
const fb_token = '1527572300697219|f918f570185fc574ce70ffdc81e97a26'
// const id_test = '153603918376803_325152154555311'

module.exports = {

  /**
   * GET PAGE
   */
  getPage: async function (name, res) {
    sails.log.info('FB service async GET')
    let url = name +
      '?fields=' +
      'id,' +
      'name,' +
      'username,' +
      'link,' +
      'website,' +
      'fan_count,' +
      'about'

      fb = await this.myFetch (url)
      picture = await this.myFetch(name + '/picture?redirect=0&type=normal')
      fb.picture = picture
      return fb
  },

  /**
   * GET FEED
   */
  getFeed: async function (pageId) {
    let feed = await this.myFetch(pageId + '/posts')
    let posts = []
    for (var i = 0, len = feed.data.length; i < len; i++) {
      posts.push(await this.getPost(feed.data[i].id))
    }
    return posts
  },

  /**
   * GET POST
   */
  getPost: async function (postId) {
    let post = await this.myFetch(postId +
      '?fields=picture,attachments,description,created_time,message,source,story,likes'
    )
    let likeCount = await this.getLikes(postId)
    post.likes = likeCount
    return post
  },

  /**
   * GET LIKES
   */
  getLikes: async function (postId) {
    let likeCount = await this.myFetch(postId + '/likes?summary=true')
    return likeCount.summary.total_count
  },

  /**
   * MY FETCH
   */
  myFetch: function (url) {
    try {
      return fetch (FB_URL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + fb_token
        }
      })
        .then (function (res) {
          // console.log(res.status);
          // console.log(res.statusText);
          // console.log(res.headers.raw());
          // console.log(res.headers.get('content-type'));
          return res.json ()
        })
    }
    catch (err) {
      console.log (err.message)
    }
  }

}
