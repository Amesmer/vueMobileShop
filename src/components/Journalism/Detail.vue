<template>
  <div class="aa">
    <div class="aaaa">
      <div class="a1">
        <h4>{{detaaillist.title}}</h4>
      </div>
      <div class="aaa">
        <span class="a2">发表时间:{{detaaillist.add_time}}</span>
        <span class="a3">点击了:{{detaaillist.click}}</span>
      </div>
    </div>
    <div v-html="detaaillist.content" class="a4">
      <!-- {{detaaillist.content}} -->
    </div>
    <div>
      <h4>发表评论</h4>
    </div>
    <van-cell-group>
      <van-field v-model="message" rows="1" type="textarea" placeholder="请输入留言" />
    </van-cell-group>
    <van-button type="info" size="large">发表评论</van-button>
    <div v-for="(item, i ) in commentlist" :key="i" class="a7">
      <div class="a5">
        <span>第{{i+1}}楼</span>
        <span>用户名称:{{item.user_name}}</span>
        <span>发表时间:{{item.add_time | dateFormat}}</span>
      </div>
      <div class="a6">{{item.content}}</div>
    </div>
    <van-button plain type="danger" size="large" @click="LoadMore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detaaillist: {},
      id: 0,
      message: '',
      total: 1,
      commentlist: []
    }
  },
  created() {
    this.id = this.$route.query.id
    console.log(this.id)
    this.getDetaaillist()
  },
  methods: {
    async getDetaaillist() {
      var temp = []
      var { data: res } = await this.$http.get(`/api/getnew/` + this.id)
    //   console.log(res);
      this.detaaillist = res.message[0]
      // console.log(this.detaaillist.add_time);
      // 将时间进行字符串切割
      this.detaaillist.add_time = this.detaaillist.add_time.slice(0, 10)
      var { data: ress } = await this.$http.get(`/api/getcomments/${this.id}?pageindex=`+this.total)
      temp = ress.message
      console.log(temp);
      if (this.commentlist.length > 0) {
        temp.forEach(item => {
          this.commentlist.push(item)
        })
      } else {
        this.commentlist = ress.message
      }
    },
    LoadMore() {
      this.total++
       this.getDetaaillist()
    }
  }
}
</script>

<style scoped>
.aa {
  padding: 0 10px 0;
}
.aaaa {
  border-bottom: 1px solid #eee;
}
.aaa {
  margin-bottom: 5px;
  overflow: hidden;
}
.a1 {
  text-align: center;
  color: #1989fa;
}
.a2 {
  font-size: 13px;
  float: left;
  color: #1989fa;
}
.a3 {
  float: right;
  font-size: 13px;
  color: #1989fa;
}
.van-button {
  margin-top: 10px;
}
.a5 {
  background-color: #ccc;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.a5 span {
  margin: 0 5px 0 0;
}
.a6 {
  font-size: 12px;
  height: 35px;
  line-height: 35px;
  text-indent: 2em;
}
.a7 {
  margin-top: 5px;
}
</style>