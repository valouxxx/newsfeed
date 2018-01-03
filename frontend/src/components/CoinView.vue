<template>
  <div>

    <h1>
      <!--{{ coin.name }}-->
    </h1>



    <div class="ui two column grid">
      <div class="column">
        <div class="ui card">
          <div class="content">

            <span class="right floated destroy-button" @click="destroy(coin)">
              <i class="window close red icon"></i>
            </span>

            <p class="header">
              <span @click="displayDetails(coin.id)">
                {{ coin.name }}
              </span>
            </p>

            <div class="ui form">
              <div class="field">
                <label>CODE</label>
                <input type="text" v-model="coin.code">
              </div>
              <div class="field">
                <label>FB PAGE</label>
                {{ coinFbPage.name}}
                <select v-model="coinFbPage">
                  <option
                    v-for="fbPage in this.fbPages"
                    v-bind:value="fbPage">
                    {{ fbPage.username }}
                  </option>

                </select>
                <!--<input type="text" v-model="coinFbPage.name">-->
              </div>
            </div>

          </div>
          <div class="extra content">

            <button class="ui button" @click="update(coin)">Update</button>

          </div>
        </div>
      </div>
    </div>


    <div>
      <h4 class="ui horizontal divider header">

       FB PAGE
      </h4>
      <div class="ui items">
        <div class="item">
          <div class="image">
            <!--<img v-bind:src="coinFbPage.picture.data.url">-->
          </div>
          <div class="content">
            <a class="header">{{ coinFbPage.name }}</a>
            <i>{{ coinFbPage.username }}</i>
            <div class="extra">
              <button class="ui button">{{ coinFbPage.fan_count }} Fans</button>
            </div>
            <div class="meta">
              <span>About </span>
            </div>
            <div class="description">
              <p>{{ coinFbPage.about }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ui feed">
        <div class="event" v-for="post in this.fbPageFeed">
          <div class="label">
            <img src="/images/avatar/small/joe.jpg">
          </div>
          <div class="content">
            <div class="summary">
              <a>{{ coinFbPage.name }}</a> {{ coinFbPage.story }}
              <div class="date">
               {{ coinFbPage.created_time }}
              </div>
            </div>
            <div class="extra text">
              {{ post.message }}
            </div>
            <div class="meta">
              <a class="like">
                <i class="like icon"></i> {{ post.likes }}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>


</template>


<script>
  export default {
    data () {
      return {
        coin: '',
        coinFbPage: '',
        fbPagePicture: '',
        selectFbPage: '',
        slug: '',
        code: '',
        fb_page: '',
        fbPageChecked: '',
        fbPages: [],
        fbPageFeed: '',
        selected: ''
      }
    },
    mounted () {
      this.getCoin()
      this.getFbPages()
    },
    methods: {
      // GET COIN
      getCoin () {
        this.$http.get(this.local.server_url + '/coin/' + this.$route.params.id).then((resp) => {
          this.coin = resp.data

          // Fb page
          if (this.coin.fb_page) {
            this.selected = this.coin.fb_page
            if (this.coin.fb_page.status) {
              this.fbPageChecked = true
            } else {
              this.fbPageChecked = false
            }
            console.log(this.coin.fb_page.status)
            this.coinFbPage = this.coin.fb_page

            // Get Fb page on facebook
            this.$http.get(this.local.server_url + '/fbpage/' + this.coin.fb_page.id).then((resp) => {
              this.fb_page = resp.data

              this.fbPagePicture = this.fb_page.picture.data.url
              // Get Fb page Feed
              this.getPosts(this.fb_page.id)
              console.log('Fb page success', resp)
            }, (resp) => {
              console.log('Error get Fb page', resp)
            })
          }
        }, (resp) => {
          console.log('Get error', resp)
        })
      },

      // GET FB PAGE
      // used for select menu
      getFbPages () {
        this.$http.get(this.local.server_url + '/fbpage/').then((resp) => {
          this.fbPages = resp.data
        }, (resp) => {
          console.log('Get error', resp)
        })
      },

      // UPDATE
      update (coin) {
        console.log(this.coinFbPage)
        this.$http.put(this.local.server_url + '/coin/' + coin.id, {
          name: coin.name,
          code: coin.code,
          fb_page: this.coinFbPage
        }).then((resp) => {
          console.log('Updated', resp)
          this.getCoin()
        }, (resp) => {
          console.log('error update', resp)
        })
      },

      // UPDATE FB PAGE
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
      // },

      getPosts (fbPageId) {
        this.$http.get(this.local.server_url + '/fbpage/' + fbPageId + '/posts').then((resp) => {
          console.log('Get posts')
          this.fbPageFeed = resp.data
          console.log(this.fbPageFeed)
        }, (resp) => {
          console.log('Get error', resp)
        })
      }
    }
  }
</script>
