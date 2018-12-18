<style lang="less">
@import '../styles/theme';
    #home {
        width: 100%;
        height: 100%;
        position: relative;
    } 
</style>

<template>
    <div id="home">
        <button id="scan" @click="scanImg()">扫码识别图片</button>
        <input type="file" id="camera" accept="image/*" />
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '@/components/FooterNav'
    export default {
        components: {
            footerNav
        },
        methods: {
            scanImg () {
                console.log(wx)
                // plus.barcode.scan( '_www/barcode.png', function (type,result) {
                //     alert( "Scan success:("+type+")"+result );
                // }, function (error) {
                //     alert( error.message );
                // } );
            }
        }
    }
</script>
