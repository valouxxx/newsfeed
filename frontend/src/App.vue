
<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Newsfeed</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Newsfeed</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/facebookpages" @click.native="hideMenu">Fb Pages</router-link>
        <router-link class="mdl-navigation__link" to="/coins" @click.native="hideMenu">Coins</router-link>
      </nav>
    </div>
    <main class="">

      <!-- <div v-for="entity in this.entities">
        {{ entity.name }}
      </div> -->


      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  require('material-design-lite')
  export default {
    name: 'app',
    data () {
      return {
        'entities': [] // this.entities
        // [{'name': 'market'}, {'name': 'market2'}]
      }
    },
    mounted () {
      // this.$http.get('http://localhost:1337/entities').then((resp) => {
      //   console.log('success', resp)
      //   this.entities = resp.data
      // }, (resp) => {
      //   console.log('erreur', resp)
      // })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    margin-top: 40px;
    padding-top: 20px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  .page-content{
    padding : 20px;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
</style>
