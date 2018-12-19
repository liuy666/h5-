import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app.js';
import indexPage from './modules/indexPage.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        toast: {
            value: false,
            type: 'cancel',
            text: ''
        }
	},
	mutations: {
        SHOW_TOAST (state, toast) {
            state.toast = toast
        }
	},
	actions: {

	},
	modules: {
        app,
        indexPage
	}
});
