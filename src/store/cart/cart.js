export default {
  namespaced: true,
  state: {
    cartList: [] // 购物车 list
  },
  mutations: {
    // 添加购物车物品
    addProduct(state, value) {
      let repeatProduct = false;
      state.cartList.some(item => {
        // 判断product是否已经存在购物车 如果存在则product数量相加
        if (item.productId === value.productId && item.productTitle === value.productTitle) {
          repeatProduct = true;
          item.productCount += value.productCount;
        }
      });
      // 如果product不存在 直接存入购物车
      if (repeatProduct === false) {
        let cartListLength = state.cartList.length; // 每次存入购物车时，查看购物车length
        value.productCartId = ++cartListLength; // 设置购物车物品的id
        let { ...deepValue } = value; // deep copy 下value，然后存入
        state.cartList.unshift(deepValue);
      }
      repeatProduct = false; // repeatProduct 值回调为 false
    },

    // 怎加数量
    plusProduct(state, value) {
      state.cartList.some(item => {
        if (item.productCartId === value.productCartId) {
          item.productPriceAll = (value.productPrice * value.productCount).toFixed(2).toString();
          item.productCount = value.productCount;
        }
      });
    },

    // 减少数量
    minusProduct(state, value) {
      state.cartList.some(item => {
        if (item.productCartId === value.productCartId) {
          item.productPriceAll = (value.productPrice * value.productCount).toFixed(2).toString();
          item.productCount = value.productCount;
        }
      });
    },

    // 移除商品
    removeProduct(state, value) {
      state.cartList.some((item, index) => {
        if (item.productCartId === value) {
          state.cartList.splice(index, 1);
        }
      });
    },

    // 点击了物品的 checkbox 时，修改初始化判断值 productCheckbox
    changeProductCheckbox(state, value) {
      if (state.cartList[value].productCheckbox === true) {
        state.cartList[value].productCheckbox = false;
      } else {
        state.cartList[value].productCheckbox = true;
      }
    },

    // 点击了 全选按钮 时，修改所有初始化判断值 productCheckbox
    changeProductCheckboxAll(state, value) {
      if (value === true) {
        state.cartList.forEach(item => {
          item.productCheckbox = true;
        });
      } else {
        state.cartList.forEach(item => {
          item.productCheckbox = false;
        });
      }
    }

  }
};
