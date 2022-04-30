// 点击 van-stepper-plus 或 van-stepper-minus 或 van-stepper-input 值改变后，记录下点击的是哪个category的哪个product，然后各自的category获取相对应的物品id，进行重置 van-badge
export default {
  namespaced: true,
  state: {
    plusOrMinusProductId: {
      vagetable: [],
      meat: [],
      bean: [],
      milk: [],
      seafood: [],
      quickFreeze: [],
      fruit: [],
      marinating: [],
      condiments: [],
      snack: [],
      alcohol: [],
      daily: []
    }
  },

  mutations: {
    // 获取是哪个category的物品和其id，存入相应数组
    getProduct(state, value) {
      // 获取是哪个category的物品和其id，存入相应数组，如果相应数组是空的话，直接存入
      if (state.plusOrMinusProductId[value.category].length === 0) {
        state.plusOrMinusProductId[value.category].push({ id: value.id, count: value.count });
      } else {
        // 如果存入相应数组不是空的话，判断此物品的id是否已经存在，如果存在则只需要修改此物品的count
        let repeatProduct = false; // 用来判断物品是否已经存入相应数组的零时变量
        state.plusOrMinusProductId[value.category].some(item => {
          if (item.id === value.id) {
            item.count = value.count;
            repeatProduct = true;
          }
        });
        // 如果此物品id不存在，则存入
        if (repeatProduct === false) {
          state.plusOrMinusProductId[value.category].push({ id: value.id, count: value.count });
        }
        repeatProduct = false; // 每次存入后 repeatProduct 重置为 false
      }
    },
    // 重置 van-badge 后，清空相应数组
    clearProduct(state, value) {
      state.plusOrMinusProductId[value] = [];
    }
  }
};
