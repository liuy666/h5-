<style lang="less">
@import '../../styles/theme';
    #login-form {
        padding: 166px 93px 0;
        .login-form-item {
            border-bottom: 1px solid rgba(102,102,102,0.6);
            padding: 0 0 14px 0;
            margin-bottom: 70px;
            display: flex;
            align-items: center;
            position: relative;
            >div {
                display: flex;
                align-items: center; 
            }
            &-image {
                width: 44px;
                height: 40px;
                text-align: center;
                >img {
                    height: 100%;
                }
            }
            input {
                font-size: 26px;
            }
            .vs-code {
                width: 148px;
                height: 54px;
                line-height: 54px;
                text-align: center;
                font-size: 24px;
                border-radius: 28px;
                position: absolute;
                right: 0;
                padding: 0;
            }
        }
        .login-form-btn {
            height: 88px;
            margin-top: 92px;
            >button {
                height: 100%;
                font-size: 34px;
                border-radius: 8px;
            }
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
    <div id="login-form">
        <div class="login-form-item" v-for="(item, index) in loginFormList" :key="index">
            <div>
                <div class="login-form-item-image">
                    <img :src="item.src" alt="">
                </div>
            <input v-model="loginForm[item.key]" :type="item.type" :maxlength="item.maxlength" :placeholder="item.placeholder">
            </div>
            <x-button v-if="item.code" mini plain :disabled="item.disabled" type="primary" class="vs-code" @click.native="sendVerifyCode">{{ item.code }}</x-button>  
        </div>
        <div v-if="needBtn" class="login-form-btn">
            <x-button type="primary" :disabled="btnDisabled" @click.native="formSubmit(loginForm)">{{ btnLabel }}</x-button>
        </div>
        <!-- <toast v-model="toast.show" :type="toast.type" :is-show-mask="true">{{ toast.span }}</toast> -->
    </div>
</template>

<script>
import { XButton } from 'vux'
export default {
    components: {
        XButton
    },
    props: {
        loginFormList: {
            required: true,
            type: Array,
            default: () => {
                return []
            }
        },
        loginForm: {
            required: true,
            type: Object,
            default: () => {
                return {}
            }
        },
        needBtn: {
            type: Boolean,
            default: true
        },
        btnLabel: {
            type: String,
            default: '登录'
        },
        btnDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        sendVerifyCode () {
            this.$emit('sendVerifyCode')
        },
        formSubmit (form) {
            this.$emit('formSubmit', form)
        }
    }
}
</script>

