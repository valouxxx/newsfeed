module.exports = {

  cronFacebook: async function (req){
    console.log('_____START CRON______')
    let pages = await FbPage.find()
    // console.log(pages)

    // _.each(pages, (page) => {
    //   // console.log('PAAAGE', page)
    //   console.log('--- POSTS FROM ' + page.name + ' ----')
    //   facebookService.getFeed(page.fb_id).then(function(posts){
    //     // console.log('list', posts)
    //
    //     _.each(posts, (post) => {
    //       console.log('post : ' + page.name + ' - ' + page.id)
    //       console.log('post fb_id : ' + post.id)
    //       let data = {
    //         fb_id: post.id,
    //         message: post.message,
    //         picture: post.picture,
    //         attachments: post.attachments,
    //         description: post.description,
    //         created_time: post.created_time,
    //         source: post.source,
    //         story: post.story,
    //         likes: post.likes,
    //         fb_page : page,
    //       }
    //       FbPost.findOrCreate(data).then( (resp) => {
    //        console.log(resp)
    //       })
    //
    //     })
    //
    //   })
    //
    // })

    for (var p = 0, len = pages.length; p < len; p++) {

      console.log('fb_id of ' + p, pages[p].fb_id)

      let posts = await facebookService.getFeed(pages[p].fb_id)


      for (var i = 0, len = posts.length; i < len; i++) {
        console.log(posts[i])

        let data = {
          fb_id: posts[i].id,
          message: posts[i].message,
          picture: posts[i].picture,
          attachments: posts[i].attachments,
          description: posts[i].description,
          created_time: posts[i].created_time,
          source: posts[i].source,
          story: posts[i].story,
          likes: posts[i].likes,
          fb_page : pages[p],
        }

        console.log('Create post --> ')
        let postCreated = await FbPost.create(data)
        console.log('Created post', postCreated)
      }

    }
    // console.log('POSTS', posts)
  },



}
