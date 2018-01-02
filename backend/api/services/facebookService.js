/**
 * FACEBOOK SERVICE
 */

const fetch = require ('node-fetch')
const fb_url = 'https://graph.facebook.com/v2.11/'
const fb_token = '1527572300697219|f918f570185fc574ce70ffdc81e97a26'
// const id_test = '153603918376803_325152154555311'

module.exports = {

  get: async function (name, res) {
    sails.log.info('FB service async GET')
    let url = fb_url + name +
      '?fields=' +
      'id,' +
      'name,' +
      'username,' +
      'link,' +
      'website,' +
      'fan_count,' +
      'about'

      fb = await this.myFetch (url)
      picture = await this.myFetch(fb_url + name + '/picture?redirect=0&type=normal')
      fb.picture = picture
      return fb
  },

  myFetch: function (url) {
    try {
      return fetch (url, {
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
