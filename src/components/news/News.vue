<template>
  <div class="NewTop">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
        <van-cell v-for="img in imageList" :key="img.id" @click="van_cell_click(img.id)">
          <div class="van-cell-image">
            <img v-lazy="img.img_url" class="imgcell" />
          </div>
          <p class="huawei">{{img.title}}</p>
          <div class="boxcolor">
            <div class="boxcolorfirst">
              <span>￥{{img.sell_price}}</span>
              <em>{{img.market_price}}</em>
            </div>
            <div class="hotimg">
              <span>热卖中</span>
              <span>剩{{img.stock_quantity}}件</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        number: 1,
      },
      //   下拉刷新
      count: 0,
      isLoading: false,
      //   list列表
      loading: false,
      finished: false,
      imageList: []
    }
  },
  created() {
    this.NewListData()
  },
  methods: {
    async NewListData() {
      var temp=[]
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=` + this.queryInfo.number)
      temp = res.message
      if ( this.imageList.length > 0) {
        temp.forEach(item => {
           this.imageList.push(item)
        })
      } else {
        this.imageList = res.message
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.queryInfo.number++
        this.NewListData()
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.imageList.length >= 15) {
          this.finished = true
        }
      }, 500)
    },
    van_cell_click(id) {
      this.$router.push('/message?id=' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.NewTop {
  margin-bottom: 65px;
}
.van-list {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 10px;
  justify-content: space-between;
}
.van-cell {
  width: 48%;
  border: 1px solid #eee;
  margin: 10px 0;
  padding: 0;
  position: relative;
}
.van-cell-image {
  padding: 10px;
}
.imgcell {
  width: 100%;
}
.boxcolor {
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #ccc;
}
.boxcolorfirst {
  padding: 0 10px;
}
.boxcolorfirst em {
  text-decoration: line-through;
  font-style: normal;
  margin-left: 15px;
}
.boxcolorfirst span {
  color: red;
  font-weight: 700;
}
.hotimg {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.huawei {
  font-size: 12px;
  padding: 4px 10px;
  margin-bottom: 50px;
}
</style>