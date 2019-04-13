import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: require('@/views/Discord').default
    },
    {
      path: '/discord',
      name: 'landing',
      component: require('@/views/Discord').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
