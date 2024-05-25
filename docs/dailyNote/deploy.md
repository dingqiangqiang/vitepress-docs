# 部署
## SSH 登录服务器
```sh
ssh 用户名@公网ip: ssh root@39.97.104.2
输入密码
# ubuntu 系统，安装 git
apt-get install git
# 下载代码
git clone xx.git
# ubuntu，安装 node
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
## 进入代码目录
npm install 
# 启动
npm run dev
# 假设端口在3000,通过公网 ip + 端口访问
39.97.104.2:3000
```
## 用 nginx 实现端口转发
背景: 外网3000端口没开放，无法访问，只开放了80端口，使用 nginx 把外网80端口转发到内网3000端口
```sh
## 进入代码目录，安装 nginx
apt-get install nginx
# 检查配置文件格式是否正确
nginx -t 
# 打开 nginx 配置文件 
vim /etc/nginx/nginx.conf
http {
    server {
        listen 80;
        server_name localhost;
        location / {
            proxy_pass http://127.0.0.1:3000;
        }
    }
}
# 保存退出
:wq
# 重启
service nginx restart 或 service nginx reload
# 3000 端口启动
npm run dev
# 外网通过 80 端口访问
39.97.104.2
```
## [使用 PM2 管理进程](https://pm2.fenxianglu.cn/docs/start)
```sh
# 进入代码目录，安装 pm2
npm install pm2 -g
# 通过 pm2 启动应用程序
pm2 start app/index.js(简写为 pm2 start app)
# pm2 常用命令
# 列出所有正在运行的应用程序
pm2 list or pm2 [list|ls|l|status]

# 停止指定的应用程序
pm2 stop app
pm2 stop [AppName]
# 停止多个应用程序
pm2 stop app1 app3 app4
# 停止所有
pm2 stop all

# 删除应用程序
pm2 delete app
# 删除全部
pm2 delete all

# 重启应用程序
pm2 restart app
# 重启多个应用程序
pm2 restart app1 app3 app4
# 重启所有应用程序
pm2 restart all
# 0秒停机重载(重新启动所有进程，始终保持至少一个进程在运行)
pm2 reload app

# 监控面板(监控应用程序资源使用情况)
pm2 monit
# 设置环境变量
NODE_ENV=production pm2 start app --update-env
console.log(process.env.NODE_ENV)
# 日志
pm2 log app
## 自定义日期格式的日志
NODE_ENV=production pm2 start app --update-env --log-date-format "YYYY-MM-DD HH:mm"
pm2 log app
```

   