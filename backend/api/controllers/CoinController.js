/**
 * CoinController
 *
 * @description :: Server-side logic for managing coins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * CREATE
   */
  create: async function (req, res) {

    sails.log.info('Create coin');

    let name = req.param('name'),
      code = req.param('code'),
      fb_page = req.param('fb_page'),
      status = 'active'

    if(!name){
      return res.badRequest({err:'No name'})
    }

    let _fb_page = await this.addAttribute (FbPage, { name: fb_page })
    console.log(_fb_page);

    Coin.create({
      name,
      code,
      status,
      fb_page : _fb_page
    }).then(_coin => {
      if (!_coin) throw new Error('Unable to create new coin')
      sails.log.debug(_coin)
      return res.json({ coin: _coin})
    })


  },

  /**
   * UPDATE
   */
  update: async function (req, res) {

    sails.log.info('Update coin ' + req.param('name'))

    let
      id = req.param('id'),
      name = req.param('name'),
      code = req.param('code'),
      fb_page = req.param('fb_page')

    if(!name){
      return res.badRequest({err:'No name'})
    }
    // let _fb_page = await this.addAttribute (FbPage, { name: fb_page })
    // sails.log.info('Saved page : ', _fb_page.name);

    Coin.update({id : id}, {
      name: name,
      code: code,
      fb_page : fb_page
    }).then(_coin => {
      if (!_coin) throw new Error('Unable to update this coin')
      sails.log.debug(_coin)
      return res.json({ coin: _coin})
    })


  },

  /*
	* ADD ATTRIBUTES
	*/
  addAttribute : (model, data) => {
    try{
      console.log('add ' + data.name)
      return model.findOrCreate(data)
      throw new Error ('unable to create ' + model)
    }
    catch(err){
      console.log(err.message)
    }
  },
};

