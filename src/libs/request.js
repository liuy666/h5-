import axios from 'axios'
import store from '@/store/store';

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 20000
})

instance.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    return res 
}, err => {
    return Promise.reject(err)
})

function checkStatus (res) {
    if (res.status === 200 || res.status === 304) {
        return res
    }
}

function checkCode ({ data }) {
    if (data.code) {   // 后台接口code码返回0为正常，故此对错误统一处理
        store.commit('SHOW_TOAST', {
            value: true,
            type: 'cancel',
            text: data.msg
        })
    }
    return data
}

export default {
    get (url, params) {
        return instance.get(url, { params }).then(checkStatus).then(res => checkCode(res))
    },
    post (url, params) {
        return instance.get(url, params).then(checkStatus).then(res => checkCode(res))
    }
}
