<template>
  <div style="height:100%;">
    <!-- 空购物车时 -->
    <div class="empty" v-if="isempty">
      <img src="../../assets/pics/cart_empty.png" alt />
      <p>购物车空空如也</p>
      <van-button type="info" size="mini" @click="goaround">去逛逛</van-button>
    </div>
    <!-- 购物车 -->
    <div>
      <van-pull-refresh @refresh="onRefresh" v-model="isloading">
        <van-swipe-cell v-for="(item,i) in carList" :key="i">
          <!-- 商品信息    desc="描述信息" -->
          <van-card
            :num="item.cou"
            :price="item.sell_price"
            :title="item.title"
            :thumb="item.thumb_path"
          >
            <div slot="footer">
              <van-stepper v-model="item.cou" />
            </div>
          </van-card>

          <van-cell :border="false" />
          <!-- 右滑删除 -->
          <template slot="right" class="del_content">
            <van-button
              square
              type="danger"
              @click="delcarlistitem(item.id)"
              text="删除"
              class="del_btn"
            />
          </template>
        </van-swipe-cell>
      </van-pull-refresh>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="total" square button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isloading: false,
      itemval: 1,
      // 购物车中货物
      carList: [],
      //   是否是空购物车
      isempty: true,
      goods: { id: '', count: 1, price: 5780 }
    }
  },
  created() {
    this.getstorecarList()
    this.loadData()
    // this.setcarlist()
  },
  updated() {
    // 数据改变后修改
    this.setcarlist()
    // 从新计算购物车中商品数量
    this.$store.commit('calshopcarsize')
  },
  methods: {
    ...mapMutations(['clear']),
    // 删除购物车中的项目
    delcarlistitem(id) {
      var index = this.carList.findIndex(val => {
        val.id == id
      })
      this.carList.splice(index, 1)
      // localstorage也要改变
      this.setcarlist()
      this.getstorecarList()
    },
    // 购物车数据储存到本地
    setcarlist() {
      localStorage.removeItem('carlist')
      if (this.carList.length > 0) {
        localStorage.setItem('carlist', JSON.stringify(this.carList))
      }
    },
    // 获取购物车中的商品
    getstorecarList() {
      this.carList = []
      if (localStorage.getItem('carlist') !== null) {
        // console.log(JSON.parse(localStorage.getItem('carlist')))
        this.isempty = false
        return (this.carList = JSON.parse(localStorage.getItem('carlist')))
      }
      //   判断是是否是空的购物车
      this.isempty = true
    },
    // 下拉刷新
    onRefresh() {
      this.getstorecarList()
      this.isloading = false
    },
    async loadData() {
      var templist = []
      // 获取本地的数据
      this.getstorecarList()
      // 根据id获取购物车中货物详细信息
      if (this.ids.length > 0) {
        const { data: data } = await this.$http.get('api/goods/getshopcarlist/' + this.ids.join(','))
        // console.log(data.message)
        var templist = data.message
      }
      //   本次添加的商品 按照id 修改对应的数量  得到和carlist对应结构的数据
      this.jjjj.forEach(list => {
        templist.forEach(item => {
          if (list.id == item.id) {
            item.cou += list.count - 1
          }
        })
      })

      // carlist中如果存在则修改数量  如果不存在则添加进来
      templist.forEach(item => {
        var fff = 0
        for (var i = 0; i < this.carList.length; i++) {
          if (item.id == this.carList[i].id) {
            this.carList[i].cou += item.cou
            fff = 1
          }
        }
        if (fff === 0) {
          this.carList.push(item)
        }
      })
      // carList 修改
      console.log(this.carList)
      // 清除本次请求的参数
      this.clear()
      // 保存到本地
      this.setcarlist()
      this.getstorecarList()
    },
    //   提交订单
    onSubmit() {},
    // 去逛逛
    goaround() {
      this.$router.push('/newslist')
    }
  },
  computed: {
    ...mapState(['jjjj', 'ids']),
    // 计算商品的总价
    total: function() {
      var t = 0
      this.carList.forEach(item => {
        t += item.sell_price * item.cou
      })
      return t * 100
    }
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
