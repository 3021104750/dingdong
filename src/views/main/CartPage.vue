<template>
  <!-- van-empty -->
  <van-empty description="还未添加任何物品哦！" v-if="showEmpty">
    <van-button
      round
      type="danger"
      class="empty-button"
      @touchstart="touchEmptyButton"
      >去买菜</van-button
    >
  </van-empty>
  <!-- ul -->
  <ul class="cart-container" v-if="showCartContainer">
    <!-- li -->
    <li
      v-for="(item, index) in cartList"
      :key="item.productCartId"
      class="cart-container-li"
    >
      <!-- van-checkbox -->
      <van-checkbox
        v-model="initCheckbox['checkbox_' + index]"
        checked-color="#219142"
        @click="changeCheckbox(index)"
      ></van-checkbox>
      <!-- van-card -->
      <!-- 初次见面时，计算商品的总共价格 -->
      <van-card
        :price="
          (item.productPriceAll = (item.productCount * item.productPrice)
            .toFixed(2)
            .toString())
        "
        :desc="item.productInfo"
        :title="item.productTitle"
        :thumb="item.productImg"
        :lazy-load="true"
        class="van-card"
      >
        <!-- van-stepper 进步器 -->
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
            @change="changeVanStepperInput(item.productCartId, index)"
          />
        </template>
        <!-- 移除按钮 -->
        <template #num>
          <van-button
            round
            color="#219142"
            size="mini"
            style="z-index: 9"
            @touchstart="removeProduct(item.productCartId, index)"
            ><i class="icon-minus"></i>移除</van-button
          >
        </template>
      </van-card>
    </li>
  </ul>
  <!-- 底部提交订单 -->
  <van-submit-bar
    :price="priceAll"
    button-text="提交订单"
    :disabled="disabledCheckboxAll"
    @submit="onSubmit"
    style="margin-bottom: 2rem; background-color: #ebfff0"
  >
    <van-checkbox
      v-model="checkboxAll"
      :disabled="disabledCheckboxAll"
      checked-color="#219142"
      @click="changeCheckboxAll"
      >全选</van-checkbox
    >
    <template #tip v-if="showVanSubmitBarTip">
      <van-dropdown-menu direction="up">
        <van-dropdown-item title="请查看地址是否正确，修改地址！">
          <div class="address-item-list">
            <Address></Address>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </template>
  </van-submit-bar>
</template>

<script>
import { useStore } from 'vuex';
import {
  computed,
  nextTick,
  onActivated,
  reactive,
  ref
} from '@vue/runtime-core';
import { rememberScrollY, getPriceAll, getCountAll } from '@/hook/hooks.js';
import {
  animateForMultipleDoms,
  animateForSingleDom,
  debounceLater
} from '@/api/plugins.js';
import { useRouter } from 'vue-router';
import Address from '@/components/cartPage/Address.vue';
import { Toast } from 'vant';

