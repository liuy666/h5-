// 引入基础框架
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/store';
import Cookies from 'js-cookie';

// 引入全局样式和基础样式
import '@/styles/baseStyle.css';
import '@/styles/globalStyle.less';

// 引入工具类js
import QS from 'qs';
import utils from '@/libs/utils.js';
import https from '@/libs/http.js';
import axios from '@/libs/request.js';

Vue.config.productionTip = false;
Vue.prototype.$QS = QS;
Vue.prototype.$tool = utils;
Vue.prototype.$http = https;
Vue.prototype.$axios = axios;
Vue.prototype.$base = process.env.NODE_ENV === "production" ? '/' : '/api';
const VueTouch = require('vue-touch');
Vue.use(VueTouch, { name: 'v-touch' })

const vm = new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$store.commit('INIT_CONTENT'); // 初始化设置消息详情内容
        if (!localStorage.getItem('initState')) {
            this.$store.commit('SAVE_STATE');
        }
    }
}).$mount('#app');

export default vm;