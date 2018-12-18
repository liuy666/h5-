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
        ])
    },
    async created () {
        await this.getBannerList()
        await this.getSceneryList({hot: 1})
        this.getSceneryList()
    }
}
</script>

