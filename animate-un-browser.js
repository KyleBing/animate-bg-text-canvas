

class AnimateUn {
    /**
     * @param hMin 颜色 h 最小值
     * @param hMax 颜色 h 最大值
     * @param sizeMin 文字最小值
     * @param sizeMax 文字最大值
     * @param bgColor 背景颜色
     */
    constructor(bgColor, hMin, hMax,  sizeMin = 50, sizeMax = 350) {
        this.isPlaying = true // 默认自动播放

        this.mouseX = 0
        this.mouseY = 0

        this.configFrame = {
            width : 1200,
            height: 300,
            bgColor: bgColor
        }
        this.configText = {
            fontSize: 40,

            characterWidth: 40,
            characterHeight: 40,
            timeLine: 0,                           // 时间线

            timeInit: new Date().getTime(),

            x: 50,                                 // 位置 x
            y: 50,                                 // 位置 y
            width: 200,                            // text 大小
            height: 200,                           // text 大小
                                                   // 大小
            sizeMin: isNaN(sizeMin) ?50: sizeMin,  // 最小值
            sizeMax: isNaN(sizeMax) ?350: sizeMax, // 最大值

            // 颜色
            colorSaturate: 100,                    // 颜色饱和度 0-100
            colorLight: 60,                        // 颜色亮度 0-100
            hMin: isNaN(hMin) ?0: hMin,          // 色值最小
            hMax: isNaN(hMax) ?360: hMax,          // 色值最大
            minOpacity: 20,                        // 透明度最小 %
            maxOpacity: 100,                       // 透明度最大 %
            opacityGrowth: 5,                      // 透明度增长值

            characterArrayString: '10',
            characterArray: [],

        }

        this.init()

        window.onresize = () => {
            this.configFrame.height = innerHeight * 2
            this.configFrame.width = innerWidth * 2
            let textLayer = document.getElementById('textLayer')
            this.updateFrameAttribute(textLayer)
        }
    }

    play(){
        if (this.isPlaying){

        } else {
            this.isPlaying = true
            this.draw()
        }
    }
    stop(){
        this.isPlaying = false
    }

    moveDown(){
        this.configText.flowDirection = -1
    }
    moveUp(){
        this.configText.flowDirection = 1
    }

    speedUp(){}
    speedDown(){}

    destroy(){
        this.isPlaying = false
        let textLayer = document.getElementById('textLayer')
        textLayer.remove()
        console.log('动画已停止')
    }

    updateFrameAttribute(textLayer){
        textLayer.setAttribute('id', 'textLayer')
        textLayer.setAttribute('width', this.configFrame.width)
        textLayer.setAttribute('height', this.configFrame.height)
        textLayer.style.width = `${this.configFrame.width / 2}px`
        textLayer.style.height = `${this.configFrame.height / 2}px`
        textLayer.style.zIndex = '-3'
        textLayer.style.userSelect = 'none'
        textLayer.style.position = 'fixed'
        textLayer.style.top = '0'
        textLayer.style.left = '0'
    }


    init(){
        this.configFrame.height = innerHeight * 2
        this.configFrame.width = innerWidth * 2

        let textLayer = document.createElement("canvas")
        this.updateFrameAttribute(textLayer)
        document.documentElement.append(textLayer)

        this.configText.timeLine =  0
        this.configText.characterArray = this.configText.characterArrayString.split('')

        this.draw()
        document.documentElement.addEventListener('mousemove', event => {
            this.mouseX = event.x
            this.mouseY = event.y
        })
    }



    draw() {

        if (this.configText.timeLine % 1 === 0){
            // text layer
            let canvasText = document.getElementById('textLayer')
            let contextText = canvasText.getContext('2d')
            contextText.clearRect(0, 0, this.configFrame.width, this.configFrame.height)

            // 背景，没有 bgColor 的时候，背景就是透明的
            if (this.configFrame.bgColor){
                contextText.fillStyle = this.configFrame.bgColor
                contextText.fillRect(0,0,this.configFrame.width, this.configFrame.height)
            }

            contextText.font = `${this.configText.fontSize}px Impact`
            // contextText.font = `${this.configText.fontSize}px JetbrainsMono`
            let width = this.configFrame.width / this.configText.characterWidth
            let height = this.configFrame.height / this.configText.characterHeight

            for (let i=0;i<width;i++) {
                for (let j = 0; j < height; j++) {
                    contextText.fillStyle = randomColor(this.configText.hMin, this.configText.hMax,this.configText.minOpacity, this.configText.maxOpacity)
                    contextText.fillText(randomChoiceFromArray(this.configText.characterArray), i * this.configText.characterWidth, j * this.configText.characterHeight)
                }
            }
        } else {

        }

        // 建立自己的时间参考线，消除使用系统时间时导致的切换程序后时间紊乱的情况
        this.configText.timeLine = this.configText.timeLine + 1

        if (this.isPlaying) {
            window.requestAnimationFrame(() => {
                this.draw()
            })
        }
    }

}

/**
 * 随机返回数组任一元素
 * @param array
 * @returns {*}
 */
function randomChoiceFromArray(array){
    let randomIndex = Number(Math.random() * (array.length - 1)).toFixed(0)
    return array[randomIndex]
}


/**
 * 随机颜色值
 * @returns string
 */
function randomColor(hMin, hMax, opacityMin, opacityMax){
    let randomH = randomInt(hMin, hMax)
    let randomOpacity = randomInt(opacityMin, opacityMax)
    return `hsl(${randomH}, 100%, 50%, ${randomOpacity}%)`
}


/**
 * 输出随机 1 或 -1
 * @returns {number}
 */
function randomDirection(){
    let random = Math.random()
    if (random > 0.5){
        return 1
    } else {
        return -1
    }
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomInt(min, max){
    return Number((Math.random() * (max - min) + min).toFixed(0))
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function randomFloat(min, max){
    return Number(Math.random() * (max - min) + min)
}
