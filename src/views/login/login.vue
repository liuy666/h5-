<style lang="less">
    #login-page {
        width: 100%;
        height: 100%;
        position: relative;
        .logo {
            padding: 0 24px;
            height: 88px;
            background: @primary-color;
        }
        .two-options {
            display: flex;
            justify-content: space-between;
            margin-top: 53px;
            font-size: 26px;
            color: #333333;
            padding: 0 93px;
        }
    } 
</style>

<template>
    <div id="login-page">
        <div class="logo">
            <img src="" alt="">
        </div>
        <login-form 
            :login-form-list="loginFormList" 
            :login-form="loginForm" 
            :toast="toast" 
            @formSubmit="login">
        </login-form>
        <div class="two-options">
            <span @click="goToRegister()">用户注册</span>
            <span @click="goToForget()">忘记密码</span>
        </div>
    </div>
</template>

<script>
import loginForm from './loginForm'
export default {
    components: {
        loginForm
    },
    data () {
        return {
            loginForm: {
                mobile: '',
                password: ''
            },
            loginFormList: [
                {
                    placeholder: '请输入手机号码',
                    src: require('../../assets/images/icon_mobilephone@2x.png'),
                    key: 'mobile'
                },
                {
                    placeholder: '请输入密码',
                    src: require('../../assets/images/icon_password@2x.png'),
                    type: 'password',
                    key: 'password'
                }
            ],
            toast: {
                show: false,
                type: '',
                span: ''
            }
        }
    },
    methods: {
        async login (form) {
            const { data } = await this.$axios.post(`${this.$base}/hqyatu-navigator/app/login`, form)
            if (data.code === 0) {
                alert('登录成功！')
            } else {
                this.toast = {
                    show: true,
                    type: 'cancel',
                    span: data.msg
                }
            }
        },
        goToRegister () {
            this.$router.push({
                name: 'register'
            })
        },
        goToForget () {
            this.$router.push({
                name: 'forget'
            })
        }
    }
}
</script>
