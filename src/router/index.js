import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/homePage'
  },

  // HomePage
  {
    path: '/homePage',
    name: 'HomePage',
    component: () => import('@/views/main/HomePage.vue')
  },

  // CategoryPage
  {
    path: '/categoryPage',
    name: 'CategoryPage',
    redirect: '/categoryPage/vagetable',
    component: () => import('@/views/main/CategoryPage.vue'),
    children: [
      {
        path: 'vagetable',
        name: 'Vagetable',
        component: () => import('@/views/categoryPage/Vagetable.vue')
      }, {
        path: 'meat',
        name: 'Meat',
        component: () => import('@/views/categoryPage/Meat.vue')
      }, {
        path: 'bean',
        name: 'Bean',
        component: () => import('@/views/categoryPage/Bean.vue')
      }, {
        path: 'milk',
        name: 'Milk',
        component: () => import('@/views/categoryPage/Milk.vue')
      }, {
        path: 'seafood',
        name: 'Seafood',
        component: () => import('@/views/categoryPage/Seafood.vue')
      }, {
        path: 'quickfreeze',
        name: 'QuickFreeze',
        component: () => import('@/views/categoryPage/QuickFreeze.vue')
      }, {
        path: 'fruit',
        name: 'Fruit',
        component: () => import('@/views/categoryPage/Fruit.vue')
      }, {
        path: 'marinating',
        name: 'Marinating',
        component: () => import('@/views/categoryPage/Marinating.vue')
      }, {
        path: 'condiments',
        name: 'Condiments',
        component: () => import('@/views/categoryPage/Condiments.vue')
      }, {
        path: 'snack',
        name: 'Snack',
        component: () => import('@/views/categoryPage/Snack.vue')
      }, {
        path: 'alcohol',
        name: 'Alcohol',
        component: () => import('@/views/categoryPage/Alcohol.vue')
      }, {
        path: 'daily',
        name: 'Daily',
        component: () => import('@/views/categoryPage/Daily.vue')
      }
    ]
  },

  // CartPage
  {
    path: '/cartPage',
    name: 'CartPage',
    component: () => import('@/views/main/CartPage.vue')
  },

  // MyPage
  {
    path: '/myPage',
    name: 'MyPage',
    component: () => import('@/views/main/MyPage.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  base: 'dingdongya',
  routes
});

export default router;
