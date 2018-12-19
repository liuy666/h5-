<style lang="less">
    #register {
        .agreement {
            padding: 0 93px;
            margin-top: 53px;
            font-size: 26px;
        }
        .vux-check-icon {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .vux-check-icon>.weui-icon-success-circle:before, .vux-check-icon>.weui-icon-success:before {
            color: @primary-color;
            font-size: 34px;
        }
        .weui-icon-circle {
            font-size: 34px;
        }
        // 带图标信息提示
        .vux-toast .weui-toast { // 提示框
            top: @toast-top;
            width: 228px!important;
            height: 170px!important;
        }
        .vux-toast .weui-icon_toast { // 提示框icon图片容器
            margin-top: 28px;
        }
        .vux-toast .weui-icon_toast:before { // 提示框icon图片
            font-size: 60px;
        }
        .vux-toast .weui-toast__content { // 提示框文本信息
            margin: 22px 0 0 0;
            font-size: 28px;
        }
    }
</style>

<template>
    <div id="register">
        <login-form 
            :login-form-list="registerFormList" 
            :login-form="registerForm"
            :btn-disabled="btnDisabled" 
            :btn-label="btnLabel"
            @sendVerifyCode="sendVerifyCode" 
            @formSubmit="register">
        </login-form>
        <div class="agreement">
            <check-icon :value.sync="isAgree">同意《平台用户协议》</check-icon>
        </div>
    </div>
</template>

<script>
import { CheckIcon } from 'vux'
import loginForm from './loginForm'
export default {
    components: {
        CheckIcon,
        loginForm
    },
    data () {
        return {
            registerForm: {
                mobile: '',
                verifyCode: '',
                password: ''
            },
            registerFormList: [
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
                    disabled: false
                },
                {
                    placeholder: '请输入密码',
                    src: require('../../assets/images/icon_password@2x.png'),
                    type: 'password',
                    key: 'password'
                }
            ],
            btnDisabled: false,
            btnLabel: '注册',
            isAgree: true,
            seconds: 60
        }
    },
    methods: {
        // 发送验证码
        async sendVerifyCode () {
            const mobile = this.registerForm.mobile
            if (!this.validatePhone(mobile)) return
            this.registerFormList[1].disabled = true
            const data = await this.$axios.get(`/message/sys/sendVerification?mobile=${mobile}`)
            if (data) this.setTime()
        },
        setTime () {
            if (!this.seconds) {
                this.registerFormList[1].code = '获取验证码'
                this.registerFormList[1].disabled = false
                this.seconds = 60
            } else {
                this.registerFormList[1].code = this.seconds + 's'
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
        async register (form) {
            if (!this.isAgree) {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: '请先同意协议'
                })
                return
            }
            this.btnDisabled = true
            const data = await this.$axios.post('/app/register', form)
            if (data.code === 0) {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: '注册成功',
                    type: 'success'
                })
                this.btnDisabled = false
            } else {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: data.msg,
                })
                this.btnDisabled = false
            }
        }
    },
    created () {
        
    }
}
</script>

