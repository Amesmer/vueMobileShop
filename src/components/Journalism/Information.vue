<template>
    <div>
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-card  v-for="(item, id) in informlist" :key="id"  @click="newsDetail(item.id)">
            <div slot="thumb" >
                <img :src="item.img_url" alt="" class="van-card__thumb">
            </div>
            <div slot="title">
                <div>{{item.title}}</div>
            </div>
            <div slot="num">
                <div>点击了:{{item.click}}</div>
            </div>
            <div slot="price">
                <div>发表时间:{{item.add_time.slice(0,10)}}</div>
            </div>
        </van-card>
        </van-pull-refresh>
    </div>
</template>

<script>
export default {
    data() {
        return {
            informlist: [],
            isLoading: false
        }
    },
    created() {
        this.getInformlist()
    },
    methods: {
        async getInformlist() {
            var {data:res} = await this.$http.get('/api/getnewslist')
            // console.log(res);
            if(res.status !==0){
                return this.$toast('获取失败')
            }
            this.informlist = res.message
            // console.log(this.informlist);
            
        },
        onRefresh() {
           setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
            this.count++;
        }, 500);
        },
        newsDetail(id) {
            // 页面跳转
            // this.$router.push(`/detail?id=`+id)
            this.$router.push({path:'/detail',query: {id:id}})

        }
    },
}
</script>

<style lang="less" scoped>
.van-card {
    height: 67px;
}
.van-card__thumb {
    height: 42px;
    width: 42px;
}
.van-card__price {
    color: #226aff;
    padding: 0 0 45px 0;
}
.van-card__num {
    color: #226aff;
}
.van-card__content {
    font-size: 14px;
    font-weight: 700;
    color: #000;
}
</style>