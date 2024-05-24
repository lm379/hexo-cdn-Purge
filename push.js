// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
module.exports = function (args) {
    var tencentcloud = require("tencentcloud-sdk-nodejs-cdn");
    var CdnClient = tencentcloud.cdn.v20180606.Client;
    var config = this.config;
    var secretId = config.tencent_cdn.secretId;
    var secretKey = config.tencent_cdn.secretKey;
    var FlushType = config.tencent_cdn.FlushType;
    var timer = config.tencent_cdn.timer;
    var url = config.tencent_cdn.PurgePath;

    if (FlushType == 'flush'){
      console.log('当前刷新的方式为:刷新变更资源');
    } else if (FlushType == 'delete') {
      console.log('当前刷新的方式为:刷新全部资源');
    } else {
      console.log('FlushType字段配置错误，请检查配置文件');
      process.exit(1); // 终止程序
    }
    console.log('当前刷新的目录为:' + url);
    
    const clientConfig = {
        credential: {
          secretId: secretId,
          secretKey: secretKey,
        },
        region: "", // 必须为空
        profile: {
          httpProfile: {
            endpoint: "cdn.tencentcloudapi.com",
          },
        },
      };


    console.log('当前需要等待' + timer + '毫秒后自动开始刷新cdn缓存');
    setTimeout(() => {
        const client = new CdnClient(clientConfig);
        const params = {
            "Paths": [url],
            "FlushType": FlushType
        };
        client.PurgePathCache(params).then(
            (data) => {
                console.log("CDN刷新成功\n", data);
            },
            (err) => {
                console.error("CDN刷新失败\n", err);
            }
        );
    }, timer);
};
