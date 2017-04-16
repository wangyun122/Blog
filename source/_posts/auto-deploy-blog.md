---
title: Blog自动化部署
date: 2017-04-08 17:16:32
tags:
---
懒惰一直是码农优秀的品质。
之前把blog是部署在github page上,而现在扔到自己服务器部署就麻烦了一点，不过还好github有`webhook`功能，很方便的就能实现自动部署。
### 1.配置hexo
首先Hexo 提供了快速方便的一键部署功能，让您只需一条命令就能将网站部署到服务器上。
因为我是把代码托管在GitHub上，所以首先安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
```
$ npm install hexo-deployer-git --save
```
<!--more-->
修改配置。
```
deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message]
```
配置完成之后输入命令
```
$ hexo g #生成静态文件
$ hexo d #上传静态文件
```
hexo会自动生成静态文件，然后把静态文件拷贝到`.deploy_git`，然后根据你的配置提交到仓库，默认为gh-page分支。

### 2.配置GitHub的Webhook

打开项目页面。在`Setting->Webhooks`中配置`webhooks`
![github](https://ww3.sinaimg.cn/large/006tNc79gy1fefeplnzryj31kw15ddob.jpg)
添加完成之后可以发送请求来测试是否成功，github的请求头中会带有secret,测试的`X-GitHub-Event`为`ping`。
![Redeliver](https://ww3.sinaimg.cn/large/006tNc79gy1fehfjmgdwhj31c012o7ai.jpg)

### 3.服务器接口
现在就需要实现服务器接口了，本来打算自己写，结果发现有个现成的库: [github-webhook-handler](https://github.com/rvagg/github-webhook-handler)。
```
npm install github-webhook-handler
```
实例代码
```js
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'myhashsecret' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

handler.on('ping', function (event) {
  console.log('Received a ping event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
```
将`path`和`secret`改成自己对应的地址和密钥，运动这段代码，会监听端口`7777`的请求。配置好域名和nginx的反向代理就可以测试效果了。其中`ping`就是专门处理测试效果的。

### 4.运行shell
接收到github的请求之后，需要运行shell来更新代码。我先写了个简单的`deploy.sh`，在收到请求之后运行代码。

```js
var http = require('http')
var createHandler = require('github-webhook-handler')
var child_process = require('child_process');
var handler = createHandler({
  path: '/',
  secret: 'myhashsecret'
})
const rumCommand = (cmd, args, callback) => {
  const child = child_process.spawn(cmd, args)
  let response = ''
  child.stdout.on('data', buffer => response += buffer.toString())
  child.stdout.on('end', () => callback(response))
}
handler.on('push', function(event) {
  console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
  rumCommand('sh', ['./deploy.sh'], txt => {
    console.log(txt)
  })
})
handler.on('ping', function (event) {
  console.log('Received a ping event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
```

### 5.使用pm2运行node
最后用`pm2`来守护`node`进程。
[pm2](https://github.com/rvagg/github-webhook-handler)是一个带有负载均衡功能的Node应用的进程管理器.
安装：
```
npm install -g pm2
```

运行：
```
pm2 start index.js
```

pm2j就成功启动了。
![pm2](https://ww1.sinaimg.cn/large/006tNc79gy1fehl11h63tj31j4132jy3.jpg)

我们可以通过简单的命令查看应用的运行状态：
```
pm2 list
```
![pm2](https://ww1.sinaimg.cn/large/006tNc79gy1fehl3oahnfj319u05w3zv.jpg)

更多pm2内容请参考官方文档：http://pm2.keymetrics.io/docs/usage/quick-start

### 总结
至此就完成了blog的自动部署，虽然难度不大还是用到了好多小知识。之后还可以优化下细节，比如增加点日志监控等。