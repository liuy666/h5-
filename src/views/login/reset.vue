<style lang="less">
    #reset {
        width: 100%;
        height: 100%;
        position: relative;
    } 
</style>

<template>
    <div id="reset">
        <login-form 
            :login-form-list="resetFormList" 
            :login-form="resetForm" 
            :btn-label="btnLabel"
            :toast="toast" 
            @formSubmit="updatePassword">
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
            resetForm: {
                password: '',
                newPassword: ''
            },
            resetFormList: [
                {
                    placeholder: '请输入新密码',
                    src: require('../../assets/images/icon_password@2x.png'),
                    type: 'password',
                    key: 'password'
                },
                {
                    placeholder: '请再次输入新密码',
                    src: require('../../assets/images/icon_password@2x.png'),
                    type: 'password',
                    key: 'newPassword'
                },
            ],
            btnLabel: '保存',
            toast: {
                show: false,
                type: '',
                span: ''
            }
        }
    },
    methods: {
        async updatePassword (form) {
            if (form.password !== form.newPassword) {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: '两次密码输入不一致',
                })
                return
            }
            const data = await this.$axios.post('/app/updatePwd', form)
            if (data.code === 0) {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: '修改成功',
                    type: 'success',
                })
            } else {
                this.$store.commit('SHOW_TOAST', {
                    value: true,
                    text: data.msg
                })
            }
        }
    },
    created () {
        Object.assign(this.resetForm, this.$route.query)
    }
}
</script>
