<style lang="less">
    #forget {
        width: 100%;
        height: 100%;
        position: relative;
    } 
</style>

<template>
    <div id="forget">
        <login-form 
            :login-form-list="forgetFormList" 
            :login-form="forgetForm" 
            :toast="toast"
            :need-btn="false"
            @sendVerifyCode="sendVerifyCode">
        </login-form>
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
            forgetForm: {
                mobile: '',
                verifyCode: ''
            },
            forgetFormList: [
                {
                    placeholder: '请输入手机号码',
                    src: require('../../assets/images/icon_mobilephone@2x.png'),
                    key: 'mobile'
                },
                {
                    placeholder: '请输入验证码',
                    src: require('../../assets/images/icon_safety@2x.png'),
                    key: 'verifyCode',
                    code: '获取验证码',
                    maxlength: 6,
                    disabled: false
                },
            ],
            toast: {
                show: false,
                type: '',
                span: ''
            }
        }
    },
    methods: {
        // 发送验证码
        async sendVerifyCode () {
            const mobile = this.forgetForm.mobile
            if (!this.validatePhone(mobile)) return
            this.forgetFormList[1].disabled = true
            const res = await this.$http.get(`${this.$base}/message/sys/sendVerification?mobile=${mobile}`)
            if (res) this.setTime()
        },
        setTime () {
            if (!this.seconds) {
                this.forgetFormList[1].code = '获取验证码'
                this.forgetFormList[1].disabled = false
                this.seconds = 60
            } else {
                this.forgetFormList[1].code = this.seconds + 's'
                this.seconds--
                setTimeout(() => {
                    this.setTime()
                },1000)
            }
        },
        validatePhone (phone) {
            const { phoneNumber } = this.$tool.validateReg
            if (!phone) {
                this.toast = {
                    show: true,
                    span: '请先输入手机号',
                    type: 'cancel'
                }
                return false
            } else if (!phoneNumber(phone)) {
                this.toast = {
                    show: true,
                    span: '手机号格式有误',
                    type: 'cancel'
                }
                return false
            }
            return true
        },
    },
    watch: {
        async 'forgetForm.verifyCode' (val) {
            if (val.length === 6) {
                const params = this.forgetForm
                const { data } = await this.$axios.get(`${this.$base}/message/sys/validMessageCode`, { params })
                if (data.code === 0) {
                    this.$router.push({
                        path: '/reset',
                        query: {
                            mobile: this.forgetForm.mobile
                        }
                    })
                } else {
                    this.toast = { 
                        show: true,
                        span: data.msg,
                        type: 'cancel'
                    }
                }
            }
        }
    }
}
</script>
