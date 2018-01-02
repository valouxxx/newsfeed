/**
 * FbPageController
 *
 * @description :: Server-side logic for managing Fbpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getFbPage: async function (req, res) {

    let id = req.param ('id')
    console.log('Fb Get page Ctl : id', id)

    let page = await this.findOnePage(id)
    // console.log ('Page : ', page)

    let fb_resp = await facebookService.get(page.name)
    // console.log('fb_resp', fb_resp)

    return res.json(fb_resp)


  },

  searchOnFacebook: async function (req, res) {
    let fbPageName = req.param ('fbPageName')
    sails.log.info('searchOnFacebook : ', fbPageName);
    let fb_resp = await facebookService.get(fbPageName)
    // console.log('fb_resp', fb_resp)

    return res.json(fb_resp)
  },

  /**
   * FIND ONE PAGE
   */
  findOnePage: function(id){
    try{
      return FbPage.findOne ({id: id})
    }
    catch(err){
      console.log(err.message)
    }

  },

  /**
   * CREATE PAGE
   */
  createPage: async function (req, res) {
    let fbPageUsername = req.param('fbPageUsername')
    sails.log.info('CREATE PAGE : ', fbPageUsername);

    let fb_resp = await facebookService.get(fbPageUsername)
    sails.log.debug('Fb_resp', fb_resp.name)

    let data = {
      'fb_id' : fb_resp.id,
      'name' : fb_resp.name,
      'username' : fb_resp.username,
      'link' : fb_resp.link,
      'website' : fb_resp.website,
      'fan_count' : fb_resp.fan_count,
      'picture' : fb_resp.picture,
      'about' : fb_resp.about,
      'status' : 'active'
    }

    FbPage.create(data).then(_fbPage => {
      if (!_fbPage) throw new Error('Unable to create new coin')
      sails.log.debug(_fbPage)
      return res.json({ fbPage: _fbPage})
    })
  },

}

