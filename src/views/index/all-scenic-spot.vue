<style lang="less">
@import '../../styles/theme';
    #all-scenic-spot {
        margin: 0 30px;
        .title {
            font-size: 36px;
            font-weight: 800;
            color: rgba(0,0,0,1);
            font-family: 'PingFang-SC-Heavy';
            letter-spacing: 1px;
            margin-bottom: 40px;
        }
        .scenic-spot {
            border-radius:20px;
            margin-bottom: 70px;
            position: relative;
            box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.2);
            .img-80-80 {
                width: 80px;
                height: 80px;
                position: absolute;
                bottom: -40px;
                right: 24px;
                >img {
                    width: 100%;
                    height: 100%;
                }
            }
            .name {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                height: 29px;
                >span {
                    font-size: 30px;
                    font-family: 'PingFang-SC-Heavy';
                    font-weight: 800;
                }
                .level {
                    width: 34px;
                    height: 28px;
                    line-height: 1;
                    margin-left: 10px;
                    background: @primary-color;
                    font-size: 20px;
                    font-family: 'PingFang-SC-Bold';
                    color: rgba(255,255,255,1);
                    box-shadow: 0px 2px 5px 0px rgba(250,79,4,0.6);
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .address {
                display: flex;
                align-items: center;
                height: 28px;
                .img-24-28 {
                    width: 24px;
                    height: 28px;
                    margin-right: 10px;
                    >img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                >span {
                    font-size: 26px;
                    font-family: 'PingFang-SC-Medium';
                    font-weight: 500;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow:hidden;
                }
            }
            .speak-point {
                display: flex;
                align-items: center;
                height: 24px;
                .img-24-24 {
                    width: 24px;
                    height: 24px;
                    margin-right: 14px;
                    >img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                >span {
                    font-size: 26px;
                    font-family: 'PingFang-SC-Medium';
                    font-weight: 500;
                }
            }
        }
        .big-img {
            width: 630px;
            height: 340px;
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: rgba(255,254,254,1);
            letter-spacing: .5px;
            .name-address {
                .address {
                    >span {
                        width: 485px;
                    }
                }
            }
        }
        .small-img {
            width: 690px;
            height: 200px;
            background: rgba(255,255,255,1);
            display: flex;
            .scenic-spot-img {
                width: 200px;
                height: 200px;
                border-radius: 20px 0 0 20px;
            }
            .introduce {
                margin: 20px 0 20px 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color: rgba(51,51,51,1);
                .name {
                    margin: 0;
                }
                .point-address {
                    height: 68px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .address {
                        height: 28px;
                        >span {
                            width: 329px;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="all-scenic-spot">
        <div class="title">全部景区</div>
        <div v-for="(item, index) in scenicSpotList" 
            :key="index" 
            :class="index%5 ? 'small-img' : 'big-img'" 
            class="scenic-spot"
            :style="{backgroundImage: `url(${index%5 ? '' : item.accessCoverUrl})`, backgroundSize:'100% 100%'}">
            <template v-if="index%5 === 0">
                <div class="speak-point">
                    <div class="img-24-24">
                        <img src="../../assets/images/index/icon_headset_white@3x.png" alt="">
                    </div>
                    <span>{{ item.guideCount }}个讲解点</span>
                </div>
                <div class="name-address">
                    <div class="name">
                        <span>{{ item.name }}</span>
                        <div class="level">{{ item.level }}</div>
                    </div>
                    <div class="address">
                        <div class="img-24-28">
                            <img src="../../assets/images/index/icon_location_white@3x.png" alt="">
                        </div>
                        <span>{{ item.regionName + item.address }}</span>
                    </div>
                </div>
                <div class="img-80-80">
                    <img src="../../assets/images/index/icon_play@3x.png" alt="">
                </div>
            </template>
            <template v-else>
                <div class="scenic-spot-img" :style="{backgroundImage: `url(${item.accessCoverUrl})`, backgroundSize:'100% 100%'}"></div>
                <div class="introduce">
                    <div class="name">
                        <span>{{ item.name }}</span>
                        <div class="level">{{ item.level }}</div>
                    </div>
                    <div class="point-address">
                        <div class="speak-point">
                            <div class="img-24-24">
                                <img src="../../assets/images/index/icon_headset_black@3x.png" alt="">
                            </div>
                            <span>{{ item.guideCount }}个讲解点</span>
                        </div>
                        <div class="address">
                            <div class="img-24-28">
                                <img src="../../assets/images/index/icon_location_black@3x.png" alt="">
                            </div>
                            <span>{{ item.regionName + item.address }}</span>
                        </div>
                    </div>
                </div>
                <div class="img-80-80">
                    <img src="../../assets/images/index/icon_play@3x.png" alt="">
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        scenicSpotList: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>
