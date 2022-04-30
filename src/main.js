import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible'; // flexible.js
import 'normalize.css';
import './assets/css/initCss.css'; // 初始化全局样式
import './assets/css/iconfont.css'; // icon字体样式
import 'animate.css'; // 动画库

import { Lazyload, Button, Col, Row, Image as VanImage, Search, Grid, GridItem, Tab, Tabs, Card, Stepper, NumberKeyboard, Empty, Badge, SubmitBar, Checkbox, AddressList, DropdownMenu, DropdownItem, NavBar, AddressEdit } from 'vant';

const app = createApp(App);

app.use(store).use(router);

app.use(Lazyload, {
  lazyComponent: true,
  loading: '@/assets/images/lazyLoad/loading.gif',
  error: '@/assets/images/lazyLoad/error.webp'
}).use(Button)
  .use(Col)
  .use(Row)
  .use(VanImage)
  .use(Search)
  .use(Grid)
  .use(GridItem)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(Stepper)
  .use(NumberKeyboard)
  .use(Empty)
  .use(Badge)
  .use(SubmitBar)
  .use(Checkbox)
  .use(AddressList)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(NavBar)
  .use(AddressEdit);

app.mount('#app');
