# zhsTimingtool

对安卓手机知道网课进行自动计时

## 编译环境:

auto.js V4 以及相应的打包工具。

## 编译配置：

### 配置文件:

project.json：

```javascript
{
    "name": "智慧树计时脚本",
    "main": "main.js",	    //编译的js
    "ignore": [
        "build"
    ],
    "packageName": "com.yushao.zhs",
    "versionName": "2.6.alpha2",
    "versionCode": 2,
    "encryptLevel": 1,      //是否加密 1是 0否
    "icon": "res/icon.png",	//应用图标
    "launchConfig": {
        "displaySplash": false, 
        "hideLogs": true, 
        "splashIcon": "res/splashIcon.png", 
        "splashText": "智慧树计时脚本",
        "stableMode": false
    },
    "optimization": { 
        "removeOpenCv": true, 
        "unusedResources": true
    }
}
```

## 其他提示

音量上键强制停止脚本运行。
