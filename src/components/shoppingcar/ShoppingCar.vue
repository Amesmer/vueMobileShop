<template>
  <div style="height:100%;">
    <!-- 空购物车时 -->
    <div class="empty" v-if="isempty">
      <img src="../../assets/pics/cart_empty.png" alt />
      <p>购物车空空如也</p>
      <van-button type="info" size="mini">去逛逛</van-button>
    </div>
    <!-- 购物车 -->
    <div>
      <van-pull-refresh @refresh="onRefresh" >
        <van-swipe-cell v-for="(item,i) in jjjj" :key="i"  >
          <!-- 商品信息 -->
          <van-card
            :num="itemval"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          >
            <div slot="footer">
              <van-stepper v-model="item.count" />
            </div>
          </van-card>

          <van-cell :border="false" />
          <!-- 右滑删除 -->
          <template slot="right" class="del_content">
            <van-button square type="danger" text="删除" class="del_btn" />
          </template>
        </van-swipe-cell>
      </van-pull-refresh>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="3050" square button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        itemval:1,
        // 购物车中货物
      carList: [],
    //   是否是空购物车
      isempty: true,
    //   总数
      total: 0,
      goods: {"id":'',"count":1,"price":5780}
    }
  },
  created() {
    this.getstorecarList()
  },
  methods: {
    // 获取购物车中的商品
    getstorecarList() {
      if (localStorage.getItem('car') !== null) {
          console.log( JSON.parse(localStorage.getItem('car')));
          
        return (this.carList = JSON.parse(localStorage.getItem('car')))
      }
      this.isempty = false
    },
    // 下拉刷新
    onRefresh() {},
    async loadData() {
        // 根据id获取购物车中货物详细信息
      const res = await this.$http.get('api/goods/getshopcarlist/' + ids)
    },
    //   提交订单
  onSubmit() {

  }
  },
  computed: {
    //   total: function(){},
    ...mapState(['jjjj'])
  }

}
</script>

<style lang="less" scoped>
.empty {
  width: 100%;
  color: #ccc;
  padding: 15px 0;
  text-align: center;
  img {
    width: 100px;
  }
}
.van-button {
  height: 85% !important;
}
</style>
