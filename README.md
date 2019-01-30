------
目录：
- [1 项目部署说明](#proInfo)
- [2 预安装](#preinstallation)
- [3 安装](#install)
  - [修改全局变量脚本](#changeScript)
  - [配置证书及分发](#sslCfg)
  - [配置etcd高可用](#etcdCfg)
  - [部署master](#master)
  - [部署node](#node)
  - [master同时做node使用](#master&node)
- [4 部署镜像](#deployment)
- [5 升级](#upgrade)
------

<a name="proInfo"></a>
### 1 项目部署说明
部署以两个master（192.168.6.50、192.168.6.51）和一个node（192.168.6.55）为例进行说明：
- 操作系统：CentOS Linux release 7.6.1810 (Core)  
- 二进制文件安装目录：/usr/k8s/bin/  
- 证书目录：/etc/kubernetes/ssl/  
- 部署服务所在目录：/etc/systemd/system/  
- 部署组件版本说明：  
   Kubernetes:1.8.2  
   Docker:17.03.2  
   Etcd:3.2.22  
   Haproxy:1.5.18  
   Keepalived:1.3.5  
   Flannel:0.9.0  
   
<a name="preinstallation"></a>
### 2 预安装
```bash
#安装docker(所有机器均安装)
#更新软件包
yum update
#用国内阿里云安装
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install -y --setopt=obsoletes=0 \
   docker-ce-17.03.2.ce-1.el7.centos.x86_64 \
   docker-ce-selinux-17.03.2.ce-1.el7.centos.noarch
#安装haproxy（master和backup安装）
yum install -y haproxy
#安装keepalived（master和backup安装）
yum install -y keepalived
```

<a name="install"></a>
### 3 安装

- 修改全局变量脚本
```bash
#在当前目录找到env.sh，手动修改脚本中的以下环境变量为当前部署机器信息
1、	获取BOOTSTRAP_TOKEN
执行以下命令获取：
head -c 16 /dev/urandom | od -An -t x | tr -d ' '
2、	获取MASTER_IPS
即当前集群master机器IP数组，例如当前模拟部署两台master则：
MASTER_IPS="192.168.6.50,192.168.6.51"
3、	APISERVER_IPS
部署apiserver的所有IP数组（注意格式），例如当前模拟部署两个master，则：
APISERVER_IPS='"192.168.6.50","192.168.6.51"'
4、	MASTER_VIP
kube-apiserver 的虚拟ip，可以使用当前集群网段内未占用的任意IP,例如：
MASTER_VIP="192.168.6.30"
5、	VIP_IF
虚拟ip 绑定的网卡 ，这里根据部署机器实际情况选择网卡，使用ip addr可查看当前机器网卡名称,例如：
VIP_IF="ens33"
6、	ETCD_IPS
高可用etcd部署的集群ip,例如模拟部署三台集齐（注意格式），则：
ETCD_IPS='"192.168.6.50","192.168.6.51","192.168.6.55"'
7、	ETCD_ENDPOINTS
etcd集群服务地址列表，同样模拟为三台：
ETCD_ENDPOINTS="https://192.168.6.50:2379,https://192.168.6.51:2379,https://192.168.6.55:2379"
8、	ETCD_NODES
etcd 集群间通信的 IP 和端口,例如：
ETCD_NODES="etcd01=https://192.168.6.50:2380,etcd02=https://192.168.6.51:2380,etcd03=https://192.168.6.55:2380"
```
<a name="sslCfg"></a>
- 配置证书及分发
```bash
#执行生成证书脚本
./create-certs.sh
#将生成证书后的脚本文件分发到其他机器
scp  -r   ./system_install  root@192.168.6.51:/root/
scp  -r   ./system_install  root@192.168.6.55:/root/
```
<a name="etcdCfg"></a>
- 配置etcd高可用
```bash
#配置k8s系统的system环境，在master1、master2、node上均执行，没有先后之分
cd system_install
./setup-system.sh 
#配置高可用etcd,参数含义分别是当前主机ip、etcd名称（注意要和env.sh中etcd名称一致）
#master1
./setup-etcd.sh 192.168.6.50 etcd01
#master2
./setup-etcd.sh 192.168.6.51 etcd02
#node
./setup-etcd.sh 192.168.6.55 etcd03
```
<a name="master"></a>
- 部署master  
作为正常工作时运行的master执行
```bash
cd system_install
cd master/
#配置Kubernetes系统的master环境，命令参数分别为主机ip、主机角色
./setup-k8smaster 192.168.6.50 MASTER
```
作为备份master的主机执行
```bash
cd system_install
cd master
#配置Kubernetes系统的master环境，命令参数分别为主机ip、主机角色
./setup-k8smaster 192.168.6.50 BACKUP
```

<a name="node"></a>
- 部署node
```bash
#配置Kubernetes系统的system环境
cd system_install
cd node/
#配置Kubernetes系统的node环境,参数含义分别是,当前node ip、当前主机是否为master、集群内是否第一次执行本脚本
./setup-k8snode.sh 192.168.6.55 false true 
```

<a name="master&node"></a>
- master同时做node使用
```bash
cd system_install/node/
#配置Kubernetes系统的node环境,参数含义分别是,当前node ip、当前主机是否为master、是否第一次执行
./setup-k8snode.sh 192.168.6.51 true true 
```

<a name="deployment"></a>
### 部署服务


<a name="upgrade"></a>
### 升级




























------
目录：
- [功能介绍🌳](#info)
- [计划完成❄️](#plan)
- [可能实现](#after)
- [问题解答👄](#que)
------
<a name="info"></a>
### 功能介绍🌳
1.博客功能
- 文章
- 项目
- 关于本人
- 免责声明
- 代码高亮并显示代码行 
- 计划功能
   标签云图显示  
   
2.娱乐及辅助功能

> 伊斯特瓦尔-- イストワール： 由Planeptune的初代女神创造的人工生命体，以作为国家的教祖和历史记录者。

- live2d看板娘  
  集成百度图灵AI，可实时对话，当然啦你也可以当成百度全科用，注意要加载提示js脚本  
  可播放音乐（暂时只有一首循环播放）  
  站内访问提示  
  可调戏
- 访问者统计  
  侧边栏三维地球显示实时位置，平铺地图显示历史访问地点  
- 背景网状粒子效果  
  仅在电脑端显示  
- 图片点击可全屏循环显示
- 卜算子一句名言
- 站内搜索功能  
  额...，比较麻烦，后边有时间再做吧，暂时添加个框框自行脑补吧  

<a name="plan"></a>
### 计划完成❄️
2019年01月03日

- 1、首页显示文章简介<br>
- 2、标题显示自适应<br>

2019年01月04日🎄 

- 3、对标签进行云图显示X
- 4、根据标签索引文章X
- 5、制作网站logo<br>
- 6、图片可点击,[图片双击放大](https://www.cnblogs.com/xuyuntao/p/4965818.html)
- 7、左边抽屉不可拖动X
- 8、添加https://twitter.com/
- 9、搜索功能(添加了搜索框，搜索功能要求助baidu)X
- 10、高亮代码可复制、咖啡色、代码行号显示（复制未实现）X
- 11、分网页名称加 |

2019年01月08日

- 12、下滑遮挡地址栏(MDL框架才有这个功能)X
- 13、图片点击设置为自动排版黑箱模式

2019年01月17日 

- 14、使用qt制作手机端
- 15、添加网络电话功能
- 16、添加评论功能

<a name="after"></a>
### 可能实现
放自己喜欢的mv\音乐\视频\书籍

<a name="que"></a>
### 问题解答👄
<details>
  <summary>为什么叫「梧桐部落」？</summary>

- 因为想引凤凰来啊！有点尴尬...,咳咳，其实本人老家叫梧桐村，梧桐部落更亲切，同时楼主也希望以后能打造一个更完美的网站，使每一个访客都有家的感觉。
</details>

<details>
  <summary>为什么搜索功能不能用？</summary>

- 这是某种神秘力量导致的 bug，我修复不了。
</details>

<details>
  <summary>为什么看板娘手机端不能显示？</summary>

- 那么小的屏，有可爱的小萝莉看，谁还看我的博客，哼！
</details>

<details>
  <summary>我想构建一个自己的博客，但懒的动？</summary>

- 这个，看我开源的[blog主题](https://github.com/RobinSea/HugoMDLSinicization)。
</details>

<details>
  <summary>楼主是做前端的吗？</summary>

- 不是，一搬运工而已
</details>

<details>
  <summary>开门，快递/查水表/社区送温暖/清华大学录取通知书！</summary>

- 没有网购，家里长期停水没有水表，天气太热了不需要社区送温暖，考不上清华没有录取通知书。
</details>

博客作为私人使用，为了追求个性，不会完全放出来，还请各位看官见谅

