<style lang="less">
    #index-page {
        overflow: hidden;
        padding-bottom: 150px;
    }
</style>

<template>
    <div id="index-page">
        <search-input></search-input>
        <three-d-swiper ref="threeDSwiper" :banner-list="bannerList"></three-d-swiper>
        <fast-options></fast-options>
        <season-hot :hot-list="hotList"></season-hot>
        <all-scenic-spot :scenic-spot-list="scenicSpotList"></all-scenic-spot>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
import searchInput from '@/components/searchInput'
import threeDSwiper from './3d-swiper'
import fastOptions from './fast-options'
import seasonHot from './season-hot'
import allScenicSpot from './all-scenic-spot'
import footerNav from '@/components/FooterNav'
import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import crypto from '@/libs/crypto'
export default {
    components: {
        searchInput,
        fastOptions,
        seasonHot,
        allScenicSpot,
        threeDSwiper,
        footerNav
    },
    data () {
        return {}
    },
    computed: {
        ...mapState({
            bannerList: state => state.indexPage.bannerList,
            hotList: state => state.indexPage.hotList,
            scenicSpotList: state => state.indexPage.scenicSpotList
        })
    },
    methods: {
        ...mapActions([
            'getBannerList',  // 获取轮播图
            'getSceneryList'  // 获取景区信息
        ]),
        // 获取微信参数
        async getWxConfig () {
            if (!Cookies.get('ticket')) {
                const { data } = await this.$axios.get(`${this.$base}/app/getWxAccessToken`)
                if (data && data.code === 0) {
                    Cookies.set('ticket', data.ticket, {expires: parseInt(data.expires_in) / 3600});
                } else {
                    alert('获取jsapi_ticket失败！')
                }
            }
        },
        // 配置所需微信sdk接口
        wxInit () {
            const jsapi_ticket = Cookies.get('ticket');
            const noncestr = 'liuy666comwhosyourdaddy';
            const timestamp = Date.parse(new Date());
            const url = location.href.split('#')[0];
            const newString = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
            const signature = crypto.getSHA1String(newString);
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx32ec1b2c78c4270a', // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名
                jsApiList: [ // 必填，需要使用的JS接口列表
                    'scanQRCode', // 微信扫一扫
                ] 
            });
        }
    },
    async created () {
        await this.getBannerList()
        await this.getSceneryList({hot: 1})
        await this.getSceneryList()
        // await this.getWxConfig()
        // this.wxInit()
    }
}
</script>

