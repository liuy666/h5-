<style lang="less">
    #search-input{
        margin: 23px 50px 50px;
        // padding: 0 20px;
        width: 650px;
        height: 60px;
        background:rgba(255,255,255,1);
        box-shadow:0px 8px 32px 0px rgba(0, 0, 0, 0.08);
        border-radius:20px;
        display: flex;
        align-items: center;
        position: relative;
        .img-32-34 {
            width: 32px;
            height: 34px;
            margin: 0 21px 0 20px;
            > img {
                width: 100%;
                height: 100%;
            }
        }
        input {
            font-size: 24px;
            width: 502px;
        }
        .img-34-34 {
            width: 34px;
            height: 34px;
            position: absolute;
            right: 20px;
            >img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>


<template>
    <div id="search-input">
        <div class="img-32-34">
            <img src="../assets/images/icon_so@2x.png" alt="">
        </div>
        <form action="javascript:;">
            <input ref="searchInput" v-model="search.key" @keyup.13="searchList" type="search" :placeholder="search.placeholder" />
        </form>
        <div v-if="search.key" class="img-34-34" @click="clearInput">
            <img src="../assets/images/icon_close@2x.png" alt="" />
        </div>
    </div>
</template>

<script>
import { Search } from 'vux'
export default {
    components: {
        Search
    },
    props: {
        search: {
            type: Object,
            default: () => {
                return {
                    key: '',
                    placeholder: '搜索目的地和景区'
                }
            }
        }
    },
    data () {
        return {}
    },
    methods: {
        clearInput () {
            this.search.key = ''
            // this.$emit('clearInput')
        },
        async searchList () {
            const { data } = await this.$axios.get(`${this.$base}/hqyatu-navigator/app/querySceneryAndRegion/${this.search.key}`)
            alert(data.msg)
            this.$refs.searchInput.blur();
        }
    }
}
</script>
