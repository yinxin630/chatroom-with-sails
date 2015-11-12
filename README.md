# chatroom-with-sails
一个基于sails框架编写的简易Web聊天室

# 使用说明
首先确定机器上已经安装了Node.js和Sails框架

1. clone项目（URL:https://github.com/yinxin630/chatroom-with-sails/）
2. 在终端中跳转到项目目录（*cd chatroom-with-sails*）
3. Windows系统可能需要创建.tmp目录（在我自己的WIN7x64上，grunt会因为无法找到.tmp而报错）
3. 安装依赖（*npm install*）
4. 安装数据库模块（*npm install sails-memory*）
5. 如果grunt报错请安装一次grunt，如果执行过第3步后grunt仍报错找不到某组件，请单独安装此组件（*npm install grunt | other*）