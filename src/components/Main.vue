<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['HomePage', 'CategoryPage', 'CartPage', 'MyPage']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style lang="less" scoped>
</style>
