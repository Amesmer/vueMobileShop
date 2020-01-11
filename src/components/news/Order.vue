<template>
  <div>
    <div class="Ordername">{{OrderList[0].title}}</div>
    <div v-html="OrderList[0].content">{{OrderList[0].content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      OrderList: []
    }
  },
  created() {
    this.OrderListData()
  },
  methods: {
    async OrderListData() {
      const { data: res } = await this.$http.get(`/api/goods/getdesc/` + this.$route.query.id)
      //   console.log(res)
      this.OrderList = res.message
      console.log(this.OrderList)
    }
  }
}
</script>

<style lang="less" scoped>
.Ordername{
    font-size:16px;
    color:#226aff;
    text-align:center;
    margin:15px 0;
    border-bottom:1px solid #ccc;
    padding:10px;
}
</style>