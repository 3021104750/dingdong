<template>
  <div class="dingdong-logo">
    <van-image
      width="4.8rem"
      height="1.64rem"
      :src="require('../assets/images/dingdongLogo.png')"
    />
  </div>
  <van-search
    show-action
    shape="round"
    name="search"
    background="#efefef"
    maxlength="“30”"
    class="van-hairline--bottom"
    placeholder="请输入搜索菜品吧！"
    v-model="searchValue"
    @update:model-value="getSearchValue"
    @search="onSearch"
  >
    <template #action>
      <div @click="onClickSearch">搜索</div>
    </template>
  </van-search>
</template>

<script>
import { debounce } from '@/api/plugins.js';
import { Toast } from 'vant';
import { ref } from '@vue/reactivity';
export default {
  name: 'Header',
  setup() {
    // 搜索框值
    const searchValue = ref('');

    // 搜索时，进行防抖
    const getSearchValue = debounce(function (val) {
      searchValue.value = val;
    }, 500);

    // 按回车搜索
    const onSearch = (val) => {
      if (val === '') Toast('搜索内容不能为空！');
      else {
        Toast(val);
        searchValue.value = '';
      }
    };

    // 点击搜索按钮搜索
    const onClickSearch = () => {
      if (searchValue.value === '') Toast('搜索内容不能为空！');
      else {
        Toast(searchValue.value);
        searchValue.value = '';
      }
    };

    return {
      searchValue,
      getSearchValue,
      onSearch,
      onClickSearch
    };
  }
};
</script>

<style lang="less" scoped>
.dingdong-logo {
  width: 100%;
  height: 2rem;
  line-height: 3.2rem;
  text-align: center;
  background-color: #fff;
}

/deep/ .van-search__content {
  border: 0.04rem solid #e0e0e0;
}
</style>
