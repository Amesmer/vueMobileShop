<template>
    <div>
       <!-- 头部标题 -->
       <h4>{{message.title}}</h4>
       <!-- 发表时间和点击量 -->
       <p class="timeAndClick">
      <span class="time">发表时间: {{message.add_time | dateFormat('yyyy-MM-dd')}}</span>
      <span class="click">点击: 0</span>
    </p>
     <hr />
        <!-- 预览缩略图 -->
        <ul class="thumbnail_container" >
      <li v-for="(item,index) in thumb" :key="index" @click="showThumb">
        <img :src="item.src" alt  />
      </li>
    </ul>
    <!-- 图片内容部分 -->
     <div class="detail_container" v-html="message.content"></div>

     <!-- 评论区域 -->
      <div class="comment">
      <h4>发表评论</h4>
      <hr />
       <van-cell-group>
        <van-field v-model="msg" placeholder="请输入留言" type="textarea" />
      </van-cell-group>
      <van-button type="info" size="large" @click="postComment">发表评论</van-button>
      </div>
      <!-- 评论区内容 -->
      <div v-for="(item,index) in commentList" :key="index">
          <div class="title">
            <span v-text="`第${index + 1}楼`"></span>
            <span v-text="`用户：${item.user_name}`"></span>
            <span>发表时间：{{item.add_time | dataFormat('yyyy-MM-dd')}}</span>
          </div>
          <div class="body" v-text="item.content"></div>
       
      </div>
       <!-- 加载更多 -->
        <van-button plain hairline size="large" type="danger">加载更多</van-button>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    data(){
        return{
            //当前图片的id
            id: this.$route.params.id,
            //图片详细信息
            message:[],
            //缩略图数据
            thumb:[],
            //预览缩略图数组
            imagePreview:[],
            //评论内容
            commentList:[],
            msg:'',
        }
    },
   created(){
        this.getImageInfo()
        this.getThumImages()
        this.getComments()
    },
    methods:{
        //获取图片详情
       async getImageInfo(){
            const {data:res}=await this.$http.get(
        "/api/getimageInfo/" + this.id)
        if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片详情数据失败"
        })
        this.message=res.message[0]
        console.log(this.message);
        
        },
        //获取缩略图
       async getThumImages(){
           const { data: res } = await this.$http.get(
        "/api/getthumimages/" + this.id
      )
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取缩略图数据失败"
        });
      this.thumb = res.message;
      console.log(this.thumb);
      
      res.message.forEach(item => {
        this.imagePreview.push(item.src);
      });
      console.log(this.imagePreview);
      
       },
       // 预览图片
    showThumb() {
        console.log(123);
        
      ImagePreview(this.imagePreview);
    },
        //获取评论信息
        async getComments() {
      const { data: res } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=1`
      );
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取评论数据失败"
        });
      this.commentList = res.message;
      console.log(this.commentList);
    },
     // 提交评论
  async  postComment(){
        console.log(123);
         const params = new URLSearchParams();
      params.append("content", this.msg);
      const {data:res} = await this.$http.post(`/api/postcomment/${this.id}`,params)
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "发表评论失败"
        })
        this.$notify({
          type: "success",
          message: "发表评论成功"
        })
      this.msg = ''
      this.getComments()
        
    },
   
    }
    
}
</script>

<style lang="less" scoped>
.photoInfo_container {
  padding: 0 5px;
}
h4 {
  font-size: 15px;
  color: #26a2ff;
  text-align: center;
}
.timeAndClick {
  overflow: hidden;
  padding-bottom: 8px;
  font-size: 13px;
  color: #8f8f94;
  
  .time {
    float: left;
  }
  .click {
    float: right;
  }
}
.thumbnail_container {
  list-style: none;
  overflow: hidden;
  margin: 10px 0;
  padding: 0 5px;
  li {
    float: left;
    padding: 5px;
    width: 33.3333%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
    }
  }
}
hr {
    border: 0.5px solid #9a9a9a;
  }
  .comment{
      h4 {
    color: #000;
    text-align: left;
  }
  .van-field {
    height: 100px;
    border: 1px solid #ccc;
  }
  .van-button {
    margin: 5px 0;
  }
  }
  .title {
  height: 30px;
  background-color: #ccc;
  font-size: 12px;
  line-height: 30px;
  span {
    margin-right: 6px;
  }
}
.body {
  line-height: 35px;
  text-indent: 2em;
  font-size: 12px;
}

</style>