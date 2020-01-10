<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in lunbo" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 六宫格 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/newslist">
        <img src="../assets/pics/menu1.png" />
        <span>新闻资讯</span>
      </van-grid-item>

      <van-grid-item to="/photo/list">
        <img src="../assets/pics/menu2.png" />
        <span>图片分享</span>
      </van-grid-item>
      <van-grid-item to="/newslist">
      <img src="../assets/pics/menu3.png" />
      <span>商品购买</span>
      </van-grid-item>
      <van-grid-item to="/goods/list">
      <img src="../assets/pics/menu4.png" />
      <span>留言反馈</span>
      </van-grid-item>
      <van-grid-item >
      <img src="../assets/pics/menu5.png" />
      <span>视频专区</span>
      </van-grid-item>
      <van-grid-item >
      <img src="../assets/pics/menu6.png" />
      <span>联系我们</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { log } from 'util'
export default {
  data() {
    return {
      //用来存放轮播图的路径
      lunbo: []
    }
  },
  created() {
    this.getLunbo()
  },
  methods: {
    //发送请求获取图片
    async getLunbo() {
      const { data: res } = await this.$http.get('/api/getlunbo')
      const message = res.message
      //console.log(message);
      message.forEach(item => {
        this.lunbo.push(item.img)
      })
     // console.log(this.lunbo)
    }
  }
}
</script>

<style lang="less" scoped>
.van-grid-item img {
    width: 60%;
   
}

.van-swipe img {
    width: 100%;
    height: 200px;
}
span {
    font-size: 12px;
    margin-top: 15px;
}

</style>