export default {
  name: 'CartPage',
  components: { Address },
  setup() {
    const $router = useRouter();
    // 点击van-empty-button时，执行动画
    async function touchEmptyButton() {
      await animateForSingleDom('.empty-button', 'bounceIn', '0.4s')
        // 执行完动画后，再进行路由跳转，跳转到 vagetable category 页面
        .then((value) => {
          $router.push({
            path: '/categoryPage/vagetable',
            query: { categoryId: 1 }
          });
        })
        .catch((err) => {
          console.err(err);
        });
    }

    const $store = useStore();
    let cartList = computed(() => $store.state.Cart.cartList);

    let showEmpty = ref(false); // 是否显示空状态
    let showCartContainer = ref(true); // 是否显示购物车模块 van-card 用来每次激活页面的时候 重绘 使图片懒加载加载出来 否则图片不加载
    let showVanSubmitBarTip = ref(false); // 是否显示 van-submit-bar__tip 栏
    let initVanStepperInput = reactive({}); // 初始化 van-stepper-input

    // 每次激活页面时，查看cartList是否有值，有值则显示product，无值则显示提示
    onActivated(() => {
      if (cartList.value.length === 0) {
        showEmpty.value = true;
        nextTick(() => {
          animateForSingleDom('.empty-button', 'heartBeat', '0.6s');
        });
      } else {
        for (let i = 0; i < cartList.value.length; i++) {
          initVanStepperInput['input_' + i] = cartList.value[i].productCount; // 循环遍历初始化每一个input为1，动态绑定变量
        }
        showEmpty.value = false;
      }
      // 页面激活时 用来每次激活页面的时候 重绘 使图片懒加载加载出来 否则图片不加载
      showCartContainer.value = false;
      nextTick(() => {
        showCartContainer.value = true;
      });
    });

    // van-stepper-input 值改变时。（点击 van-stepper-plus 或 van-stepper-minus 或 van-stepper-input 值改变后）
    function changeVanStepperInput(id, idx) {
      if (initVanStepperInput['input_' + idx].toString().length > 4) {
        Toast.fail('数量不能超过9999');
      }
      let obj = {
        productCartId: id, // 当前哪一个 porductCartId
        productPrice: cartList.value[idx].productPrice, // 当前物品的价格
        productCount:
          initVanStepperInput['input_' + idx].toString().length > 4
            ? 9999
            : initVanStepperInput['input_' + idx] // 当前物品的数量
      };
      $store.commit('Cart/plusProduct', obj); // van-stepper-input数量改变后 把数据发给cart.js 修改购物车页面的信息

      let obj2 = {
        id: cartList.value[idx].productId, // 当前哪一个 porductCartId
        category: cartList.value[idx].productFromCategory,
        count:
          initVanStepperInput['input_' + idx].toString().length > 4
            ? 9999
            : initVanStepperInput['input_' + idx] // 点击后 当前物品的数量
      };
      $store.commit('PlusOrMinusProduct/getProduct', obj2); // van-stepper-input数量改变后 把数据发给plusOrMinusProduct.js 修改此物品category页面的badge数量

      // 判断下哪些物品打勾了，计算打勾的总价
      priceAll.value = getPriceAll(cartList.value, initCheckbox);
      // 判断下哪些物品打勾了，计算打勾的总数
      getCountAll(cartList.value, initCheckbox);
    }

    // 移除商品
    async function removeProduct(id, idx) {
      // 使用 await 先让动画做完，再进行接下来的操作
      try {
        await animateForMultipleDoms('.cart-container-li', 'flipOutX', idx + 1);
      } catch (err) {
        console.error(err.message);
      }

      cartList.value.some((item) => {
        if (item.productCartId === id) {
          // 发送信息给 removeProductCategory.js，存储删除物品的信息，以便在相应的 category 页面重置 badge 为 0
          $store.commit('RemoveProductCategory/getProduct', {
            id: item.productId,
            category: item.productFromCategory
          });
        }
      });
      $store.commit('Cart/removeProduct', id);

      if (cartList.value.length === 0) {
        showEmpty.value = true; // 当删除了最后一个物品后，显示 van-empty 提示
        showVanSubmitBarTip.value = false; // 当删除了最后一个物品后，显示 van-empty 提示
        nextTick(() => {
          animateForSingleDom('.empty-button', 'heartBeat', '0.6s'); // 显示提示的时候，执行动画
        });
        checkboxAll.value = false; // 最后一个物品删完后，重置checkboxAll 为 false
        disabledCheckboxAll.value = true; // 最后一个物品删完后，禁用checkboxAll
      }
      for (let i = 0; i < cartList.value.length; i++) {
        initVanStepperInput['input_' + i] = cartList.value[i].productCount; // 每次移除后都重置下数量，循环遍历再次初始化每一个input，动态绑定变量，如果不重置则会出现物品数量混乱
      }

      // 判断下哪些物品打勾了，计算打勾的总价
      priceAll.value = getPriceAll(cartList.value, initCheckbox);
      // 判断下哪些物品打勾了，计算打勾的总数
      getCountAll(cartList.value, initCheckbox);
    }

    let checkboxAll = ref(true); // 全选框
    let initCheckbox = reactive({}); // 物品单选框
    let disabledCheckboxAll = ref(true); // 是否禁用 全选框
    let priceAll = ref(0);
    // 在页面激活时，初始化物品的 checkbox
    onActivated(() => {
      for (let i = 0; i < cartList.value.length; i++) {
        initCheckbox['checkbox_' + i] = cartList.value[i].productCheckbox;
      }

      // 每次激活页面时，都查看下购物车是否为空，为空的话，全选按钮checkboxAll为false
      if (cartList.value.length === 0) {
        checkboxAll.value = false;
        disabledCheckboxAll.value = true;
      } else {
        disabledCheckboxAll.value = false;
        // 购物车不为空时，查看下购物车里的物品是否都打勾，是的话 checkboxAll为true，反之false
        if (Object.values(initCheckbox).every((item) => item === true)) {
          checkboxAll.value = true;
        } else {
          checkboxAll.value = false;
        }
        // 页面激活时，只要有一个物品打勾了，就要显示修改地址
        if (Object.values(initCheckbox).some((item) => item === true)) {
          showVanSubmitBarTip.value = true;
        }
      }

      // 激活页面时，判断下哪些物品打勾了，计算打勾的总价
      priceAll.value = getPriceAll(cartList.value, initCheckbox);
      // 判断下哪些物品打勾了，计算打勾的总数
      getCountAll(cartList.value, initCheckbox);
    });

    // 在点击每个物品的单选框时，查看如果所有物品都打勾了，checkboxAll为true，反之为false
    function changeCheckbox(index) {
      if (Object.values(initCheckbox).every((item) => item === true)) {
        checkboxAll.value = true;
      } else {
        checkboxAll.value = false;
        showVanSubmitBarTip.value = false; // 在点击每个物品的单选框时，物品都没打勾，就不显示修改地址
      }
      // 在点击每个物品的单选框时，只要有一个物品打勾了，就要显示修改地址
      if (Object.values(initCheckbox).some((item) => item === true)) {
        showVanSubmitBarTip.value = true;
      }
      // 每次点击单选框时，都要修改下他的protductCheckbox值
      $store.commit('Cart/changeProductCheckbox', index);
      // 判断下哪些物品打勾了，计算打勾的总价
      priceAll.value = getPriceAll(cartList.value, initCheckbox);
      // 判断下哪些物品打勾了，计算打勾的总数
      getCountAll(cartList.value, initCheckbox);
    }

    // 在点击全选，如果值为true时，购物车里商品的checkbox也都为true，反之都为false
    function changeCheckboxAll() {
      if (checkboxAll.value === true) {
        for (let i = 0; i < cartList.value.length; i++) {
          initCheckbox['checkbox_' + i] = true;
        }
        showVanSubmitBarTip.value = true; // 在点击全选，如果值为true时，显示修改地址
      } else {
        for (let i = 0; i < cartList.value.length; i++) {
          initCheckbox['checkbox_' + i] = false;
        }
        showVanSubmitBarTip.value = false; // 在点击全选，如果值为true时，显示修改地址
      }
      // 每次点击全选框时，要把所有物品的productCheckbox都要修改下
      $store.commit('Cart/changeProductCheckboxAll', checkboxAll.value);
      // 判断下哪些物品打勾了，计算打勾的总价
      priceAll.value = getPriceAll(cartList.value, initCheckbox);
      // 判断下哪些物品打勾了，计算打勾的总数
      getCountAll(cartList.value, initCheckbox);
    }

    const onSubmit = debounceLater(function () {
      try {
        animateForSingleDom(
          '.van-submit-bar__bar .van-button',
          'jello',
          '0.6s'
        );
        // 获取提交订单上的after伪元素值
        let btnText = document.querySelector(
          '.van-submit-bar__bar .van-button__text'
        );
        let pseudoElement = window.getComputedStyle(btnText, '::after');
        pseudoElement =
          pseudoElement.content.substring(1, pseudoElement.content.length - 1) -
          0;
        Toast.success(`${pseudoElement} 件商品\n下单成功`);
      } catch (err) {
        console.err(err);
      }
    }, 600);

    rememberScrollY(); // hook 记录离开时滚动条位置，激活页面时返回其位置

    return {
      touchEmptyButton,
      cartList,
      showEmpty,
      showCartContainer,
      showVanSubmitBarTip,
      disabledCheckboxAll,
      initVanStepperInput,
      changeVanStepperInput,
      removeProduct,
      checkboxAll,
      initCheckbox,
      priceAll,
      changeCheckbox,
      changeCheckboxAll,
      onSubmit
    };
  }
};
</script>

