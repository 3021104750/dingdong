import { createStore } from 'vuex';

import Vagetable from '@/store/categoryData/vagetable.js';
import Meat from '@/store/categoryData/meat.js';
import Bean from '@/store/categoryData/bean.js';
import Milk from '@/store/categoryData/milk.js';
import Seafood from '@/store/categoryData/seafood.js';
import QuickFreeze from '@/store/categoryData/quickFreeze.js';
import Fruit from '@/store/categoryData/fruit.js';
import Marinating from '@/store/categoryData/marinating.js';
import Condiments from '@/store/categoryData/condiments.js';
import Snack from '@/store/categoryData/snack.js';
import Alcohol from '@/store/categoryData/alcohol.js';
import Daily from '@/store/categoryData/daily.js';

import Cart from '@/store/cart/cart.js';
import RemoveProductCategory from '@/store/cart/removeProductCategory.js';
import PlusOrMinusProduct from '@/store/cart/plusOrMinusProduct.js';

export default createStore({
  modules: {
    Vagetable,
    Meat,
    Bean,
    Milk,
    Seafood,
    QuickFreeze,
    Fruit,
    Marinating,
    Condiments,
    Snack,
    Alcohol,
    Daily,
    Cart,
    RemoveProductCategory,
    PlusOrMinusProduct
  }
});
