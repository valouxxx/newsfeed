import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Coin from '@/components/Coin'
import CoinView from '@/components/CoinView'
import FacebookPage from '@/components/FacebookPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/coins',
      name: 'coins',
      component: Coin
    },
    {
      path: '/coin/:id',
      name: 'coin',
      component: CoinView
    },
    {
      path: '/facebookpages',
      name: 'facebookpages',
      component: FacebookPage
    }
  ]
})
