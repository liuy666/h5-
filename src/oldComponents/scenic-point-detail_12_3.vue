<style lang="less">
    #scenic-point-detail{
        padding: 30px;
        
        // loading层弹窗样式
        .weui-loading_toast .weui-toast {
            top: @toast-top;
            width: 228px!important;
            height: 170px!important;
            min-height: 170px!important;
            max-height: 170px!important;
            i {
                width: 60px;
                height: 60px;
                margin-top: 55px;
            }
        }

        // 带图标信息提示
        .short.vux-toast .weui-toast { // 提示框
            top: @toast-top;
            width: 228px!important;
            height: 170px!important;
            min-height: 170px!important;
            max-height: 170px!important;
        }
        .short.vux-toast .weui-icon_toast { // 提示框icon图片容器
            margin-top: 28px;
        }
        .short.vux-toast .weui-icon_toast:before { // 提示框icon图片
            font-size: 60px;
        }
        .short.vux-toast .weui-toast__content { // 提示框文本信息
            margin: 22px 0 0 0;
            font-size: 28px;
        }

        .weui-progress__bar{
            background:rgba(254,235,226,1);
            height: 6px;
            border-radius:4px;
        }
        .weui-progress__inner-bar{
            background:rgba(254,81,0,1);
            border-radius:4px;
        }
        .audio-area{
            display: flex;
            .audio-area-img{
                width: 112px;
                height: 112px;
                position: relative;
                .iwrap {
                    width: 112px;
                    height: 112px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    .control {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        img {
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }
                    .img-16-26 {
                        width: 16px;
                        height: 26px;
                        transform: translate(-8px, -13px);
                    }
                    .img-20-24 {
                        width: 20px;
                        height: 24px;
                        transform: translate(-10px, -12px);
                    }
                }  
            }
            .audio-area-name{
                width: calc(~'100% - 114px');
                margin-left: 20px;
                margin-top: 10px;
                .point-name{
                    font-size: 30px;
                }
                .audio-time{
                    font-size: 24px;
                    max-width: 60px;
                }
                .audio-progress{
                    position: relative;
                    width: calc(~'100% - 160px');
                    margin: 0 20px;
                    padding-top: 14px;
                    .circle {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: #fff;
                        position: absolute;
                        left: -16px;
                        top: -2px;
                        box-shadow:0px 1px 3px 0px rgba(129,28,0,0.15);
                    }
                }
            }
        }
        .img-list-area{
            margin-top: 24px;
            //border-radius: 20px;
            overflow: hidden;
            .vux-swiper-desc{
                text-align: right;
            }
            .vux-img{
                border-radius: 20px;
            }
            .vux-swiper-desc{
                line-height: 40px;
                background: rgba(0,0,0,0.3);
                padding: 0;
                right: 20px;
                bottom: 36px;
                padding: 0 20px;
                border-radius: 20px;
                left: auto;
                font-size: 28px;
            }
        }
        .captiom-area {
            margin-top: 41px;
            font-size: 30px;
            line-height: 48px; 
            color: #666;
            font-weight: 400;
            padding-bottom: 175px;
            text-indent: 2em;
        }
        .point-list-area {
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 175px;
            padding-top: 19px;
            box-sizing: border-box;
            .point-list{
                white-space: nowrap;
                display: flex;
                flex-direction: row;
                overflow-x: auto;
                -webkit-overflow-scrolling : touch;
                padding-left: 50px;
                margin-right: 30px;
                box-sizing: border-box;
                li{
                    display: flex;
                    height: 150px;
                    flex-direction: column;
                    padding-right: 92px;
                    background: url('../assets/images/icon_dian@3x.png') no-repeat 124px 51px;
                    background-size: 44px 8px;
                    position: relative;
                    &:last-child{
                        padding-right: 0;
                        background: none;
                    }
                    .point-list-img{
                        width: 100px;
                        height: 100px;
                        box-sizing: border-box;
                        border-radius:50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    div.ignore {
                        border: 2px solid #fff;
                    }
                    div.orange {
                        border-color: #FE5100!important;
                    }
                    .point-list-name{
                        position: absolute;
                        font-size: 24px;
                        width: 150px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        left: -25px;
                        text-align: center;
                        bottom: 0;
                        &.current{
                            color: #FE5100;
                        }
                    }
                }
            }
        }
    } 
    
</style>

<template>
    <div id="scenic-point-detail">
        <loading :show="isShowLoading" :text="loadText" position="absolute"></loading>
        <toast class="short" v-model="isTips" type="cancel" :text="tipsText" :is-show-mask="true"></toast>
        <section class="audio-area">
            <div class="audio-area-img">
                <img :src="pointImg" style="width:100%;height:100%;border-radius:100%;" />
                <!-- 播放图标-暂停中状态 -->
                <v-touch class="iwrap" v-show="!isPlayed" v-on:tap="playAudio()">
                    <div class="control img-16-26">
                        <img src="../assets/images/icon_small_pause@3x.png" alt="" />
                    </div>
                </v-touch>
                
                <!-- 暂停图标-播放中状态 -->
                <v-touch class="iwrap" v-show="isPlayed" v-on:tap="pauseAudio">
                    <div class="control img-20-24">
                        <img src="../assets/images/icon_suspend@3x.png" alt="" />
                    </div>
                </v-touch>
            </div>
            <div class="audio-area-name">
                <span class="point-name">{{pointName}}</span>
                <div style="display:flex;margin-top:4px;">
                    <div class="audio-time">{{currentTimeStr}}</div>
                    <div class="audio-progress">
                        <x-progress :percent="audioProgress" :show-cancel="false"></x-progress>
                        <div class="circle"></div>
                    </div>
                    <div class="audio-time">{{totalTimeStr}}</div>
                </div>
            </div>
        </section>
        <section class="img-list-area">
            <swiper 
                :list="imageList"
                dots-position="center"
                :auto="false"
                :loop="true"
                :show-dots="false"
                :aspect-ratio='0.55'
                >
            </swiper>
        </section>
        <section class="captiom-area">
            {{pointCaption}}
        </section>
        <section class="point-list-area">
            <ul class="point-list">
                <v-touch tag="li" v-for="(item,index) in pointList" :key="index" @tap="changePointInfo(index,true,$event)">
                    <div class="point-list-img ignore" :class="item.resource_id == currentPointId ? 'orange' : ''"><img :src="item.url"/></div>
                    <div class="point-list-name" :class="item.resource_id == currentPointId ? 'current' : ''" >{{item.name}}</div>
                </v-touch>
            </ul>
        </section>
    </div>
</template>

<script>
import { Swiper, XProgress, Loading, Toast } from 'vux'
export default {
    components : {
        Swiper,
        XProgress,
        Loading,
        Toast
    },
    data() {
        const cPoint = JSON.parse(sessionStorage.getItem("pointList")).filter(item => item.resource_id == sessionStorage.getItem("mapClickPointId"))[0];
        const cPoint_play = JSON.parse(sessionStorage.getItem("currentPoint"));
        return {
            currentIndex: 0,
            showPoint: cPoint,
            playingPoint : cPoint_play,
            currentPointId: cPoint.resource_id,
            pointImg: cPoint.url,
            pointName: cPoint.name,
            pointCaption: cPoint.commentary,
            pointList: JSON.parse(sessionStorage.getItem("pointList")),
            playList: JSON.parse(sessionStorage.getItem("playList")),
            isPlayed: false,
            audioProgress: 0,
            currentTimeStr: '0:00',
            totalTimeStr: '0:00',
            currentTime : '',
            totalTime:'',
            imageList : [],
            timer: '',
            playIndex : 0,
            isShowLoading : false,
            loadText:'',
            isTips:false,
            tipsText: '请求失败',
            bl:0
        }
    },
    watch : {
        audioProgress (v) { 
            if(v >= 100){
                const dAudio = document.querySelector('.detail-audio');
                clearInterval(this.timer);
                if (!dAudio.paused || !dAudio.ended) {
                    dAudio.pause();
                }
                this.isPlayed = false;
                if(sessionStorage.getItem("isAuto")){
                    //如果是自动  找到当前点在播放列表中的位置  然后讲列表序列中的下一个点设置成当前 
                    //同时找到当前点在所有景点列表中的位置，执行changePointInfo
                    this.playIndex = this.playList.findIndex(item => item.aId === this.currentPointId);
                    if(this.playIndex < this.playList.length-1){
                        this.changePointInfo(this.playIndex+1,false);
                    }
                }
            }
        }
    },
    methods : {
        //初始化音频
        setAudio(isChange) {
            const playStatus = JSON.parse(sessionStorage.getItem("playStatus"));

            const audio = document.querySelector(".detail-audio");
            //const audio_play = document.querySelector(".detail-audio-play");
            if(audio){
                document.querySelector(".audio-area").removeChild(audio);
                //document.querySelector(".audio-area").removeChild(audio_play);
            }
            const audioContainer = document.querySelector(".audio-area");
            let audioDom = document.createElement("audio"),
                sourceDom = document.createElement("source");
            sourceDom.type = 'audio/mpeg';
            sourceDom.src = this.showPoint.guideUrl;
            audioDom.dataset.id = this.showPoint.resource_id;
            audioDom.appendChild(sourceDom);
            audioDom.classList.add('detail-audio');
            audioDom.style.display = 'none';
            audioContainer.appendChild(audioDom);
            audioDom.load();

            /*let audioDom_play = document.createElement("audio"),
                sourceDom_play = document.createElement("source");
            sourceDom_play.type = 'audio/mpeg';
            sourceDom_play.src = this.playingPoint.guideUrl;
            audioDom_play.dataset.id = this.playingPoint.resource_id;
            audioDom_play.appendChild(sourceDom_play);
            audioDom_play.classList.add('detail-audio-play');
            audioDom_play.style.display = 'none';
            audioContainer.appendChild(audioDom_play);
            audioDom_play.load();*/


            //audioDom 用于放当前展示的景点的音频
            //audioDom_play 用于放之前正在播放的景点的音频

            audioDom.oncanplay = (e) => { 
                let _audioDom = e.target;
                this.totalTime = _audioDom.duration;
                let m = (this.totalTime%60).toFixed(0) < 10 ? '0'+(this.totalTime%60).toFixed(0) : (this.totalTime%60).toFixed(0);
                this.totalTimeStr = Math.floor(this.totalTime/60) + ":" + m;
                if (this.$tool.validateReg.isiOS(window.navigator.userAgent)) {
                    if(!isChange && playStatus && playStatus.resourceId == this.showPoint.resource_id){
                        audioDom.currentTime = playStatus.currentTime;
                        this.currentTime = playStatus.currentTime;
                        let cm = (playStatus.currentTime%60).toFixed(0) < 10 ? '0'+(playStatus.currentTime%60).toFixed(0) : (playStatus.currentTime%60).toFixed(0);
                        this.currentTimeStr = Math.floor(playStatus.currentTime/60) + ":" + cm;
                    }
                } 
            }
            audioDom.onplay = (e) => {
                this.totalTime = e.target.duration;
                this.changeProgress();
            }
            if(!isChange){//进页面的初始化
                const playStatus = JSON.parse(sessionStorage.getItem("playStatus"));
                if(playStatus && playStatus.resourceId == this.showPoint.resource_id){
                    let cm = (playStatus.currentTime%60).toFixed(0) < 10 ? '0'+(playStatus.currentTime%60).toFixed(0) : (playStatus.currentTime%60).toFixed(0),
                        tm = (playStatus.totalTime%60).toFixed(0) < 10 ? '0'+(playStatus.totalTime%60).toFixed(0) : (playStatus.totalTime%60).toFixed(0);
                    this.currentTimeStr = Math.floor(playStatus.currentTime/60) + ":" + cm;
                    this.totalTimeStr = Math.floor(playStatus.totalTime/60) + ":" + tm;
                    //this.isPlayed = !playStatus.isPauseStatus;
                    audioDom.currentTime = playStatus.currentTime;
                    if(!playStatus.isPauseStatus){//播放状态
                        this.isPlayed = true;
                        audioDom.play();
                    }else{
                        this.isPlayed = false;
                    }   
                    //初始化进度条
                    this.audioProgress = playStatus.currentTime / playStatus.totalTime * 100;
                    document.querySelector(".circle").style.left = "calc("+this.audioProgress+"% - 8px)";
                }else{
                    let tm1 = (this.totalTime%60).toFixed(0) < 10 ? '0'+(this.totalTime%60).toFixed(0) : (this.totalTime%60).toFixed(0);
                    this.currentTimeStr = '0:00';
                    this.totalTimeStr = Math.floor(this.totalTime/60) + ":" + tm1;
                    this.isPlayed = false;

                    //if(playStatus && !playStatus.isPauseStatus){
                        //audioDom_play.play();
                    //}
                }
            }else{//切换景点的初始化
                let tm2 = (this.totalTime%60).toFixed(0) < 10 ? '0'+(this.totalTime%60).toFixed(0) : (this.totalTime%60).toFixed(0);
                this.currentTimeStr = '0:00';
                this.totalTimeStr = Math.floor(this.totalTime/60) + ":" + tm2;
                this.isPlayed = false;
                if(sessionStorage.getItem("isAuto")){
                    this.playAudio();
                }
            }
        },
        //播放
        playAudio() {
            const detailAudio = document.querySelector(".detail-audio");
            if(detailAudio && detailAudio.paused){
                this.isPlayed = true;
                detailAudio.play();
                sessionStorage.setItem("currentPoint",JSON.stringify(this.showPoint));
                sessionStorage.setItem("mapClickPointId",this.showPoint.resource_id);
            }else{
                console.log("****");
            }
        },
        pauseAudio() {
            clearInterval(this.timer);
            this.timer = '';
            document.querySelector('.detail-audio').pause();
            this.isPlayed = false;
        },
        changeProgress() {
            this.timer = setInterval(() => {
                this.currentTime = document.querySelector('.detail-audio').currentTime;
                let cf = Math.floor(this.currentTime/60);
                let cm = (this.currentTime%60).toFixed(0) < 10 ? '0'+(this.currentTime%60).toFixed(0) : (this.currentTime%60).toFixed(0);
                if(cm == 60) {
                    cf = cf + 1;
                    cm = "00";
                }
                this.currentTimeStr = cf + ":" + cm;

                this.audioProgress = this.currentTime / this.totalTime * 100;
                document.querySelector(".circle").style.left = "calc("+this.audioProgress+"% - 8px)";
            },1000);
        },
        //获取当前景点轮播图
        async getCurrentImgList() {
            this.isShowLoading = true;
            let _self = this;
            this.imageList = [];
            const imgList = await this.$http.get(this.$base + '/hqyatu-navigator/app/resource/getSowingPictures/'+ _self.currentPointId);
            if(!imgList){
                this.isShowLoading = false;
                this.isTips = true;
                return;
            }
            if(imgList.sowingPictures && imgList.sowingPictures.length>0){
                let len = imgList.sowingPictures.length;
                let list = [];
                imgList.sowingPictures.forEach((v,i) => {
                    let title = (i+1)+'/'+len;
                    let obj = {
                        url : 'javascript:',
                        img : v,
                        title : title
                    }
                    list.push(obj);
                })
                this.imageList = list;
            }else{
                /*this.imageList.push({
                    url : 'javascript:',
                    img : './fj.jpg',
                    title : ''
                })*/
                document.querySelector(".vux-swiper").style.backgroundColor = "#f8f8f8";
            }
            this.isShowLoading = false;
        },
        //切换景点
        changePointInfo (index,isClick,ev) {
            clearInterval(this.timer);
            this.timer = '';
            document.querySelector(".circle").style.left = "- 8px";
            this.audioProgress = 0;

            let newPointInfo = {};
            if(isClick){
                newPointInfo = this.pointList[index];
            }else{
                newPointInfo = this.pointList.filter(item => item.resource_id === this.playList[index].aId)[0];
                document.querySelector(".point-list").scrollLeft = 15 + this.bl * 96 * (parseInt(newPointInfo.serial)-1);
            }
            sessionStorage.setItem("showPoint",JSON.stringify(newPointInfo));
            this.showPoint = newPointInfo;
            this.currentPointId = newPointInfo.resource_id;
            this.pointImg = newPointInfo.url;
            this.pointName = newPointInfo.name;
            this.pointCaption = newPointInfo.commentary;
            this.currentTimeStr = "0:00";
            this.getCurrentImgList();
            this.setAudio(true);
        }
    },
    created() {
        this.getCurrentImgList();
    },
    mounted() {
        //获取屏幕大小 动态设置不同手机的地图zoom
        const containerWidth = document.querySelector('#scenic-point-detail').clientWidth;
        this.bl = parseFloat((containerWidth/375).toFixed(2));

        let self = this;
        this.currentIndex = this.pointList.findIndex(item => item.resource_id === this.currentPointId);
        document.querySelector(".point-list").scrollLeft =  15 + this.bl * 96 * this.currentIndex;
        const fromRouteName = this.$store.state.app.fromRouteName_detail;
        if(fromRouteName != 'scenic-point-detail'){
            sessionStorage.removeItem('playStatus');
            clearInterval(this.timer);
            this.timer = "";

            this.showPoint = JSON.parse(sessionStorage.getItem("showPoint"));
            this.currentPointId = this.showPoint.resource_id;
            this.pointImg = this.showPoint.url;
            this.pointName = this.showPoint.name;
            this.pointCaption = this.showPoint.commentary;
        }
        this.setAudio();


        this.$nextTick(function(){
            let circle = document.querySelector(".circle");
            let flag = 0;
            circle.addEventListener("touchstart",function(e){   
                if(self.isPlayed){
                    self.isPlayed = false;
                    flag = 1;
                }
            })
            circle.addEventListener("touchmove",function(e){ 
                let x = e.changedTouches[0].clientX - this.parentElement.offsetLeft;
                let xx = x < 0 ? 0 : x;
                let total = this.parentElement.offsetWidth;
                let move = xx > total ? total : xx;
                document.querySelector(".circle").style.left = (move - 8) + 'px';
                
                self.currentTime = self.totalTime * (move / total).toFixed(2);
                document.querySelector('.detail-audio').currentTime = self.currentTime;
                let cf = Math.floor(self.currentTime/60);
                let cm = (self.currentTime%60).toFixed(0) < 10 ? '0'+(self.currentTime%60).toFixed(0) : (self.currentTime%60).toFixed(0);
                if(cm == 60) {
                    cf = cf + 1;
                    cm = "00";
                }
                self.currentTimeStr = cf + ":" + cm;

                self.audioProgress = self.currentTime / self.totalTime * 100;
                
            })
            circle.addEventListener("touchend",function(e){   
                if(flag == 1){
                    self.isPlayed = true;
                    flag = 0;
                }
            })
        })
    },
    beforeRouteLeave (to, from , next) { 
        const da = document.querySelector(".detail-audio");
        const status = da.paused;
        let ct = da.currentTime;

        let playStatus_main = JSON.parse(sessionStorage.getItem("playStatus"))
        if(playStatus_main && playStatus_main.resourceId == da.dataset.id && ct == 0){
            ct = playStatus_main.currentTime;
        }
        this.pauseAudio();
        let playStatus = {
            currentTime: ct,
            isPauseStatus : status
        }
        sessionStorage.setItem('playStatus', JSON.stringify(playStatus));
        this.$store.commit('SETFROMROUTENAME', 'scenic-point-detail');
        if(this.timer){
            clearInterval(this.timer);
        }
        next();
    }
}
</script>