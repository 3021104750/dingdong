module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "eqeqeq": 1,//必须使用全等
    "camelcase": 0,//强制驼峰法命名
    "prefer-const": [0, { 'ignoreReadBeforeAssign': false }],// 禁止必须使用 const
    "semi": [2, "always"], // 语句强制分号结尾
    "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
    "space-before-function-paren": [0, "always"], // 函数定义时括号前面要不要有空格
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
