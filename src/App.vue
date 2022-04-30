<template>
  <div id="header">
    <Header></Header>
  </div>
  <div id="main">
    <Main></Main>
  </div>
  <div id="footer">
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  setup() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

#main {
  padding: 4.24rem 0 2rem;
}

#footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
</style>
