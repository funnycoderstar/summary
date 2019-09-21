## 一. Nginx简介

启动和停止Nginx 

Nginx目前只支持命令行操作,进入Nginx部署目录
1. 启动Nginx: start nginx
2. 停止Nginx: nginx -s stop
3. 修改配置后重新启动: nginx -s reload

## 二. nginx.conf配置文件

Nginx配置文件主要分为四部分: main(全局设置),http(HTTP的通用设置),server(虚拟主机设置),location(匹配URL路径).还有一些其他的配置段,如event, upstream等;

1.通用设置

