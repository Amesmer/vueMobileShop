<template>
  <div class="Messagebox">
    <div class="swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in MessageList" :key="item.src">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div v-for="item in getinfoprice" :key="item.id">
      <div class="goods">
        <div class="goodsTitle">{{item.title}}</div>
        <p>
          市场价:
          <span>￥{{item.market_price}}</span> 销售价:
          <em>￥{{item.sell_price}}</em>
        </p>
        <div class="goodscount">
          <span>购买数量</span>
          <div class="goodsButton">
            <van-stepper :value="value" @change="onChange" />
          </div>
        </div>
        <div class="btns">
          <button class="btnsfirst">立即购买</button>
          <button class="btnsTwo" @click="addShop(item.id)">加入购物车</button>
        </div>
      </div>
      <div class="goodParams">
        <div class="goodParamsNumber">商品参数</div>
        <div class="goodParamsSD">
          <p>商品货号: {{item.goods_no}}</p>
          <p>库存情况: {{item.stock_quantity}}件</p>
          <p>上架时间: {{item.add_time}}</p>
        </div>
        <div class="goodParamsN">
          <button class="goodParamsN1" @click="goodParamsNs(item.id)">图文介绍</button>
          <button class="goodParamsN2" @click="goodParamsNM(item.id)">商品评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { red } from 'color-name'
export default {
  data() {
    return {
      MessageList: [],
      //   取商品参数区和价格，标题等数据
      getinfoprice: [],
      value: 1
    }
  },
  created() {
    this.MessageListData()
    //   取商品参数区和价格，标题等数据
    this.getinfopriceData()
  },
  methods: {
    async MessageListData() {
      const { data: res } = await this.$http.get(`/api/getthumimages/` + this.$route.query.id)
      //   console.log(res)
      this.MessageList = res.message
      console.log(this.MessageList)
    },
    //   取商品参数区和价格，标题等数据
    async getinfopriceData() {
      const { data: res } = await this.$http.get(`/api/goods/getinfo/` + this.$route.query.id)
      //   console.log(res)
      this.getinfoprice = res.message
      console.log(this.getinfoprice)
    },
    goodParamsNs(id) {
      this.$router.push('/Order?id=' + id)
    },
    goodParamsNM(id) {
      this.$router.push('/Taste?id=' + id)
    },
    addShop(addNum) {
      // console.log(addNum)
      this.$store.commit('add', {count:this.value,id:addNum}, )
      console.log(this.$store)
    },
    onChange(value) {
      // 注意此时修改 value 后会再次触发 change 事件
      this.value = value
      //   console.log(this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.Messagebox {
  padding: 10px;
  margin-bottom:65px;
}
.swipe {
  border: 1px solid #ccc;
  height: 230px;
  border-radius: 3px;
}
.swipe img {
  width: 200px;
  height: 200px;
  display: block;
  margin: auto;
}
.goods {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 3px;
}
.goods p {
  color: #8f8f94;
  margin: 15px 0 10px 0;
}
.goods p em {
  font-style: normal;
  font-weight: 700;
  color: red;
}
.goods p span {
  text-decoration: line-through;
}
.goodsTitle {
  border-bottom: 1px solid #ccc;
}
.goodsButton {
  display: inline-block;
  margin-left: 35px;
}

.goodscount {
  color: #8f8f94;
  font-size: 14px;
  padding: 10px;
}
.btns button {
  border: 0;
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  color: #fff;
  font-weight: 400;
}
.btnsfirst {
  background-color: blue;
}
.btnsTwo {
  background-color: red;
}
.goodParams {
  border: 1px solid #ccc;
  margin-top: 10px;
  padding: 15px;
  border-radius: 3px;
}
.goodParamsNumber,
.goodParamsSD {
  border-bottom: 1px solid #ccc;
}
.goodParamsN {
  margin-top: 10px;
}
.goodParamsN1,
.goodParamsN2 {
  display: block;
  height: 39px;
  width: 100%;
  margin-top: 5px;
  border-radius: 5px;
}
.goodParamsN1 {
  border: 1px solid blue;
  color: blue;
  background-color: #fff;
}
.goodParamsN2 {
  border: 1px solid red;
  color: red;
  background-color: #fff;
}
</style>