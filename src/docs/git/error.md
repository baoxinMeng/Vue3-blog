---
title: "错误汇总"
description: ""
summary: ""
date: 2024-04-19T16:08:37+08:00
lastmod: 2024-04-19T16:08:37+08:00
draft: false
weight: 999
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

1.

```shell
ssh: connect to host github.com port 22: Connection refused
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

```shell
$ vim ~/.ssh/config

# Add section below to it

Host github.com
Hostname ssh.github.com
Port 443


```

### clone error

###### fatal: unable to access 'https://github.com/': SSL certificate problem: unable to get local issuer certificate

这个问题是由于没有配置信任的服务器 HTTPS 验证。默认 cURL 被设为不信任任何 CAs，就是说，它不信任任何服务器验证。执行下面的命令就可以解决：

```shell
$ git config --global http.sslVerify false
```