<style lang="less" scoped>
.cart-container {
  margin-bottom: 3.16rem;
  .cart-container-li {
    display: flex;
    align-items: center;
    .van-checkbox {
      flex: 1;
      padding-left: 0.4rem;
    }
    .van-card {
      flex: 10;
      margin-top: 0rem;
      padding-left: 0rem;
      background-color: #fff;
    }
  }
}

.van-card {
  /deep/ .van-button__text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8rem;
    .icon-minus {
      margin-right: 0.2rem;
    }
    .icon-minus:before {
      content: '\ea0b';
    }
  }
}

/deep/ .van-submit-bar__tip {
  padding: 0.1rem 0.15rem;
}
/deep/ .van-submit-bar__bar .van-button__content {
  position: relative;
  .van-button__text::after {
    position: absolute;
    top: -0.45rem;
    right: -0.7rem;
    display: inline-block;
    // content: '0';
    width: fit-content;
    height: 0.656rem;
    background-color: #ee0a49;
    border: 0.04rem solid #fff;
    border-radius: 0.656rem;
    padding: 0.04rem 0.22rem;
    z-index: 20;
  }
}

/deep/ .van-dropdown-menu__bar {
  height: 0.56rem;
  padding: 0.2rem 0;
  .van-dropdown-menu__item {
    justify-content: left;
  }
  .van-dropdown-menu__title {
    font-size: 0.48rem;
    &:after {
      border-color: transparent transparent #219142 #219142;
    }
  }
  .van-dropdown-menu__title--active::after {
    border-color: transparent transparent #ee0a24 #ee0a24;
  }
}
</style>
