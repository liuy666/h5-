<style lang="less" scoped>
    #scenic-line {
        border-top: 1px solid #f8f8f8;
        padding-left: 30px;
        .line-list {
            height: 468px;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            ul {
                overflow: hidden;
                li {
                    height: 100px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-top: 20px;
                    .img-left {
                        display: flex;
                        flex-direction: row;
                        div {
                            margin-right: 30px;
                            height: 100px;
                            width: 112px;
                            img {
                                height: 100%;
                                width: 100%;
                            }
                        }
                        p {
                            font-weight: 400;
                        }
                        .font30 {
                            font-size: 30px;
                            line-height: 34px;
                            margin: 18px 0 8px;
                        }
                        .font24 {
                            font-size: 24px;
                            color: #888;
                        }
                    }
                    .img-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        div {
                            width: 30px;
                            height: 24px;
                            margin-right: 28px;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="scenic-line">
        <section class="line-list">
            <ul>
                <li v-for="line of lines" :key="line.lineId" @click="gotoMapLine(line.lineId)">
                    <section class="img-left">
                        <div>
                            <img style="border-radius: 10px;" src="../assets/images/bg_select@3x.png" alt="加载中..." />
                        </div>
                        <section>
                            <p class="font30">{{line.name}}</p>
                            <p class="font24">用时{{parseInt(line.playHour)}}小时</p>
                        </section>
                    </section>
                    <section class="img-right">
                        <div>
                            <img :data-lineid="line.lineId" src="../assets/images/icon_select@2x.png" alt="加载中..." />
                        </div>
                    </section>
                </li>
            </ul>
        </section> 
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    data() {
        return {
        }
    },
    created() {
        this.SET_ROUTE_NAME('scenic-line');
    },
    mounted() {
        const lineId = sessionStorage.getItem('lineId');
        if (lineId) {
            const imgs = document.querySelectorAll('.img-right img');
            for (let img of imgs) {
                if (img.dataset.lineid === lineId) {
                    img.style.display = 'block';
                }
            }
        }
    },
    computed: mapState({
        lines: state => state.app.lineList,
    }),
    methods: {
        ...mapMutations([
            'SET_ROUTE_NAME',
            'REMOVE_CURRENT_LINE'
        ]),
        gotoMapLine(lineId) {
            const imgs = document.querySelectorAll('.img-right img');
            for (let img of imgs) {
                if (img.dataset.lineid === lineId) {
                    if (img.style.display === 'block') {
                        img.style.display = 'none';
                        sessionStorage.removeItem('lineId');
                        const currentPoint = JSON.parse(sessionStorage.getItem('currentPoint'));
                        const pointList = JSON.parse(sessionStorage.getItem('pointList'));
                        const index = pointList.findIndex(item => currentPoint.resource_id === item.resource_id);
                        const updatePlayList = pointList.slice(index).map(item => {
                            return {
                                aSrc: item.guideUrl,
                                aId: item.resource_id
                            }
                        });
                        sessionStorage.setItem('playList', JSON.stringify(updatePlayList));
                        this.REMOVE_CURRENT_LINE();
                        sessionStorage.removeItem('lineId');
                    } else {
                        sessionStorage.setItem('lineId', lineId);
                        img.style.display = 'block';
                        this.$router.replace({
                            name: 'main',
                            params: {
                                lineId
                            }
                        });
                    }
                } else {
                    img.style.display = 'none';
                }
            }
        }
    }
}
</script>