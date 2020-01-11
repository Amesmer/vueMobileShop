<template>
  <div id="app">
    <!-- 顶部导航区域 -->
    <van-nav-bar
      title="黑马程序员.vant"
      :left-text="back"
      :left-arrow="arrow"
      @click-left="onClickLeft"
    />
    <!-- <span @click="onBack" v-show="isShow" >返回</span> -->
    <router-view />
    <!-- 底部导航区域 -->
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="wap-home" @click="toHome" name="home">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="toContact" name="contact">会员</van-tabbar-item>
      <van-tabbar-item
        icon="cart-o"
        @click="toCart"
        name="cart"
        :info="this.$store.state.shopcarsize"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="search" @click="toSearch" name="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
      //isShow:true
      back: '返回',
      arrow: true
    }
  },
  created() {
    this.$store.commit('calshopcarsize')
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    onChange(index) {
      Notify({ type: 'primary', message: index })
    },

    //点击首页
    toHome() {
      this.$router.push('/home')
      // this.arrow=false
      // this.back = ''
    },
    toContact() {
      this.$router.push('/member')
    },
    toCart() {
      this.$router.push('/shopcar')
    },
    toSearch() {
      this.$router.push('/search')
    }
  },

  //在watch里监听返回按钮的显示和隐藏
  watch: {
    '$route.path': function(newVal) {
      if (newVal === '/home') {
        this.arrow = false
        this.back = ''
      } else {
        this.arrow = true
        this.back = '返回'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__text {
  background-color: #1989fa;
  color: #fff;
}
.van-icon::before {
  color: #fff;
}
</style>
