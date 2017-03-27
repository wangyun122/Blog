---
title: iTerm2 + Zsh + oh-my-zsh
date: 2017-03-24 10:25:14
tags: mac
---
最近公司来了很多新人需要配置Mac环境，都给他们推荐配置`iTerm2`+`Zsh`+`oh-my-zsh`。
![powerlevel9l]

![powerlevel9k](https://camo.githubusercontent.com/80ec23fda88d2f445906a3502690f22827336736/687474703a2f2f692e696d6775722e636f6d2f777942565a51792e676966)
<!--more-->

[iTerm2](http://www.iterm2.com/) 应该是 是 MAC 下最好的终端工具。我的终端固定在上半屏幕，使用cmd+,呼入呼出，再加上一些配色定制，用起来十分过瘾，用习惯之后根本无法适应win了。

而`Zsh`号称是终极shell，功能强大并且兼容`bash`，只不过配置比较复杂，但是如果安装了`oh my zsh`补丁就能轻松起飞！

`Zsh`具有以下主要功能

* 开箱即用、可编程的命令行补全功能可以帮助用户输入各种参数以及选项

* 在用户启动的所有shell中共享命令历史

* 通过扩展的文件通配符，可以不利用外部命令达到find命令一般展开文件名

* 改进的变量与数组处理

* 在缓冲区中编辑多行命令

* 多种兼容模式，例如使用/bin/sh运行时可以伪装成Bourne shell

* 可以定制呈现形式的提示符；包括在屏幕右端显示信息，并在键入长命令时自动隐藏

* 可加载的模块，提供其他各种支持：完整的TCP与Unix域套接字控制，FTP客户端与扩充过的数学函数

* 完全可定制化

让我们来安装吧
首先输入命令行

```
cat /etc/shells
```
显示如下：

```
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```
你会发现mac已经预装了zsh。如果是linux想要装zsh的话

```
sudo yum install zsh
或者
sudo apt-get install zsh
```
接下来我们需要下载 oh-my-zsh 项目来帮我们配置 zsh

```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```
安装 oh-my-zsh 时,它自动读取你的环境变量并且自动帮 zsh 进行设置
所以这时的zsh 基本已经配置完成,输入命令就可以切换到 zsh 模式

```
chsh -s /usr/local/bin/zsh
```

现在重启下终端或者新开一个tab会发现已经是彩色的shell了。
`Zsh`的配置在`.zshrc`中，默认的主题是`robbyrussell `，给大家推荐一个酷炫的主题`powerlevel9k`。
![powerlevel9l](https://camo.githubusercontent.com/31da002de611cfef95f6daaa8b1baedef4079703/687474703a2f2f6268696c6275726e2e6f72672f636f6e74656e742f696d616765732f323031352f30312f706c396b2d696d70726f7665642e706e67)


首先安装`powerlevel9k`

```
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/powerlevel9k
$ echo 'source  ~/powerlevel9k/powerlevel9k.zsh-theme' >> ~/.zshrc
```

然后在`oh-my-zsh`下的`custom/themes`文件夹中安装主题。
```
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

最后在你的`.zshrc`中把主题替换
```
ZSH_THEME="powerlevel9k/powerlevel9k”
```

如果发现shell还有些乱码的话是因为还需要安装powerline fonts
```
// 下载powerline fonts项目
git clone https://github.com/powerline/fonts
// 执行安装
./fonts/install.sh
```

然后配置iTerm
在 `Preperence → Profiles → Text → Front` 中，
和 `Preperence → Profiles → Text → Non-ASCII Font` 中
改变字体为 `Sauce Code Powerline`

![改变字体](https://ww3.sinaimg.cn/large/006tNc79gy1fdxrx06ki2j31kw10mdrx.jpg)

[这里](https://github.com/bhilburn/powerlevel9k/wiki/Show-Off-Your-Config#natemccurdys-configuration) 还有更多酷炫的配置

