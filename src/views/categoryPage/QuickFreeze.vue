<template>
  <ul class="quickfreeze-container">
    <li v-for="(item, index) in dataList" :key="item.productId">
      <van-card
        :price="item.productPrice"
        :desc="item.productInfo"
        :title="item.productTitle"
        :thumb="item.productImg"
        :lazy-load="true"
      >
        <template #tags>
          <van-stepper
            v-model="initVanStepperInput['input_' + index]"
            theme="round"
            input-width="1.5rem"
            button-size="0.7rem"
            style="margin: 0.4rem 0rem 0.8rem"
            integer
            min="1"
            max="9999"
            :long-press="false"
          />
        </template>
        <template #num>
          <van-badge
            :content="initVanBadge['badge_' + index]"
            max="99"
            :show-zero="false"
          >
            <van-button
              round
              color="#219142"
              size="mini"
              @touchstart="addCart(item.productId)"
              ><i class="icon-plus"></i>购物车</van-button
            >
          </van-badge>
        </template>
      </van-card>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onActivated } from '@vue/runtime-core';
import {
  resetInputBefLeave,
  rememberScrollY,
  initVanStepperInputValue,
  initVanBadgeValue,
  addCartHook
} from '@/hook/hooks.js';

export default {
  name: 'QuickFreeze',
  setup() {
    const $store = useStore();
    $store.commit('QuickFreeze/initDataList');
    let dataList = computed(() => $store.state.QuickFreeze.dataList);
    let cartList = computed(() => $store.state.Cart.cartList);

    let initVanStepperInput = initVanStepperInputValue(dataList.value); // 初始化 van-stepper-input-value
    let initVanBadge = initVanBadgeValue(dataList.value); // 初始化 van-badge

    onActivated(() => {
      /*
        一下方法去更新badge的值比较繁琐和笨拙，其实可以使用 watch 的方法去监听 badge 是否变化，
        如果变化的话，就去更新 badge 的值，watch 方法简单的很且代码少，不需要利用vuex去传递值，
        watch 方法当时在写的时候并没有第一时间想到，而是采用了传统的vuex传递值的，在页面激活时去更新 badge 的方法。
        所以一下方法略显笨拙，sorry呀！！！！！！
      */
      // 在 vuex 里获取此分类里的哪个物品被添加了数量
      let plusOrMinusProductId = computed(
        () => $store.state.PlusOrMinusProduct.plusOrMinusProductId.quickFreeze
      );
      plusOrMinusProductId.value.forEach((item) => {
        initVanBadge['badge_' + (item.id - 1)] = item.count; // 把购物车里添加的物品数量van-badge修改下
      });
      $store.commit('PlusOrMinusProduct/clearProduct', 'quickFreeze'); // 重置完后，清空vuex里数据

      // 在 vuex 里获取此分类里的哪个物品被移除了购物车
      let removeProductId = computed(
        () => $store.state.RemoveProductCategory.removeProductId.quickFreeze
      );
      removeProductId.value.forEach((item) => {
        initVanBadge['badge_' + (item - 1)] = 0; // 把购物车里移除的物品van-badge重置为0
      });
      $store.commit('RemoveProductCategory/clearProduct', 'quickFreeze'); // 重置完后，清空vuex里数据
    });

    async function addCart(id) {
      // 每次添加到购物车前，查看当前物品是否已经添加过，如果为false，则没有添加过，需要将其productId推进productInCart记录下来，以便用页面在此激活时重制van-stepper-input为1
      addCartHook(
        id,
        dataList.value,
        initVanStepperInput,
        'quickFreeze',
        $store
      ); // 添加购物车
      // 每次添加后，查看购物车里此物品的添加数量，赋值给 van-badge
      cartList.value.some((item) => {
        if (
          item.productId === id &&
          item.productTitle === dataList.value[id - 1].productTitle
        ) {
          initVanBadge['badge_' + (id - 1)] = item.productCount;
        }
      });
    }

    resetInputBefLeave(initVanStepperInput); // 离开页面时，把所以 van-stepper-input 的值不是为 1 的，重置为 1
    rememberScrollY(); // hook 记录离开时滚动条位置，激活页面时返回其位置

    return {
      dataList,
      initVanStepperInput,
      initVanBadge,
      addCart
    };
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.8rem;
  .icon-plus {
    margin-right: 0.2rem;
  }
  .icon-plus:before {
    content: '\ea0a';
  }
}
</style>
