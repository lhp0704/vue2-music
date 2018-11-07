import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend'
import TopList from '@/pages/top-list'
import Singer from '@/pages/singer'
import SingerDetail from '@/pages/singer-detail'
import Search from '@/pages/search'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/toplist',
      component: TopList
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
