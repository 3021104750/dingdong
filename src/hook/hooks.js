import { ref } from '@vue/reactivity';
import { onActivated } from '@vue/runtime-core';
import { reactive } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { animateForMultipleDoms, throttle } from '@/api/plugins.js';
import { Toast } from 'vant';

/* 离开页面时记录下滚动条位置，再次激活页面时，页面回到之前滚动条位置 */
export const rememberScrollY = () => {
  let rememberScroll = ref(0);
  onActivated(() => {
    window.scrollTo(0, rememberScroll.value); // 页面重新激活时，获取且返回上一次滚动条位置
  });
  onBeforeRouteLeave((to, from, next) => {
    rememberScroll.value = window.scrollY; // 离开页面时，记录下当前滚动条位置
    next();
  });
};

/* 离开页面时，把所以 van-stepper-input 的值不是为 1 的，重置为 1 */
export const resetInputBefLeave = (inputList) => {
  onBeforeRouteLeave((to, from, next) => {
    for (let k in inputList) {
      if (inputList[k] !== 1) {
        inputList[k] = 1;
      }
    }
    next();
  });
};

/* 初始化 van-stepper-input-value
  @param  dataList：要传入的 category 的list
  @return 初始化 van-stepper-input 的值（reactive对象）
*/
export const initVanStepperInputValue = (dataList) => {
  let initVanStepperInput = reactive({}); // 初始化 van-stepper-input 的 v-model
  for (let i = 0; i < dataList.length; i++) {
    initVanStepperInput['input_' + i] = 1; // 循环遍历初始化每一个input为1，动态绑定变量
  }
  return initVanStepperInput;
};

/* 初始化 van-badge
  @param  dataList：要传入的 category 的list
  @return 初始化 van-badge 的值（reactive对象）
*/
export const initVanBadgeValue = (dataList) => {
  let initVanBadge = reactive({});// 初始化 van-badge 的 v-model
  for (let i = 0; i < dataList.length; i++) {
    initVanBadge['badge_' + i] = 0; // 循环遍历初始化每一个badge为0，动态绑定变量
  }
  return initVanBadge;
};

/* 添加购物车
  @param  id：物品id productId
          dataList：要传入的 category 的list
          initVanStepperInput：初始化van-stepper-input
          $store：vuex
*/
// export const addCartHook = (id, dataList, initVanStepperInput, category, $store) => {
export const addCartHook = throttle(function (id, dataList, initVanStepperInput, category, $store) {
  try {
    // 点击购物车按钮的动画
    animateForMultipleDoms('.van-button', 'bounceIn', id, '0.4s');
  } catch (err) {
    console.error(err);
  }
  // 添加时物品数量不能超过 9999，否则跳出提示
  if (initVanStepperInput['input_' + (id - 1)] > 9999) {
    Toast('物品数量不能超过9999！');
    initVanStepperInput['input_' + (id - 1)] = 9999; // 重置 van-stepper-input 值为 9999
    return false;
  }
  dataList[id - 1].productCount =
    initVanStepperInput['input_' + (id - 1)]; // 物品数量
  initVanStepperInput['input_' + (id - 1)] = 1; // 重置 van-stepper-input 值为 1
  dataList[id - 1].productCheckbox = true; // 物品的 checkbox 属性
  dataList[id - 1].productPriceAll = ''; // 物品总价
  dataList[id - 1].productFromCategory = category; // 物品来自于哪个分类
  $store.commit('Cart/addProduct', dataList[id - 1]); // 发送到 vuex
}, 400);

/* 判断下哪些物品打勾了，计算打勾的总价
  @param  cartList：购物车 list
          initCheckbox：购物车物品的复选框
  @return 购物车发勾物品总价
*/
export const getPriceAll = (cartList, initCheckbox) => {
  let priceAll = ref(0); // 打勾物品总价
  cartList.forEach((item, index) => {
    if (initCheckbox['checkbox_' + index] === true) {
      priceAll.value += Number(item.productPriceAll);
    }
  });
  // 因为 van-submit-bar 的值时自动去除小数点，并且是四位数，所以需要手动把价格去除小数点再拼接下
  let arr = [];
  let left = priceAll.value.toString().split('.')[0]; // 小数点左边
  let right = priceAll.value.toString().split('.')[1]; // 小数点右边
  arr.push(left);
  if (right !== undefined) {
    if (right.length === 1) {
      arr.push(right + '0'); // 小数点右边为一位时，后面补0
    } else if (right.length > 2) {
      arr.push(right.substring(0, 2)); // 小数点右边为大于2位时，防止浮点数混乱，规定只能两位数
    } else {
      arr.push(right);
    }
  };
  priceAll.value = Number(arr.join(''));
  return priceAll.value;
};

/* 判断下哪些物品打勾了，计算打勾的总数
  @param  cartList：购物车 list
          initCheckbox：购物车物品的复选框
  @return 购物车发勾物品总数
*/
export const getCountAll = (cartList, initCheckbox) => {
  let countAll = ref(0); // 打勾物品总数
  cartList.forEach((item, index) => {
    if (initCheckbox['checkbox_' + index] === true) {
      countAll.value += item.productCount;
    }
  });
  // css样式表单
  let styleSheets = document.styleSheets[document.styleSheets.length - 1];
  // 如果表单里有这个伪元素了，先清空再重新添加 insert 进去
  if (styleSheets.cssRules[0].selectorText === '.van-submit-bar__bar .van-button__text::after') {
    styleSheets.deleteRule(0);
  }
  // insert css样式
  styleSheets.insertRule(`.van-submit-bar__bar .van-button__text::after { content: '${countAll.value}'}`, 0);
  // 可查看 伪元素的值
  /* let btnText = document.querySelector('.van-submit-bar__bar .van-button__text');
  let pseudoElement = window.getComputedStyle(btnText, '::after');
  console.log(pseudoElement.content); */
};
