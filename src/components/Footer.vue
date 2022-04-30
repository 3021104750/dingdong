<template>
  <van-row class="vant-row">
    <van-col
      span="6"
      justify="center"
      align="center"
      v-for="(item, index) in arr"
      :key="item.id"
      @touchstart="setAnimationForVanCol(item.id)"
    >
      <van-badge
        :content="initVanBadgeValue['badge_' + index]"
        max="99"
        :show-zero="false"
        :offset="['-1.36rem', '0.12rem']"
      >
        <router-link :to="item.link" active-class="page-active-class"
          ><i :class="`${item.icon} i-icon`"></i
          ><span>{{ item.pageName }}</span>
          <div class="small-strip"></div
        ></router-link>
      </van-badge>
    </van-col>
  </van-row>
</template>

<script>
import { animateForMultipleDoms } from '@/api/plugins.js';
import { markRaw, reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
export default {
  name: 'Footer',
  setup() {
    let arr = markRaw([
      { pageName: '首页', link: '/homePage', icon: 'icon-home', id: 1 },
      { pageName: '分类', link: '/categoryPage', icon: 'icon-map', id: 2 },
      { pageName: '购物车', link: '/cartPage', icon: 'icon-cart', id: 3 },
      { pageName: '我的', link: '/myPage', icon: 'icon-user', id: 4 }
    ]);

    // 点击首页，分类，购物车，我的，执行动画
    async function setAnimationForVanCol(id) {
      try {
        animateForMultipleDoms('.i-icon', 'swing', id, '0.6s');
        animateForMultipleDoms('.small-strip', 'rotateInUpLeft', id, '0.4s');
      } catch (err) {
        console.error(err);
      }
    }

    // 初始化 badge 的值为 0
    let initVanBadgeValue = reactive({});
    for (let i = 0; i < arr.length; i++) {
      initVanBadgeValue['badge_' + i] = 0;
    }

    const $route = useRoute();
    const $store = useStore();
    let cartList = computed(() => $store.state.Cart.cartList); // 获取购物车 list
    // 监听购物车，如果物品的数量更新了，则也更新 badge 的值
    watch(cartList.value, (newValue) => {
      let allCount = ref(0);
      newValue.forEach((item) => {
        allCount.value += item.productCount;
      });
      // 如果点击购物车里的加号减号删除按钮时，物品数量更新且在路由 cartPage 页面的时候，则不显示 badge 的值，反之显示
      if ($route.path === '/cartPage') {
        initVanBadgeValue['badge_' + 2] = 0;
      } else {
        initVanBadgeValue['badge_' + 2] = allCount.value;
      }

      // 当进入 路由 cartPage 页面的时候，不显示 badge，其他页面时，显示 badge
      watch(
        () => $route.path,
        (newValue, oldValue) => {
          if (newValue === '/cartPage') {
            initVanBadgeValue['badge_' + 2] = 0;
          } else {
            initVanBadgeValue['badge_' + 2] = allCount.value;
          }
        }
      );
    });

    return {
      arr,
      setAnimationForVanCol,
      initVanBadgeValue
    };
  }
};
</script>

<style lang="less" scoped>
.vant-row {
  background-color: #fff;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3.75rem;
    height: 2rem;
    font-size: 0.48rem;
    color: #333;
    i {
      font-size: 0.85rem;
      color: #aaa;
    }
    span {
      margin: 0.16rem 0 0.04rem 0;
    }
  }

  .icon-home:before {
    content: '\e900';
  }
  .icon-map:before {
    content: '\e94b';
  }
  .icon-cart:before {
    content: '\e93a';
  }
  .icon-user:before {
    content: '\e971';
  }

  .page-active-class {
    background-color: #eee;
    i {
      color: #219142;
    }
    .small-strip {
      width: 1rem;
      height: 0.08rem;
      background-color: #219142;
    }
  }
}
</style>
