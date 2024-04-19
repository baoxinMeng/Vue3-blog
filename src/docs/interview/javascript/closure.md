---
title: "说说对闭包的理解"
description: ""
summary: ""
date: 2024-04-11T01:47:55+08:00
lastmod: 2024-04-11T01:47:55+08:00
draft: false
weight: 1003
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

### 1. 介绍

闭包就是一个函数与其词法环境（lexical environment）的引用绑在一起。

也就是说，闭包就是能够读取其他函数内部变量的函数；或是子函数在外调用，子函数所在的父函数的作用域不会被释放。

在 JavaScript 中，闭包会在满足条件的函数创建时被创建。下面给出一个简单的例子：

```JavaScript
function init() {
  let name = "Mozilla"; // init 内部的局部变量
  function displayName() { // 创建了一个闭包，displayName 是内层函数
    alert(name); // 使用了父函数中声明的变量
  }
  displayName(); // 使用闭包
}
init();
```

`displayName()` 虽然没有自己的局部变量，但是由于闭包的特性，它可以访问到外部函数的局部变量。

### 2. 使用场景

任何使用闭包的场景都离不开这两点：

1. 创建私有变量
2. 延长变量的生命周期

> 一般函数的词法环境在函数返回后就会被销毁，但是闭包会保存创建函数时所在词法环境的引用。即使创建时所在的执行上下文被销毁，但创建时的词法环境依然存在，就达到了延长变量生命周期的目的。

下面举个例子，在页面上添加一些可以调整字号的按钮：

```JavaScript
function makeSizer(size) {
  return () => {
    document.body.style.fontSize = size + "px";
  };
}

let size12 = makeSizer(12);
let size14 = makeSizer(14);
let size16 = makeSizer(16);

document.getElementById("size-12").onclick = size12;
document.getElementById("size-14").onclick = size14;
document.getElementById("size-16").onclick = size16;
```

##### 柯里化函数

柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的复用。

```JavaScript
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
  return width * height;
}

// 如果我们碰到的长方形的宽总是 10
const area1 = getArea(10, 20);
const area2 = getArea(10, 30);
const area3 = getArea(10, 40);

// 我们可以使用闭包柯里化这个函数
function getArea(width) {
  return (height) => {
    return width * height;
  }
}

const getTenWidthArea = getArea(10);
// 之后碰到宽度为 10 的长方形就可以这样计算面积
const area1 = getTenWidthArea(20);

// 如果碰到宽度变化也可以轻松复用
const getTwentyWidthArea = getArea(20);
```

##### 使用闭包模拟私有方法

在 JavaScript 中，并不支持私有变量，但是我们可以用闭包模拟私有方法：

```JavaScript
let Counter = () => {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment:  () => { changeBy(1); },
    decrement:  () => { changeBy(-1); },
    value:      () => { return privateCounter; },
  };
};

let Counter1 = Counter();
let Counter2 = Counter();
console.log(Counter1.value()); // 0
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); // 2
Counter1.decrement();
console.log(Counter1.value()); // 1
console.log(Counter2.value()); // 0

```

这里通过闭包创建公共函数，令其可以访问私有函数和变量，这种方式也叫模块模式。

两个计数器 Counter1 和 Counter2 各自拥有它们的独立性，每次调用其中一个计数器时，改变变量的值会改变这个闭包的词法环境，但是不会影响另一个闭包中的变量。

### 3. 注意事项

如果不是特定任务需要使用闭包，在函数中创建闭包时不明智的。因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象和类时，实例方法通常应该关联到对象的原型，而不是定义到对象的构造器中。

原因在于每个对象的创建，方法都会被重新赋值：

```JavaScript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = () => {
    console.log(this.name);
  };
  this.getMessage = () => {
    console.log(this.message);
  };
}

const ob = new MyObject("NiderHoger", "Hello World");
ob.getName();
```

上面的代码我们并没有利用到闭包的好处，因此可以避免使用闭包。比如修改成这样：

```JavaScript
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}

MyObject.prototype = {
  getName: () => { console.log(this.name); },
  getMessage: () => { console.log(this.message); },
};

const ob = new MyObject("NiderHoger", "Hello World");
ob.getName();
```

### 4. 面试回答

1. 一句话简单概括，闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在父函数的作用域不会被释放。
2. 闭包的使用场景都离不了两点：创建私有变量；延长变量的生命周期。
3. 闭包的原理就是普通函数的词法环境在函数返回时就会被销毁，但闭包会保存创建函数时所在词法环境的引用。即使创建时所在的执行上下文被销毁，但创建时的词法环境依然存在，这样就达到了延长变量生命周期的目的。
4. 如果不是特定任务需要使用闭包，在函数中创建闭包是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能有负面影响。
