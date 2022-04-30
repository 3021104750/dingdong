<template>
  <van-grid square clickable>
    <van-grid-item
      v-for="item in categoryList"
      :key="item.categoryId"
      :icon="item.categoryImg"
      :text="item.categoryName"
      :to="{
        path: item.categoryRouterPath,
        query: { categoryId: item.categoryId }
      }"
    />
  </van-grid>
</template>

<script>
import { markRaw } from '@vue/reactivity';
export default {
  name: 'HomePage',
  setup() {
    const categoryList = markRaw([
      {
        categoryImg: require('../../assets/images/homePageCategory/vegetable.webp'),
        categoryId: 1,
        categoryName: '蔬菜',
        categoryRouterPath: '/categoryPage/vagetable'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/meat.webp'),
        categoryId: 2,
        categoryName: '肉类',
        categoryRouterPath: '/categoryPage/meat'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/bean.webp'),
        categoryId: 3,
        categoryName: '豆制',
        categoryRouterPath: '/categoryPage/bean'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/milk.webp'),
        categoryId: 4,
        categoryName: '乳制',
        categoryRouterPath: '/categoryPage/milk'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/seafood.webp'),
        categoryId: 5,
        categoryName: '海鲜',
        categoryRouterPath: '/categoryPage/seafood'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/quickFreeze.webp'),
        categoryId: 6,
        categoryName: '速冻',
        categoryRouterPath: '/categoryPage/quickfreeze'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/fruit.webp'),
        categoryId: 7,
        categoryName: '水果',
        categoryRouterPath: '/categoryPage/fruit'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/marinating.jpg'),
        categoryId: 8,
        categoryName: '卤制',
        categoryRouterPath: '/categoryPage/marinating'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/condiments.webp'),
        categoryId: 9,
        categoryName: '调味',
        categoryRouterPath: '/categoryPage/condiments'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/snack.webp'),
        categoryId: 10,
        categoryName: '零食',
        categoryRouterPath: '/categoryPage/snack'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/alcohol.webp'),
        categoryId: 11,
        categoryName: '酒类',
        categoryRouterPath: '/categoryPage/alcohol'
      },
      {
        categoryImg: require('../../assets/images/homePageCategory/daily.webp'),
        categoryId: 12,
        categoryName: '日用',
        categoryRouterPath: '/categoryPage/daily'
      }
    ]);

    return {
      categoryList
    };
  }
};
</script>

<style lang="less" scoped>
</style>
