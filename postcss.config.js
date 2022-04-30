module.exports = {
  plugins: {
    autoprefixer: {},
    // flexible配置
    'postcss-pxtorem': {
      // rootValue ({ file }) {
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75
      // }
      rootValue: 25, // 设计稿宽度的 15 份
      propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    }
  }
};
