---
title: iTerm2 + Zsh + oh-my-zsh
date: 2017-03-24 10:25:14
tags: mac
---
最近公司来了很多新人需要配置Mac环境，让他们先把`iTerm2`+`Zsh`+`oh-my-zsh`给装了。
![powerlevel9l](https://camo.githubusercontent.com/31da002de611cfef95f6daaa8b1baedef4079703/687474703a2f2f6268696c6275726e2e6f72672f636f6e74656e742f696d616765732f323031352f30312f706c396b2d696d70726f7665642e706e67)
![powerlevel9k](https://camo.githubusercontent.com/80ec23fda88d2f445906a3502690f22827336736/687474703a2f2f692e696d6775722e636f6d2f777942565a51792e676966)
<!--more-->

最近公司来了很多新人需要配置Mac环境，让他们先把`iTerm2`+`Zsh`+`oh-my-zsh`给装了。

[iTerm2](http://www.iterm2.com/) 应该是 是 MAC 下最好的终端工具。我的终端固定在上半屏幕，使用cmd+,呼入呼出，再加上一些配色定制，用起来十分过瘾，用习惯之后根本无法适应win了。

而`Zsh`号称是终极shell，功能强大并且兼容`bash`，只不过配置比较复杂，但是如果安装了`oh my zsh`补丁就能轻松起飞。

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
![powerlevel9k](https://camo.githubusercontent.com/80ec23fda88d2f445906a3502690f22827336736/687474703a2f2f692e696d6775722e636f6d2f777942565a51792e676966)

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

如果发现shell还有些乱码的话是因为还需要安装一下 [字体](https://powerline.readthedocs.io/en/latest/installation/linux.html#fonts-installation) 。
[这里](https://github.com/bhilburn/powerlevel9k/wiki/Show-Off-Your-Config#natemccurdys-configuration) 还有更多酷炫的配置

此外, 更多任性的功能, 自己慢慢感受吧。
1. 兼容 bash，原来使用 bash 的兄弟切换过来毫无压力，该咋用咋用。

2. 强大的历史纪录功能，输入 grep 然后用上下箭头可以翻阅你执行的所有 grep 命令。

3. 智能拼写纠正，输入gtep mactalk * -R，系统会提示：zsh: correct ‘gtep’ to ‘grep’ [nyae]? 比妹纸贴心吧，她们向来都是让你猜的……

4. 各种补全：路径补全、命令补全，命令参数补全，插件内容补全等等。触发补全只需要按一下或两下 tab 键，补全项可以使用 ctrl+n/p/f/b上下左右切换。比如你想杀掉 java 的进程，只需要输入 kill java + tab键，如果只有一个 java 进程，zsh 会自动替换为进程的 pid，如果有多个则会出现选择项供你选择。ssh + 空格 + 两个tab键，zsh会列出所有访问过的主机和用户名进行补全

5. 智能跳转，安装了autojump之后，zsh 会自动记录你访问过的目录，通过 j + 目录名 可以直接进行目录跳转，而且目录名支持模糊匹配和自动补全，例如你访问过hadoop-1.0.0目录，输入j hado 即可正确跳转。j –stat 可以看你的历史路径库。

6. 目录浏览和跳转：输入 d，即可列出你在这个会话里访问的目录列表，输入列表前的序号，即可直接跳转。

7. 在当前目录下输入 .. 或 … ，或直接输入当前目录名都可以跳转，你甚至不再需要输入 cd 命令了。

8. 通配符搜索：ls -l **/*.sh，可以递归显示当前目录下的 shell 文件，文件少时可以代替 find，文件太多就歇菜了。

9. 更强的别名

10. 插件支持