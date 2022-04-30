import Condiments from '@/assets/jsonData/condiments.json';

export default {
  namespaced: true,
  state: {
    dataList: []// json 数据
  },
  mutations: {
    // 把获取过来的json数据复制15份 放到一个新数组里
    initDataList(state) {
      let arr = [];
      let obj = Condiments[0];
      for (var i = 0; i < 15; i++) {
        let { ...deepObj } = obj; // deepcopy 下数据
        obj.productId += 1; // 使其里面的id 一次加一
        arr.push(deepObj);
      }
      state.dataList = arr;
    }
  }
};
