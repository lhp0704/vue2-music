import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend'
import TopList from '@/views/top-list'
import Singer from '@/views/singer'
import SingerDetail from '@/views/singer-detail'
import Search from '@/views/search'

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
