<style lang="less">
@import 'swiper/dist/css/swiper.css';
    #swiper {
        width: 100%;
        padding-bottom: 27px;
        .swiper-slide {
            width: 650px !important;
            height: 300px;
            margin: 0 auto;
            border-radius: 20px;
            background: rgba(255,255,255,1);
            box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            >img {
                width: 100%;
                height: 100%
            }
        }
        .swiper-pagination-bullets {
            display: flex;
            align-items: center;
            bottom: 47px;
            left: auto;
            right: 70px;
            width: auto;
        }
        .swiper-pagination-bullet {
            background: rgba(255,255,255,1);
            opacity: 0.8;
            &-active {
                width: 24px;
                background:rgba(255,255,255,1);
                opacity: 1;
                border-radius:4px;
            }
        }
    }
</style>

<template>
    <swiper id="swiper" ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="item in bannerList" :key="item.url">
            <img :src="item.accessUrl" :alt="item.title" @click="goToWhere(item.title)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    props: {
        bannerList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
            swiperOption: {
                init: false,
                pagination: {
                    el: '.swiper-pagination',
                },
                slidesPerView: 'auto',
                centeredSlides: true,
                autoplay: {
                    disableOnInteraction: false,
                },
                loop: true,
                loopedSlides: 3,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: -25,
                    depth: 69,
                    modifier: 2,
                    slideShadows : false
                },
            }
        }
    },
    computed: {
        swiper () {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        init () {
            this.swiperOption.loopedSlides = this.bannerList.length
            this.$nextTick(() => {
                this.swiper.init()
            })
        },
        goToWhere (address) {
            alert(address)
        }
    },
    mounted () {
        if (this.bannerList.length) this.init()
    },
    watch: {
        bannerList () {
            this.init()
        }
    }
}
</script>

