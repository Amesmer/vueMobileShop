<template>
  <div>
    <!-- tab栏区域 -->
    <van-tabs @click="onClick">
        <van-tab v-for="item in message" :title="item.title" :key="item.id"> 
        </van-tab>
    </van-tabs>

    <!-- 图片列表区域 -->
    <!-- <div v-for="img in imageList" :key="img.id">
            <div class='PhotoFromFather'>
              <img v-lazy="img.img_url" @click="handClick" />
              <div class="PhotoFrom">
                <p>{{img.seo_keywords}}</p>
                <p>{{img.seo_description}}</p>
              </div>
            </div>
          </div> -->

         <!-- 图片列表区域  -->
         <ul class="photo_container">
             <router-link v-for="(item,index) in imageList" 
             :key="index" class="img_list" 
             :to="'/photo/Info/'+item.id" tag="li">
            
            <van-image width="100%" height="100%" :src="item.img_url" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
             <div class="desc_container">
               <p class="photo_seo_keywords">{{item.seo_keywords}}</p>
               <p class="photo_seo_description">{{item.seo_description}}</p>
             </div>
              </router-link>
         </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片分类
      message: [],
      //图片数组
      imageList: [],
      cate: ''
    }
  },
  created() {
    this.getCategory(), this.getImages(0)
  },
  methods: {
    //获取tab列表
    async getCategory() {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      //console.log(res);
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片分类数据失败"
        })
      this.message = res.message
      this.message.unshift({ title: '全部', id: 0 })
    //   console.log(this.message)
    },

    //点击进去获取图片列表数据
    async getImages(id) {
      const { data: res } = await this.$http.get(`/api/getimages/` + id)
      console.log(res)
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片列表数据失败"
        })
      this.imageList = res.message
    },

    onClick(name, title) {
      this.cate = this.message[name].id
      //console.log( this.cate);
      this.getImages(this.cate)
    },
    
  },
}
</script>

<style lang="less" scoped>

.photo_container {
  padding: 0 10px;
}
.img_list {
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
}
.desc_container {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 10px;
  width: 100%;
  height: 75px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.photo_seo_keywords {
  width: 100%;
  margin: 5px 0;
}
.photo_seo_description {
  width: 100%;
  margin: 5px 0;
}

</style>
