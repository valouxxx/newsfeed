<template>
  <div class="coins">

    <h1>HELLO</h1>

    <div class="ui one column grid">
      <div class="column">
        <div class="ui form">

          <h4 class="ui dividing header">
            Add a coin
          </h4>

          <div class="field">
            <label>Name</label>
            <input type="text" v-model="name">
          </div>

          <div class="field">
            <label>Code</label>
            <input type="text" v-model="code">
          </div>

          <div class="field">
            <label>Fb Page</label>
            <input type="text" v-model="fb_page_name">
          </div>

          <div class="extra content">
            <button class="ui button" @click="create()">Create</button>
          </div>
        </div>
      </div>
    </div>


    <table class="ui sortable celled table">
      <thead>
      <tr>
        <th class="sorted ascending">Name</th>
        <th class="">Code</th>
        <th class="">Fb_page</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>


      <tr v-for="coin in this.coins">
        <td>{{ coin.name }}</td>
        <td class="positive">{{ coin.code }}</td>
        <td class="warning">
          <!--{{ coin.fb_page.name }}-->
        </td>
        <td>{{ coin.status }}</td>
      </tr>


      </tbody>
    </table>
    <div class="ui three column grid">
      <div class="column" v-for="coin in this.coins">
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
                <!--<input type="text" v-model="coin.fb_page.name">-->
              </div>
            </div>

          </div>
          <div class="extra content">

            <button class="ui button" @click="update(coin)">Update</button>

          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'coin',
    data () {
      return {
        coins: [],
        name: '',
        code: '',
        fb_page_name: ''
      }
    },
    mounted () {
      this.$http.get(this.local.server_url + '/coin').then((resp) => {
        console.log('Get success', resp)
        this.coins = resp.data
      }, (resp) => {
        console.log('Get error', resp)
      })
    },
    methods: {
      displayDetails (id) {
        this.$router.push({name: 'coin', params: {id: id}})
      },
      // UPDATE
      update (coin) {
        this.$http.put(this.local.server_url + '/coin/' + coin.id, {
          name: coin.name,
          code: coin.code,
          fb_page_name: coin.fb_page.name
        }).then((resp) => {
          console.log('Updated', resp)
        }, (resp) => {
          console.log('error update', resp)
        })
      },

      // CREATE
      create () {
        this.$http.post(this.local.server_url + '/coin', {
          name: this.name,
          code: this.code,
          fb_page: this.fb_page_name
        }).then((resp) => {
          this.$http.get(this.local.server_url + '/coin').then((resp) => {
            console.log('Get success', resp)
            this.coins = resp.data
          }, (resp) => {
            console.log('Get error', resp)
          })
        }, (resp) => {
          console.log('error created', resp)
        })
      },
      destroy (coin) {
        this.$http.delete(this.local.server_url + '/coin/' + coin.id).then((resp) => {
          console.log('Delete success', resp)
          this.$http.get(this.local.server_url + '/coin').then((resp) => {
            console.log('Get success', resp)
            this.coins = resp.data
          }, (resp) => {
            console.log('Get error', resp)
          })
        }, (resp) => {
          console.log('Delete error', resp)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }

  .destroy-button {
    cursor: pointer;
  }
</style>
