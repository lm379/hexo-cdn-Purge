## hexo腾讯云CDN提交刷新插件

```
npm install hexo-tencent-cdn-Purge
```

在站点的_config.yml中添加配置

```ymal
tencent_cdn:
 secretId: 'your secretId' # 你在https://console.cloud.tencent.com/cam/capi 获取到的ID
 secretKey: 'your secretKey' # 你在https://console.cloud.tencent.com/cam/capi 获取到的SecretKey
 FlushType: flush # 刷新方式,flush为只刷新变更资源,delete为刷新网站下的全部缓存
 timer: 100 # 延时器,单位为毫秒,延时多长时间再执行刷新命令,不需要的填写0
 PurgePath: 'https://www.example.com' # 需要刷新的链接，不支持多个，必须有http或者https协议头

```

deploy字段最后面添加

```ymal
 type: tencent_cdn
```

执行

```
hexo clean && hexo g && hexo d
```

![](https://r2.lm379.cn/2024/05/32238c3011b7f1bb4092a4e42e621e0a.png)
