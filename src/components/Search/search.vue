<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchdata"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索历史部分 -->
    <div class="searchHistory" v-if="showhistory">
      <div class="top">
        <p>搜索历史</p>
        <i class="van-icon van-icon-delete" @click="deleteAllHistory"></i>
      </div>
      <div class="taglist">
        <van-divider
          v-show="havehistory"
          :style="{ color: 'rgb(51, 51, 51)', borderColor: 'rgb(204, 204, 204)', padding: '0 16px' }"
        >暂无搜索历史</van-divider>
        <van-tag
          class="mytag"
          v-for="(item,i) in serarchHistoryList"
          :key="i"
          @click="clickhistorytag(item)"
        >{{item}}</van-tag>
      </div>
    </div>
    <div v-for="item in resList" :key="item.id">
      <van-swipe-cell>
        <van-cell :border="false" :title="item.name" :value="item.ctime | dateFormat" />
        <template slot="right">
          <van-button square type="danger" text="删除" @click="deleteitem(item.id)" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchdata: '',
      resList: [],
      dateStr: '',
      serarchHistoryList: [],
      havehistory: false,
      showhistory: true
    }
  },
  created() {
    this.getLocalstorage()
    this.ishistory()
  },
  methods: {
    async onSearch() {
      if (this.searchdata.trim().length === 0) {
        return
      }
      // 隐藏搜索历史   显示搜索内容
      this.showhistory = false
      const res = await this.$http.get('api/getprodlist')
      this.setLocalstorage(this.searchdata)
      this.ishistory()
      if (res.status !== 200) {
        return this.$toast('搜索失败')
      }
      this.resList = res.data.message
      console.log(this.resList)
      this.$toast('搜索成功')
    },
    onCancel() {
      // 显示搜索历史
      this.showhistory = true
      this.searchdata = ''
      this.resList = []
    },
    // 写入localstorage
    setLocalstorage(value) {
      if (JSON.parse(localStorage.getItem('history')) !== null) {
        this.serarchHistoryList = JSON.parse(localStorage.getItem('history'))
      }
      this.serarchHistoryList.push(value)
      console.log(localStorage.getItem('history'), value)
      localStorage.setItem('history', JSON.stringify(this.serarchHistoryList))
    },
    // 获取localstorage
    getLocalstorage() {
      if (localStorage.getItem('history') !== null) {
        return (this.serarchHistoryList = JSON.parse(localStorage.getItem('history')))
      }
      this.serarchHistoryList = []
    },
    // 删除所有的 历史记录
    deleteAllHistory() {
      localStorage.removeItem('history')
      this.getLocalstorage()
      this.ishistory()
    },
    // 是否有历史记录
    ishistory() {
      console.log(this.serarchHistoryList.length)
      if (this.serarchHistoryList.length >= 1) {
        return (this.havehistory = false)
      }
      this.havehistory = true
    },
    // 删除搜索的条目
    async deleteitem(id) {
      const res = await this.$http.get('api/delproduct/' + id)
      if (res.status !== 200) {
        return this.$toast('删除失败')
      }
      this.$toast('删除成功')
      //  重新获取数据
      const result = await this.$http.get('api/getprodlist')
      if (result.status !== 200) {
        return this.$toast('搜索失败')
      }
      this.resList = result.data.message
    },
    // 点击历史记录tag
    clickhistorytag(tag) {
      this.searchdata = tag
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
.taglist {
  padding: 5px 10px;
  .mytag {
    margin: 0px 5px;
    font-size: 12px;
  }
}
</style>
