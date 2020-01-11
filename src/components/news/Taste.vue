<template>
  <div class="Tast">
    <h4>发表评论</h4>
    <hr />
    <van-cell>
      <textarea class="textareaFrom" :value="constsdsd" placeholder="请输入留言"></textarea>
    </van-cell>
    <button class="btns" @click="btnsContext">发表评论</button>
    <div v-for="(item,i) in TasteList" :key="TasteList[item]">
      <div class="tastesrt">
        <span>第{{i+1}}楼</span>
        <span>用户: {{item.user_name}}</span>
        <span>发表时间: {{item.add_time}}</span>
      </div>
      <div class="tasteTop">{{item.content}}</div>
    </div>
    <button class="btnsTaste" @click="btnsBox">加载更多</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TasteList: [],
      constsdsd: '',
      num: 1
    }
  },
  created() {
    this.TasteListData()
  },

  methods: {
    async TasteListData() {
      var temp = []
      const { data: res } = await this.$http.get(`/api/getcomments/${this.$route.query.id}?pageindex=${this.num}`)
      temp = res.message
      console.log(this.TasteList)
      if (this.TasteList.length > 0) {
        temp.forEach(item => {
          this.TasteList.push(item)
        })
      } else {
        this.TasteList = temp
      }
    },
    async btnsContext() {
      const { data: res } = await this.$http.post(`/api/postcomment/` + this.$route.query.id, this.constsdsd)
      console.log(res)
      //   this.TasteList.content=res.
    },
    btnsBox() {
      this.num++
      this.TasteListData()
    }
  }
}
</script>

<style lang="less" scoped>
.Tast {
  padding: 0 5px;
  margin-bottom: 65px;
}

.van-cell {
  height: 100px;
  width: 100%;
  border: 1px solid #ccc;
}
.textareaFrom {
  border: 0;
}
.btns {
  width: 100%;
  height: 44px;
  margin: 5px 0;
  border: 0;
  background-color: #1989fa;
  color: #fff;
}
.tastesrt {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  background-color: #ccc;
  :first-child {
    margin-right: 10px;
  }
  :nth-child(2) {
    margin-right: 10px;
  }
}
.tasteTop {
  font-size: 12px;
  text-indent: 2em;
  line-height: 35px;
}
.btnsTaste {
  width: 100%;
  height: 44px;
  background-color: #fff;
  border: 1px solid red;
  color: red;
}
</style>