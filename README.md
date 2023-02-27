# animate-un
动画文字背景

![image](https://user-images.githubusercontent.com/12215982/221488316-821c64b5-0c34-49d4-9903-f44531d6a4c4.png)

> 演示地址： [https://kylebing.cn/test/animate-bg-text-canvas/](https://kylebing.cn/test/animate-bg-text-canvas/)  


## API

```js

/**
 @param hMin 颜色 h 最小值
 @param hMax 颜色 h 最大值
 @param sizeMin 文字最小值
 @param sizeMax 文字最大值
 @param bgColor 背景颜色
 */
let animatedTextBg = new AnimateBgTextCanvas(bgColor, hMin, hMax,  sizeMin = 50, sizeMax = 350)

// hMin hMax 对应 hue 的颜色值


// 其它操作
animatedTextBg.play()        // 心动起来
animatedTextBg.stop()        // 心不动
```


## 使用说明

### 1. 浏览器
使用 `animate-bg-text-canvas-browser.js` 这个文件
```js
// 新建对象时，会自动呈现动画效果
let animatedTextBg = new AnimateBgTextCanvas()

```

### 2. Vue

```bash
npm i animate-bg-text-canvas
```

```js
import {AnimateBgTextCanvas} from "animate-bg-text-canvas"

export default {
    mounted() {
        this.height = innerHeight
        this.animatedTextBg = new AnimateBgTextCanvas()
    },
    beforeDestroy() {
        this.animatedTextBg.destroy()
    }
}
```

## log
- 2023-02-27 v0.0.1


## TODO
- [ ] 鼠标交互

