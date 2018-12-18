<style lang="less">
    #season-hot {
        overflow: hidden;
        .title {
            font-size: 36px;
            font-weight: 800;
            color: rgba(0,0,0,1);
            font-family: 'PingFang-SC-Heavy';
            margin-left: 30px;
            letter-spacing: 1px;
        }
        .hot-img {
            margin-top: 40px;
            padding-bottom: 70px; 
            white-space : nowrap;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            .no-scrollbar::-webkit-scrollbar{
                width: 0;
                height: 0;
            }
            .img-290-160 {
                width: 290px;
                height: 160px;
                margin-right: 30px;
                background: rgba(248,248,248,1);
                box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.2);
                border-radius:10px;
                display: inline-block;
                position: relative;
                overflow: hidden;
                >img {
                    width: 100%;
                    height: 100%;
                }
                >div {
                    position: absolute;
                    top: 0;
                    width: 290px;
                    height: 160px;
                    line-height: 160px;
                    text-align: center;
                    font-size: 30px;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(255,255,255,1);
                }
            }
            >:first-child {
                margin-left: 30px;
            }
        }
    }
</style>

<template>
    <div id="season-hot">
        <div class="title">当季热门</div>
        <div class="hot-img">
            <div v-for="(item, index) in hotList" :key="index" class="img-290-160" @click="goScenic(item)" >
                <img :src="item.accessCoverUrl" alt="">
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hotList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods : {
        goScenic (scenicInfo) { 
            this.$emit('goScenicMap',scenicInfo);
        }
    }
}
</script>

