(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6e5d"],{"1eb5":function(e,t,a){"use strict";a.r(t);var c=a("7a23");function o(e,t,a,o,r,g){var n=Object(c["J"])("van-tab"),y=Object(c["J"])("van-tabs"),u=Object(c["J"])("router-view");return Object(c["C"])(),Object(c["i"])(c["a"],null,[Object(c["m"])(y,{active:o.active,"onUpdate:active":t[0]||(t[0]=function(e){return o.active=e}),shrink:"","lazy-render":"","title-active-color":"#219142",color:"#219142",style:{"z-index":"99",position:"sticky",top:"4.24rem"}},{default:Object(c["R"])((function(){return[(Object(c["C"])(!0),Object(c["i"])(c["a"],null,Object(c["I"])(o.categoryList,(function(e){return Object(c["C"])(),Object(c["g"])(n,{key:e.categoryId,title:e.categoryName,to:{path:e.categoryRouterPath,query:{categoryId:e.categoryId}}},null,8,["title","to"])})),128))]})),_:1},8,["active"]),Object(c["m"])(u,null,{default:Object(c["R"])((function(e){var t=e.Component;return[(Object(c["C"])(),Object(c["g"])(c["b"],{include:o.categoryComponment},[(Object(c["C"])(),Object(c["g"])(Object(c["L"])(t)))],1032,["include"]))]})),_:1})],64)}a("d3b7");var r=a("a1e9"),g=a("6c02"),n=a("5c40"),y=a("c65d"),u={name:"CategoryPage",setup:function(){var e=Object(r["i"])(["Vagetable","Meat","Bean","Milk","Seafood","QuickFreeze","Fruit","Marinating","Condiments","Snack","Alcohol","Daily"]),t=Object(r["i"])([{categoryRouterPath:"/categoryPage/vagetable",categoryId:1,categoryName:"蔬菜"},{categoryRouterPath:"/categoryPage/meat",categoryId:2,categoryName:"肉类"},{categoryRouterPath:"/categoryPage/bean",categoryId:3,categoryName:"豆制"},{categoryRouterPath:"/categoryPage/milk",categoryId:4,categoryName:"乳制"},{categoryRouterPath:"/categoryPage/seafood",categoryId:5,categoryName:"海鲜"},{categoryRouterPath:"/categoryPage/quickfreeze",categoryId:6,categoryName:"速冻"},{categoryRouterPath:"/categoryPage/fruit",categoryId:7,categoryName:"水果"},{categoryRouterPath:"/categoryPage/marinating",categoryId:8,categoryName:"卤制"},{categoryRouterPath:"/categoryPage/condiments",categoryId:9,categoryName:"调味"},{categoryRouterPath:"/categoryPage/snack",categoryId:10,categoryName:"零食"},{categoryRouterPath:"/categoryPage/alcohol",categoryId:11,categoryName:"酒类"},{categoryRouterPath:"/categoryPage/daily",categoryId:12,categoryName:"日用"}]),a=Object(g["d"])(),c=Object(g["e"])(),o=Object(n["g"])((function(){return a.query})),u=Object(r["m"])(o.value.categoryId-1),i=Object(r["m"])(0);Object(n["C"])((function(){void 0===o.value.categoryId?(u.value=i.value,t.some((function(e,t){t===u.value&&c.push({path:e.categoryRouterPath,query:{categoryId:e.categoryId}})}))):u.value=o.value.categoryId-1})),Object(g["c"])((function(e,t,a){i.value=u.value,a()}));var b=Object(r["m"])(0);return Object(n["ab"])(a,(function(e,t){var a=Object(n["g"])((function(){return t.query}));b.value=a.value.categoryId-1})),Object(y["e"])((function(){u.value=b.value})),{active:u,categoryComponment:e,categoryList:t}}},i=a("6b0d"),b=a.n(i);const d=b()(u,[["render",o]]);t["default"]=d}}]);
//# sourceMappingURL=chunk-2d0b6e5d.d3bf79f7.js.map