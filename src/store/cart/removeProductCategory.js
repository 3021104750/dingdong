// 删除购物车物品后，记录下删除的是哪个category的哪个product，然后各自的category获取相对应的物品id，进行重置 van-badge
export default {
  namespaced: true,
  state: {
    removeProductId: {
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
      state.removeProductId[value.category].push(value.id);
    },
    // 重置 van-badge 后，清空相应数组
    clearProduct(state, value) {
      state.removeProductId[value] = [];
    }
  }
};
