# vue 项目组成逻辑

如果整个页面都使用 `vue` 来构建，那么页面本身就是一个组件，称之为根组件。

如果我们用 CDN 引入 `vue`，并使用单独的 `js` 文件来代替组件的话，当项目变大时，就会变得难以管理。因此 `vue` 推出了单文件组件（Single-File Components），也就是文件后缀为 `.vue` 的文件。

单文件组件结构非常简单：html 写进 `template` 标签内，javascript 写进 `script` 标签内，css 写进 `style` 标签内。

每个组件都可以拥有自己的逻辑、结构和样式。

## 创建单文件组件

首先创建一个项目文件夹：

```shell
mkdir test
cd test
```

之后我们创建一个 html 文件 `index.html`：

```html
<html>
  <body>
    <div id="app"></div>
  </body>
</html>
```

注意这个 html 文件内没有任何 `script` 标签，也就是没有引入 js 文件。



接着我们创建 `App.vue` 根组件：

```Vue
<template>
	<div>
    <p>{{ message}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "信息",
    };
  },
};
</script>

<style>
// 在这里写 css
</style>
```

在我们创建完根组件后，我们并不能直接将其引入到 html 中，我们还要创建一个 `main.js` 文件：

```js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

这里使用 `createApp()` 创建一个 `vue` 应用并且将其挂载到 `id` 为 `app` 的 html 标签里面。



这里又出现了一个问题：我们的项目并没有 `vue` 框架代码，我们无法使用 `vue` 中的任何功能。所以我们现在要把 `vue` 的代码下载下来，我们需要使用 `npm` 进行框架的统一管理。

`npm` 是包管理器，可以更轻松地管理框架、第三方库等。

```shell
npm init -y
```

执行完这行代码后会生成一个 `package.json` 文件，这个文件就是 `npm` 包管理器的核心文件。



之后我们要通过 `npm` 来下载 `vue`：

```shell
npm i vue
```

执行完这一行代码后，我们的目录下会出现 `node_modules` 文件夹，以及 `package-lock.json` 文件，同时 `package.json` 也会多处一行代码：`"dependencies": { "vue": "^3.4.23" }`。这里的意思是添加了一个名字叫做 `vue` 的依赖。

`package-lock.json` 中的内容比 `package.json` 更加详细。`node_modules` 文件夹则负责存放我们下载的依赖。



虽然我们有了包管理器，但是当我们项目的源文件越来越多时，就会变得难以管理。比如在一个 html 文件中插入多个 js 文件，如果 js 文件的顺序出了问题，就可能导致下面的文件无法引用上面文件的功能。这时我们就可以用 `webpack/vite` 来把这些 js 文件都合成一个文件。

为了不和待会儿的文件弄混，我们将 `App.vue`、`index.html`、`main.js` 都放到 `src` 文件夹下，`src` 表示 source，代表着我们开发的源文件夹。

我们在根目录下创建 `webpack.config.js/vite.config.js`，我们在该文件下配置 `webpack/vite`。但在配置前我们要先完善一下开发时需要的依赖：

```shell
npm i -D vite vite-cli
```

这里的 `-D` 代表我们安装的是开发环境时的依赖，并不会在生产环境上使用。此时我们的 `package.json` 中又出现了新的代码：`"devDependencies": { "vite": "^5.2.9", "vite-cli": "^1.0.0" }`。



因为并不是每个浏览器都支持 ES6 语法，因此我们需要 `babel` 来把代码从高版本转成低版本。我们需要安装 `babel` 系列的三个依赖：

```shell
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

此时再查看 `package.json` 的 `dvDependencies` 项，我们发现依赖已经安装上了。



除了 ES6 语法外，浏览器肯定不认识 `vue` 单文件组件，所以我们还需要安装 `vue-loader` 依赖来进行识别：

```shell
npm install -D vue-loader vue-template-compiler css-loader vue-style-loader vite-plugin-html
```

现在我们就可以来配置 `vite.config.js` 文件了：

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

