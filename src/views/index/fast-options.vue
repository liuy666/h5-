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
        <div v-for="(item, index) in optionsList" :key="index" class="img-173-173">
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
    }
}
</script>

