<template>
  <van-tabs
    v-model:active="active"
    shrink
    lazy-render
    title-active-color="#219142"
    color="#219142"
    style="z-index: 99; position: sticky; top: 4.24rem"
  >
    <van-tab
      v-for="item in categoryList"
      :key="item.categoryId"
      :title="item.categoryName"
      :to="{
        path: item.categoryRouterPath,
        query: { categoryId: item.categoryId }
      }"
    >
    </van-tab>
  </van-tabs>
  <!-- 路由view -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="categoryComponment">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script>
import { markRaw, ref } from '@vue/reactivity';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { computed, onActivated, watch } from '@vue/runtime-core';
import { detectBackOrForward } from '@/api/plugins.js';

export default {
  name: 'CategoryPage',
  setup() {
    // router-view keepAlive 的组件的名字
    const categoryComponment = markRaw([
      'Vagetable',
      'Meat',
      'Bean',
      'Milk',
      'Seafood',
      'QuickFreeze',
      'Fruit',
      'Marinating',
      'Condiments',
      'Snack',
      'Alcohol',
      'Daily'
    ]);

    // 分类信息
    const categoryList = markRaw([
      {
        categoryRouterPath: '/categoryPage/vagetable',
        categoryId: 1,
        categoryName: '蔬菜'
      },
      {
        categoryRouterPath: '/categoryPage/meat',
        categoryId: 2,
        categoryName: '肉类'
      },
      {
        categoryRouterPath: '/categoryPage/bean',
        categoryId: 3,
        categoryName: '豆制'
      },
      {
        categoryRouterPath: '/categoryPage/milk',
        categoryId: 4,
        categoryName: '乳制'
      },
      {
        categoryRouterPath: '/categoryPage/seafood',
        categoryId: 5,
        categoryName: '海鲜'
      },
      {
        categoryRouterPath: '/categoryPage/quickfreeze',
        categoryId: 6,
        categoryName: '速冻'
      },
      {
        categoryRouterPath: '/categoryPage/fruit',
        categoryId: 7,
        categoryName: '水果'
      },
      {
        categoryRouterPath: '/categoryPage/marinating',
        categoryId: 8,
        categoryName: '卤制'
      },
      {
        categoryRouterPath: '/categoryPage/condiments',
        categoryId: 9,
        categoryName: '调味'
      },
      {
        categoryRouterPath: '/categoryPage/snack',
        categoryId: 10,
        categoryName: '零食'
      },
      {
        categoryRouterPath: '/categoryPage/alcohol',
        categoryId: 11,
        categoryName: '酒类'
      },
      {
        categoryRouterPath: '/categoryPage/daily',
        categoryId: 12,
        categoryName: '日用'
      }
    ]);

    const $route = useRoute();
    const $router = useRouter();
    const getQuery = computed(() => $route.query); // 获取路由 query 值
    const active = ref(getQuery.value.categoryId - 1); // van-tabs active 值，动态获取路由传过来的query值

    let lastQuery = ref(0);
    onActivated(() => {
      if (getQuery.value.categoryId === undefined) {
        // 如果 query 值为空的话, 也就是说不是通过路由路径切换到页面的话，就获取上一次离开页面时保存的 active 值
        active.value = lastQuery.value;
        // 遍历查询与 active 值相同的 index，获取其页面的路由路径，再跳转路径
        categoryList.some((item, index) => {
          if (index === active.value) {
            $router.push({
              path: item.categoryRouterPath,
              query: { categoryId: item.categoryId }
            });
          }
        });
      } else {
        // 如果 query 里有值的话，就直接用其 query 值，使 active 值更新
        active.value = getQuery.value.categoryId - 1;
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      lastQuery.value = active.value; // 离开时 记录下当前激活的页面 actve 值
      next();
    });

    // 监听路由变化，记录下上次路由页面的 query，获取 categoryId，查看是哪个category
    let activeOldValue = ref(0);
    watch($route, (newValue, oldValue) => {
      let oldQuery = computed(() => oldValue.query);
      activeOldValue.value = oldQuery.value.categoryId - 1;
    });
    // 监听用户是否点击了后退或者前进按钮
    detectBackOrForward(function () {
      active.value = activeOldValue.value; // 把前些贮存的旧的 category 值赋值给 active
    });

    return {
      active,
      categoryComponment,
      categoryList
    };
  }
};
</script>

<style lang="less" scoped>
</style>
