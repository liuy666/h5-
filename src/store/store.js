import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app.js';
import indexPage from './modules/indexPage.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        base: process.env.NODE_ENV === "production" ? '/' : '/api'
	},
	mutations: {

	},
	actions: {

	},
	modules: {
        app,
        indexPage
	}
});
