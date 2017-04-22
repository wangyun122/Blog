---
title: lodash
date: 2017-04-17 00:18:41
tags:
---

有多年开发经验的工程师，往往都会有自己的一套工具库，称为 utils、helpers 等等，这套库一方面是自己的技术积累，另一方面也是对某项技术的扩展，领先于技术规范的制定和实现。

Lodash 就是这样的一套工具库，它内部封装了诸多对字符串、数组、对象等常见数据类型的处理函数，其中部分是目前 ECMAScript 尚未制定的规范，但同时被业界所认可的辅助函数。目前每天使用 npm 安装 Lodash 的数量在百万级以上，这在一定程度上明了其代码的健壮性，值得我们在项目中一试。
<!--more-->
  
## 模块组成

Lodash 提供的辅助函数主要分为以下几类，函数列表和用法实例请查看 [Lodash 的官方文档](https://lodash.com/docs) ：

* `Array` ，适用于数组类型，比如填充数据、查找元素、数组分片等操作
* `Collection` ，适用于数组和对象类型，部分适用于字符串，比如分组、查找、过滤等操作
* `Function` ，适用于函数类型，比如节流、延迟、缓存、设置钩子等操作
* `Lang` ，普遍适用于各种类型，常用于执行类型判断和类型转换
* `Math` ，适用于数值类型，常用于执行数学运算
* `Number` ，适用于生成随机数，比较数值与数值区间的关系
* `Object` ，适用于对象类型，常用于对象的创建、扩展、类型转换、检索、集合等操作
* `Seq` ，常用于创建链式调用，提高执行性能（惰性计算）
* `String` ，适用于字符串类型
`lodash/fp` 模块提供了更接近函数式编程的开发方式，其内部的函数经过包装，具有 immutable、auto-curried、iteratee-first、data-last（官方介绍）等特点。Lodash 在 [GitHub Wiki](https://github.com/lodash/lodash/wiki/FP-Guide) 中对 lodash/fp 的特点做了如下概述：

* Fixed Arity，固化参数个数，便于柯里化
* Rearragned Arguments，重新调整参数位置，便于函数之间的聚合
* Capped Iteratee Argument，封装 Iteratee 参数
* New Methods
> In functional programming, an iteratee is a composable abstraction for incrementally processing sequentially presented chunks of input data in a purely functional fashion. With iteratees, it is possible to lazily transform how a resource will emit data, for example, by converting each chunk of the input to uppercase as they are retrieved or by limiting the data to only the five first chunks without loading the whole input data into memory. Iteratees are also responsible for opening and closing resources, providing predictable resource management. ———— [iteratee, wikipedia](https://en.wikipedia.org/wiki/Iteratee)

```js
// The `lodash/map` iteratee receives three arguments:
// (value, index|key, collection)
_.map(['6', '8', '10'], parseInt);
// → [6, NaN, 2]
// The `lodash/fp/map` iteratee is capped at one argument:
// (value)
fp.map(parseInt)(['6', '8', '10']);
// → [6, 8, 10]
// `lodash/padStart` accepts an optional `chars` param.
_.padStart('a', 3, '-')
// → '--a'
// `lodash/fp/padStart` does not.
fp.padStart(3)('a');
// → '  a'
fp.padCharsStart('-')(3)('a');
// → '--a'
// `lodash/filter` is data-first iteratee-last:
// (collection, iteratee)
var compact = _.partial(_.filter, _, Boolean);
compact(['a', null, 'c']);
// → ['a', 'c']
// `lodash/fp/filter` is iteratee-first data-last:
// (iteratee, collection)
var compact = fp.filter(Boolean);
compact(['a', null, 'c']);
// → ['a', 'c']
```

在 React + Webpack + Babel(ES6) 的开发环境中，使用 Lodash 需要安装插件 [babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash) 并更新 Babel 配置文件：

```
npm install --save lodash
npm install --save-dev babel-plugin-lodash
```

更新 Babel 的配置文件 `.babelrc`:

使用方式：

```js
import _ from 'lodash';
import { add } from 'lodash/fp';
const addOne = add(1);
_.map([1, 2, 3], addOne);
```

## 性能

在 Filip Zawada 的文章 [《How to Speed Up Lo-Dash ×100? Introducing Lazy Evaluation》](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/) 中提到了 Lodash 提高执行速度的思路，主要有三点：Lazy Evaluation、Pipelining 和 Deferred Execution。下面两张图来自 Filip 的博客：

![p1](https://ww4.sinaimg.cn/large/006tNc79gy1feozanssyvg30b407sasu.gif)
假设有如上图所示的问题：从若干个球中取出三个面值小于 10 的球。第一步是从所有的球中取出所有面值小于 10 的球，第二步是从上一步的结果取三个球。

![p2](https://ww3.sinaimg.cn/large/006tNc79gy1feozb5yszjg30b407s132.gif)
上图是另一种解决方案，如果一个球能够通过第一步，那么就继续执行第二步，直至结束然后测试下一个球……当我们取到三个球之后就中断整个循环。Filip 称这是 Lazy Evaluation Algorithm，就个人理解这并不全面，他后续提到的 Pipelining(管道计算)，再加上一个中断循环执行的算法应该更符合这里的图示。

此外，使用 Lodash 的链式调用时，只有显示或隐式调用 `.value` 方法才会对链式调用的整个操作进行取值，这种不在声明时立即求值，而在使用时求值的方式，是 Lazy Evaluation 最大的特点。

## 九个实例

受益于 Lodash 的普及程度，使用它可以提高多人开发时阅读代码的效率，减少彼此之间的误解（Loss of Consciousness）。在 [《Lodash: 10 Javascript Utility Functions That You Should Probably Stop Rewriting》](http://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting) 一文中，作者列举了多个常用的 Lodash 函数，实例演示了使用 Lodash 的技巧。

 1. N 次循环

```js
// 1. Basic for loop.
for(var i = 0; i < 5; i++) {
    // ...
}
// 2. Using Array's join and split methods
Array.apply(null, Array(5)).forEach(function(){
    // ...
});
// Lodash
_.times(5, function(){
    // ...
});
```

`for` 语句是执行循环的不二选择， `Array.apply` 也可以模拟循环，但在上面代码的使用场景下， `_.times()` 的解决方式更加简洁和易于理解。

 2. 深层查找属性值

```js
// Fetch the name of the first pet from each owner
var ownerArr = [{
    "owner": "Colin",
    "pets": [{"name":"dog1"}, {"name": "dog2"}]
}, {
    "owner": "John",
    "pets": [{"name":"dog3"}, {"name": "dog4"}]
}];
// Array's map method.
ownerArr.map(function(owner){
   return owner.pets[0].name;
});
// Lodash
_.map(ownerArr, 'pets[0].name');
```

`_.map` 方法是对原生 `map` 方法的改进，其中使用 `pets[0].name` 字符串对嵌套数据取值的方式简化了很多冗余的代码，非常类似使用 jQuery 选择 DOM 节点 `ul > li > a` ，对于前端开发者来说有种久违的亲切感。

 3. 个性化数组

```js
// Array's map method.
Array.apply(null, Array(6)).map(function(item, index){
    return "ball_" + index;
});
// Lodash
_.times(6, _.uniqueId.bind(null, 'ball_'));
// Lodash
_.times(6, _.partial(_.uniqueId, 'ball_'));
// eg. [ball_0, ball_1, ball_2, ball_3, ball_4, ball_5]
```

在上面的代码中，我们要创建一个初始值不同、长度为 6 的数组，其中 `_.uniqueId` 方法用于生成独一无二的标识符（递增的数字，在程序运行期间保持独一无二），`_partial `方法是对`bind` 的封装。

4. 深拷贝
```js
var objA = {
    "name": "colin"
}
// Normal method? Too long. See Stackoverflow for solution:
// http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
// Lodash
var objB = _.cloneDeep(objA);
objB === objA // false
```
JavaScript 没有直接提供深拷贝的函数，但我们可以用其他函数来模拟，比如 `JSON.parse(JSON.stringify(objectToClone))` ，但这种方法要求对象中的属性值不能是函数。Lodash 中的 `_.cloneDeep` 函数封装了深拷贝的逻辑，用起来更加简洁。

 5. 随机数

```js
// Naive utility method
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(15, 20);
// Lodash
_.random(15, 20);
```

Lodash 的随机数生成函数更贴近实际开发，ECMAScript 的随机数生成函数是底层必备的接口，两者都不可或缺。此外，使用 `_.random(15, 20, true)` 还可以在 15 到 20 之间生成随机的浮点数。

 6. 对象扩展

```js
// Adding extend function to Object.prototype
Object.prototype.extend = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};
var objA = {"name": "colin", "car": "suzuki"};
var objB = {"name": "james", "age": 17};
objA.extend(objB);
objA; // {"name": "james", "age": 17, "car": "suzuki"};
// Lodash
_.assign(objA, objB);
```

`_.assign` 是浅拷贝，和 ES6 新增的 `Ojbect.assign` 函数功能一致（建议优先使用 `Object.assign` ）。

 7. 筛选属性

```js
// Naive method: Remove an array of keys from object
Object.prototype.remove = function(arr) {
    var that = this;
    arr.forEach(function(key){
        delete(that[key]);
    });
};
var objA = {"name": "colin", "car": "suzuki", "age": 17};
objA.remove(['car', 'age']);
objA; // {"name": "colin"}
// Lodash
objA = _.omit(objA, ['car', 'age']);
// => {"name": "colin"}
objA = _.omit(objA, 'car');
// => {"name": "colin", "age": 17};
objA = _.omit(objA, _.isNumber);
// => {"name": "colin"};
```

   大多数情况下，Lodash 所提供的辅助函数都会比原生的函数更贴近开发需求。在上面的代码中，开发者可以使用数组、字符串以及函数的方式筛选对象的属性，并且最终会返回一个新的对象，中间执行筛选时不会对旧对象产生影响。

```js
// Naive method: Returning a new object with selected properties
Object.prototype.pick = function(arr) {
    var _this = this;
    var obj = {};
    arr.forEach(function(key){
        obj[key] = _this[key];
    });
    return obj;
};
var objA = {"name": "colin", "car": "suzuki", "age": 17};
var objB = objA.pick(['car', 'age']);
// {"car": "suzuki", "age": 17}
// Lodash
var objB = _.pick(objA, ['car', 'age']);
// {"car": "suzuki", "age": 17}
```

`_.pick` 是 `_.omit` 的相反操作，用于从其他对象中挑选属性生成新的对象。

 8. 随机元素

```js
var luckyDraw = ["Colin", "John", "James", "Lily", "Mary"];
function pickRandomPerson(luckyDraw){
    var index = Math.floor(Math.random() * (luckyDraw.length -1));
    return luckyDraw[index];
}
pickRandomPerson(luckyDraw); // John
// Lodash
_.sample(luckyDraw); // Colin
// Lodash - Getting 2 random item
_.sample(luckyDraw, 2); // ['John','Lily']

```

`_.sample` 支持随机挑选多个元素并返回心的数组。

 9. 针对 JSON.parse 的错误处理

```js
// Using try-catch to handle the JSON.parse error
function parse(str){
    try {
        return JSON.parse(str);
    }
    catch(e) {
        return false;
    }
}
// With Lodash
function parseLodash(str){
    return _.attempt(JSON.parse.bind(null, str));
}
parse('a');
// => false
parseLodash('a');
// => Return an error object
parse('{"name": "colin"}');
// => Return {"name": "colin"}
parseLodash('{"name": "colin"}');
// => Return {"name": "colin"}
```

如果你在使用 `JSON.parse` 时没有预置错误处理，那么它很有可能会成为一个定时炸弹，我们不应该默认接收的 JSON 对象都是有效的。 `try-catch` 是最常见的错误处理方式，如果项目中 Lodash，那么可以使用 `_.attmpt` 替代 `try-catch` 的方式，当解析 JSON 出错时，该方法会返回一个 `Error` 对象。

> 随着 ES6 的普及，Lodash 的功能或多或少会被原生功能所替代，所以使用时还需要进一步甄别，建议优先使用原生函数，有关 ES6 替代 Lodash 的部分，请参考文章 [《10 Lodash Features You Can Replace with ES6》](https://www.sitepoint.com/lodash-features-replace-es6/) （中文版 [《10 个可用 ES6 替代的 Lodash 特性》](http://www.zcfy.cc/article/10-lodash-features-you-can-replace-with-es6-467.html) ）。

其中有两处非常值得一看：

```js
// 使用箭头函数创建可复用的路径
const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
[
    obj => obj.a[0].b.c,
    obj => obj.a[1]
].map(path => path(object));
// 使用箭头函数编写链式调用
const pipe = functions => data => {
    return functions.reduce(
        (value, func) => func(value),
        data
    );
};
const pipeline = pipe([
    x => x * 2,
    x => x / 3,
    x => x > 5,
    b => !b
]);
pipeline(5);
// true
pipeline(20);
// false
```
在 ES6 中，如果一个函数只接收一个形参且函数体是一个 `return` 语句，就可以使用箭头函数简化为：

```js
const func = p => v;
// 类似于(不完全相同)
const func = function (p) {
    return v;
}
```

当有多重嵌套时，可以简化为：

```js
const func = a => b => c => a + b + c;
func(1)(2)(3);
// => 6
// 类似于
const func = function (a) {
    return function (b) {
        return function (e) {
            return a + b + c;
        }
    }
}
```

 参考资料 

[Lodash](http://pinggod.com/2016/Lodash/)