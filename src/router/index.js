import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/index'

/**
 * redirect 重定向
 * name 路由名称
 * meta 元信息
 * requireLogin 如果为true需要登录之后显示跳转
 * external 如果为true是外部链接
 */
export const navRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页' },
      },
      {
        //path: 'http://localhost:9001/admin',
        // path: 'https://tech.taiji.com.cn/admin/',
        path: 'http://192.168.99.76:8081',
        meta: {
          title: '后台管理',
          external: true,
          requireLogin: true,
          requireAdmin: true,
        },
      },
      {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/blog/index'),
        redirect: { name: 'blogList' },
        meta: { title: '博客' },
        children: [
          {
            path: 'list',
            name: 'blogList',
            component: () => import('@/views/blog/BlogList'),
            meta: { title: '博客列表' },
          },
          // {
          //   path: 'view/:id',
          //   name: 'blogView',
          //   component: () => import('@/views/blog/BlogView'),
          //   meta: { title: '博客详情' },
          // },
          // {
          //   path: '/community/blogShow',
          //   name: 'community',
          //   component: () => import('@/views/blog/BlogViewOld'),
          //   meta: { title: '博客详情' },
          // },
        ],
      },
      {
        path: '/forum',
        name: 'forum',
        component: () => import('@/views/forum/index'),
        meta: { title: '讨论组' },
        redirect: { name: 'forumList' },
        children: [
          {
            path: 'list',
            name: 'forumList',
            component: () => import('@/views/forum/ForumList'),
            meta: { title: '讨论组列表' },
          },
          // {
          //   path: 'view/:id',
          //   name: 'forumView',
          //   component: () => import('@/views/forum/ForumView'),
          //   meta: { title: '讨论组详情' },
          // },
          // {
          //   path: 'postView/:id',
          //   name: 'forumPostView',
          //   component: () => import('@/views/forum/PostView'),
          //   meta: { title: '帖子详情' },
          // },
        ],
      },
      {
        path: '/faq',
        name: 'faq',
        component: () => import('@/views/faq/index'),
        meta: { title: '问答' },
        redirect: { name: 'faqList' },
        children: [
          {
            path: 'list',
            name: 'faqList',
            component: () => import('@/views/faq/FaqList'),
            meta: { title: '问答列表' },
          },
          // {
          //   path: 'view/:id',
          //   name: 'faqView',
          //   component: () => import('@/views/faq/FaqView'),
          //   meta: { title: '问答详情' },
          // },
          // {
          //   path: 'guide',
          //   name: 'faqGuide',
          //   component: () => import('@/views/faq/FaqGuide'),
          //   meta: { title: '问答指引' },
          // },
        ],
      },
      {
        path: '/share',
        redirect: '/share/list',
        name: 'share',
        component: () => import('@/views/share/index'),
        meta: { title: '成果共享' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/share/ShareList'),
          },
          // {
          //   path: 'view/:id',
          //   component: () => import('@/views/share/ShareView'),
          // },
        ],
      },
      {
        path: 'http://repo.taiji.com.cn/',
        meta: { title: '开发资源', external: true },
      },
      {
        path: 'http://gitlab.taiji.com.cn/',
        meta: { title: '开源项目', external: true },
      },
      {
        path: '/mall',
        redirect: '/mall/list',
        name: 'mall',
        component: () => import('@/views/mall/index'),
        meta: { title: '积分商城', requireLogin: true },
        children: [
          {
            path: 'list',
            component: () => import('@/views/mall/MallList'),
            meta: { title: '商品列表', requireLogin: true },
          },
          // {
          //   path: 'view/:id',
          //   component: () => import('@/views/mall/MallView'),
          //   meta: { title: '商品购买', requireLogin: true },
          // },
          // {
          //   path: 'history',
          //   component: () => import('@/views/mall/MallHistory'),
          //   meta: { title: '购买历史', requireLogin: true },
          // },
        ],
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人中心', requireLogin: true },
      },
    ],
  },
]

const routerMap = [...navRouter]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap,
})
