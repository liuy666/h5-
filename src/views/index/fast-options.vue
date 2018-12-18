<style lang="less">
    #fast-options {
        display: flex;
        margin: 0 30px 100px;
        .img-173-173 {
            width: 173px;
            height: 173px;
            position: relative;
            >img {
                width: 100%;
                height: 100%;
            }
            >div {
                font-size: 26px;
                position: absolute;
                width: 173px;
                text-align: center;
                top: 163px;
                color: rgba(51,51,51,1);
                font-family: 'PingFang-SC-Regular';
            }
        }
    }
</style>


<template>
    <div id="fast-options">
        <div v-for="(item, index) in optionsList" :key="index" class="img-173-173" @click="getOptions(index)">
            <img :src="item.src" alt="">
            <div>{{ item.title }}</div>
        </div> 
    </div>
</template>

<script>
export default {
    data () {
        return {
            optionsList: [
                {
                    src: require('../../assets/images/index/icon_weather@3x.png'),
                    title: '实时天气'
                },
                {
                    src: require('../../assets/images/index/icon_wifi@3x.png'),
                    title: '免费WiFi'
                },
                {
                    src: require('../../assets/images/index/icon_flowers@3x.png'),
                    title: '花草识别'
                },
                {
                    src: require('../../assets/images/index/icon_scan@3x.png'),
                    title: '扫码识景'
                }
            ]
        }
    },
    methods: {
        // 调用微信扫一扫
        wxScanQRCode () {
            wx.scanQRCode({
                desc: 'scanQRCode desc',
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: (res) => {
                    console.log(res)
                },
                error: (err) => {
                    console.log(err)
                    if (err.errMsg.indexOf('function_not_exist') > 0) {
                        alert('版本过低请升级')
                    }
                }
            });
        },
        getOptions (index) {
            alert(index)
            // if (index === 3) {
            //     this.wxScanQRCode()
            // }
        }
    }
}
</script>

