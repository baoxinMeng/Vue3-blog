# Vue Blog

本篇记录了一个基于 Vue3 纯前端的博客项目，从 0 到 1 的搭建过程。给从来没有完成过项目的朋友一个参考。
## 项目创建
###### 使用 vue cli 创建项目
```shell
npm create vue@latest
```

之后我们执行提示的代码来查看界面：
```shell
cd temp
npm install
npm run dev
```

###### 安装 [vite-vue-devtools](https://devtools-next.vuejs.org/guide/vite-plugin)
```shell
npm add -D vite-plugin-vue-devtools
```

在 `vite.config.js` 中完成配置：
```javascript
//  Configuration Vite

import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    VueDevTools(),
  ],
})
```

###### 配置 `src` 别名
在 `jsconfig.json` 中配置：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
}
```

## 安装 [vue-router](https://router.vuejs.org/)

```shell
npm install vue-router@4
```

修改 `App.vue` 文件：
```vue
<template>
  <div>
    <RouterView />  
  </div>
</template>
```

之后在 `src/router/index.js` 创建路由表：
```js
import { createRouter, createWebHistory } from "vue-router";

// src/views 下存放页面级组建
// 路由表，根据路径匹配组建
const routes = [
    {path: "/", component: () => import("@/components/HelloWorld.vue")};
    {path: "welcome", component: () => import("@/components/WelcomeItem.vue")};
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

因为 `vue-router` 是一个插件，需要在 `main.js` 中注册：
```js
app.use(router);
```