<template>
  <div class="hello">
    <h1></h1>
    <h2>COI?</h2>
    <p>{{ coin }}</p>

  </div>
</template>

<script>
  export default {
    name: 'coin',
    data () {
      return {
        coin: []
      }
    },
    mounted () {
      this.$http.get(this.local.server_url + '/coin').then((resp) => {
        console.log('success', resp)
        this.coin = resp.data
      }, (resp) => {
        console.log('erreur', resp)
      })
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
</style>
