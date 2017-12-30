import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Coin from '@/components/Coin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/coin',
      name: 'coin',
      component: Coin
    }
  ]
})
