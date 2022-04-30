/* 为多个dom元素绑定动画，并且在动画执行完毕后，移出相应监听
  @param  element：dom元素节点
          animation：动画名称
          id：dom元素id
          duration：动画执行时间（可省略）
          prefix：默认动画class前缀（可省略）
  @return 返回一个promise函数 */
export const animateForMultipleDoms = (element, animation, id, duration = '0.5s', prefix = 'animate__') => {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const nodes = document.querySelectorAll(element);

    nodes.forEach((item, index) => {
      if (index === id - 1) {
        item.classList.add(`${prefix}animated`, animationName);
        item.style.setProperty('--animate-duration', duration);
      }
    });

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      nodes.forEach((item, index) => {
        if (index === id - 1) {
          item.classList.remove(`${prefix}animated`, animationName);
          item.style.setProperty('--animate-duration', '');
        }
      });
      resolve('Animation ended');
    }

    nodes.forEach((item, index) => {
      if (index === id - 1) {
        item.addEventListener('animationend', handleAnimationEnd, {
          once: true
        });
      }
    });
  });
};

/* 为单个dom元素绑定动画，并且在动画执行完毕后，移出相应监听。
  @param  element：dom元素节点
          animation：动画名称
          id：dom元素id
          duration：动画执行时间（可省略）
          prefix：默认动画class前缀 (可省略)
  @return 返回一个promise函数。 */
export const animateForSingleDom = (element, animation, duration = '0.5s', prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    node.style.setProperty('--animate-duration', duration);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      node.style.setProperty('--animate-duration', '');
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

/* 防抖
  @param  fn：回调函数
          delay：延迟时间
  @return 返回一个函数，设置定时器返回一个回调。 */
export const debounce = (fn, delay = 600) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

/* 防抖 升级版 第一次立即出发 之后防抖
  @param  fn：回调函数
          delay：延迟时间
  @return 返回一个函数，设置定时器返回一个回调。 */
export const debounceLater = (fn, delay = 600) => {
  let timer = null;
  let flag = true;
  // flag等于true时，立即触发。false时，清除定时器。
  return function () {
    if (flag) {
      fn.apply(this, arguments);
      flag = false;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
};

/* 节流 时间戳方法
  @param  fn：回调函数
          delay：延迟时间
  @return 返回一个函数，如果现在时间剪去过去时间大于delay，返回一个回调。 */
export const throttle = (fn, delay = 600) => {
  let last = 0;
  return function () {
    let now = +new Date();
    if (now - last > delay) {
      fn.apply(this, arguments);
      last = now;
    }
  };
};

/* 节流 定时器方法
  @param  fn：回调函数
          delay：延迟时间
  @return 返回一个函数，设置定时器返回一个回调。 */
// export const throttle = (fn, delay = 600) => {
//   let flag = true;
//   return function () {
//     if (flag) {
//       setTimeout(() => {
//         fn, apply(this, arguments);
//         flag = true;
//       }, delay)
//     }
//     flag = false;
//   }
// }

/* 监听用户是否点击了后退或者前进按钮
  @param  callback：回调函数
*/
export const detectBackOrForward = (callback) => {
  // 监听 hashchange 事件
  // window.addEventListener('hashchange', function () {
  //   // 为当前导航页附加一个 tag
  //   this.history.replaceState('hasHash', '', '');
  // });

  // 侦测是用户触发的操作
  window.addEventListener('popstate', function (e) {
    if (e.state) {
      callback();
    }
  });
};
