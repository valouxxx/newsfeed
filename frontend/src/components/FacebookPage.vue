<template>
  <div>

    <h1>
      FB PAGES
    </h1>



    <div class="ui two column grid">
      <div class="column">
        <div class="ui card">
          <div class="content">

            <div class="ui search">
              <div class="ui icon input">
                <input v-model="fbPageUsername" class="prompt" placeholder="Fb Page username..." type="text">

                <i class="search icon"></i>
              </div>
              <button class="ui button" @click="search(fbPageUsername)">Go</button>
              <div class="results"></div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="ui items">
      <div class="item">
        <div class="image">
          <img v-bind:src="resultPicture">
        </div>
        <div class="content">
          <a class="header">{{ result.name }}</a>
          <i>{{ result.username }}</i>
          <div class="meta">
            <span>About </span>
          </div>
          <div class="extra">
            <button class="ui button" @click="createPage(result.username)">Save Fb Page</button>
          </div>
          <div class="description">
            <p>{{ result.about }}</p>
          </div>
        </div>
      </div>
    </div>

    <table class="ui sortable celled table">
      <thead>
      <tr>

        <th class="">Pic</th>
        <th class="">Name</th>
        <th class="">Username</th>
        <th class="">Link</th>
        <th>Fans</th>
        <th>Website</th>
        <th>Status</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>


      <tr v-for="fbPage in this.fbPages">

        <td>
          <img v-bind:src="fbPage.picture.data.url">
        </td>
        <td>{{ fbPage.name }}</td>
        <td>{{ fbPage.username }}</td>
        <td>{{ fbPage.link }}</td>
        <td>{{ fbPage.fan_count }}</td>
        <td>{{ fbPage.website }}</td>
        <td>{{ fbPage.status }}</td>
        <td>
          <span class="right floated destroy-button" @click="destroyPage(fbPage)">
            <i class="window close red icon"></i>
          </span>
        </td>
      </tr>


      </tbody>
    </table>

  </div>


</template>


<script>
  export default {
    data () {
      return {
        fbPages: [],
        fbPageUsername: 'bitcoinchart',
        result: '',
        resultPicture: ''
      }
    },
    mounted () {
      this.getFbPages()
    },
    methods: {
      // GET FB PAGE
      getFbPages () {
        this.$http.get(this.local.server_url + '/fbpage/').then((resp) => {
          this.fbPages = resp.data
        }, (resp) => {
          console.log('Get error', resp)
        })
      },

      // SEARCH
      search (fbPageUsername) {
        this.$http.get(this.local.server_url + '/fbpage/search/' + this.fbPageUsername).then((resp) => {
          this.result = resp.data
          this.resultPicture = this.result.picture.data.url
        }, (resp) => {
          console.log('error search', resp)
        })
      },

      // DESTROY PAGE
      destroyPage (fbPage) {
        this.$http.delete(this.local.server_url + '/fbpage/' + fbPage.id).then((resp) => {
          this.getFbPages()
        }, (resp) => {
          console.log('Delete error', resp)
        })
      },

      // CREATE FB PAGE
      createPage (name) {
        this.$http.post(this.local.server_url + '/fbpage/' + name).then((resp) => {
          this.getFbPages()
          console.log('created')
        }, (resp) => {
          console.log('Create error', resp)
        })
      }
      // // UPDATE FB PAGE
      // updateFbPage (fbPage) {
      //   console.log(this.fbPageChecked)
      //
      //   let status = this.fbPageChecked ? 'active' : 'inactive'
      //
      //   this.$http.put(this.local.server_url + '/fbpage/' + this.coin.fb_page.id, {
      //     fb_id: this.fb_page.id,
      //     fb_name: this.fb_page.name,
      //     status: status
      //   }).then((resp) => {
      //     console.log('Updated Fb page', resp)
      //   }, (resp) => {
      //     console.log('Error update Fb Page', resp)
      //   })
      // }
    }
  }
</script>
