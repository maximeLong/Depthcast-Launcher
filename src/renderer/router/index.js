import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: require('@/views/Landing').default,
      beforeEnter: (to, from, next) => {
        //force the user to update page if installation is needed
        store.state.Executables.needsInstallation ? next('/update') : next();
      }
    },
    {
      path: '/discord',
      name: 'discord',
      component: require('@/views/Discord').default
    },
    {
      path: '/update',
      name: 'update',
      component: require('@/views/Update').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
