import axios from 'axios'

const indexPage = {
    state: {
        bannerList: [],
        hotList: [],
        scenicSpotList: []
    },
    mutations: {
        GET_BANNER_LIST (state, list) {
            state.bannerList = list
        },
        GET_HOT_LIST (state, list) {
            state.hotList = list
        },
        GET_SCENIC_SPOT_LIST (state, list) {
            state.scenicSpotList = list
        },
    },
    actions: {
        // 获取轮播图
        async getBannerList ({ state, commit, rootState }) {
            if (state.bannerList.length) return
            const params = {
                page: 1,
                limit: 6,
                status: 1
            }
            const { data } = await axios.get(`${rootState.base}/app/hqbanner/list`, { params })
            if (data && data.code === 0) {
                commit('GET_BANNER_LIST', data.page.list) 
            }
        }, 
        // 获取景区列表
        async getSceneryList ({ state, commit, rootState }, hot) {
            if (hot && state.hotList.length) return
            if (!hot && state.scenicSpotList.length) return
            const params = {
                page: 1,
                limit: 10000,
                ...hot
            }
            const { data } = await axios.get(`${rootState.base}/app/scenery/queryAll`, { params })
            if (data && data.code === 0) {
                const list = data.page.list
                commit(hot ? 'GET_HOT_LIST' : 'GET_SCENIC_SPOT_LIST', list)
            }
        }
    }
}

export default indexPage