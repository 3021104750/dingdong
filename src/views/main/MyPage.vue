<template>
  <van-button
    type="default"
    style="display: block; margin: 50% auto"
    @touchstart="getHint"
    >点我！</van-button
  >
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'MyPage',
  setup() {
    const getHint = () => {
      Toast('次页面暂时还未开发，\n因为与weiboya我的类似');
    };

    return {
      getHint
    };
  }
};
</script>

<style lang="less" scoped>
</style>
