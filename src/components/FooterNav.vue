<style lang="less">
    #footerNav {
        width: 720px;
        height: 93px;
        background: rgba(255,255,255,1);
        box-shadow: 0px -1px 2px 0px rgba(32,32,32,0.1);
        position: fixed;
        bottom: 0;
        padding: 5px 15px 0;
        // padding-bottom: env(safe-area-inset-bottom);
        >ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            >li {
                display: flex;
                flex-direction: column;
                align-items: center;
                .img-55-55 {
                    width: 55px;
                    height: 55px;
                    >img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .img-72-72 {
                    width: 72px;
                    height: 72px;
                    >img {
                        width: 100%;
                        height: 100%;
                    }
                }
                >span {
                    font-size: 24px;
                    font-family: 'PingFang-SC-Regular';
                    font-weight: 400;
                    color: rgba(59,68,77,1);
                }
            }
        }
    }
    @supports (bottom: env(safe-area-inset-bottom)) {
        #footerNav {
            padding-bottom: env(safe-area-inset-bottom);
        }
    }
</style>

<template>
    <div id="footerNav">
        <ul>
            <li>
                <div class="img-55-55">
                    <img src="../assets/images/index/icon_home_normal@3x.png" alt="">
                </div>
                <span>首页</span>
            </li>
            <li>
                <div class="img-55-55">
                    <img src="../assets/images/index/icon_tour_guide@3x.png" alt="">
                </div>
                <span>找导游</span>
            </li>
            <li>
                <div class="img-55-55">
                    <img src="../assets/images/index/icon_destination@3x.png" alt="">
                </div>
                <span>目的地</span>
            </li>
            <li @click="goToLogin">
                <div class="img-55-55">
                    <img src="../assets/images/index/icon_me@3x.png" alt="">
                </div>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        goToLogin () {
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>

