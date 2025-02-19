<template>
  <div class="artice">
    <div class="top">
      <div class="article-name">


        <div contenteditable="true" class="a-title" id="title">文章标题</div>
      </div>

      <div class="article-type">
       


        <div class="article-handel">
          <el-button type="primary" round @click="saveArticle">发布文章</el-button>
          <el-button round>清空内容</el-button>
          <el-button round @click="goArticle">返回</el-button>

        </div>


      </div>
    </div>
    <div class="mavon-boy">
      <mavon-editor v-model='form.editorContent' :subfield="false" :ishljs="true" :navigation="true" ref=md
        @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData">
      </mavon-editor>

    </div>

  </div>
</template>
<script>
  import {
    create,
    upload,
    upBook
  } from '@/api/job.js'
 
  import qs from 'querystring'
  import 'mavon-editor/dist/css/index.css'

  export default {
    data() {
      return {

        img_file: {},
        form: {
          id: "",
          title: "",
          articleTypeId: "",
          userId: "1",
          editorContent: "",
          bookPreview: "",
          book:null,
          bookUrl:null
        },
        articleType: [],
        editorContentHtml: null,
      }
    },
    filters:{
      handelImg(val){
        return IMGURL + val
      }

    },
    

    methods: {

      //  发布文章
      saveArticle() {
        let title_text = document.getElementById('title').innerText;

        

        this.form.title = title_text;

        let msg={
          title:this.form.title,
          articleTypeId:this.form.articleTypeId,
          userId:this.form.userId,
          content:this.form.editorContent,
          book:this.form.bookUrl
        }

        create(qs.stringify(msg)).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.$message("发布成功");
          } else {
            this.$message("发布失败")
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      },
      // 上传图片
      upBook() {
        const that = this;
        const fileNode = document.getElementById('file');
        // 触发原始上传文件的点击事件
        fileNode.click();
        fileNode.addEventListener('change', function (ev) {
          let file= ev.target.files[0];
          that.form.bookPreview=file;


            let formdata = new FormData();
           formdata.append('file', that.form.bookPreview);

          upBook(formdata).then((res)=>{
            let {code,url}=res;
            if(code=="200"){
                this.form.bookUrl=url
            }


          })
          let reader = new FileReader();
          reader.readAsDataURL(file);
         
          reader.onload = (function (file) {
            return function (e) {
              that.form.book=reader.result;//图片base64数据
            };
          })(file)

        })

      },
     
      goArticle() {
        this.$router.push({
          path: '/job/article'
        })
      },
      //  md 文本编辑器 获取相应md 文件" @change="changeData"
      changeData(value, render) {
        this.editorContentHtml = render;
      },
      $imgAdd(pos, $file) {

        let formdata = new FormData();
        formdata.append('file', $file);
        this.img_file[pos] = $file;
        upload(formdata).then((res) => {
          const {
            code,
            url
          } = res;
          if (code == "200") {
            let new_imgUrl = "http://localhost:3000" + url;
            this.$refs.md.$img2Url(pos, new_imgUrl);
          }

        }).catch(error => {
          reject(error)
        })
      },
      $imgDel(pos) {
        delete this.img_file[pos];
      }
    }
  }

</script>
<style lang="scss" scoped>
  .artice {
    width: 100%;
    height: calc(100vh - 120px);
    padding: 30px 15px;

    .top {
      width: 100%;
      height: 120px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;

      .article-name {
        width: 500px;
        margin-right: 15px;

        .a-title {
          width: 80%;
          height: 32px;
          line-height: 32px;
          border-bottom: 2px solid rgb(117, 117, 117);
          font-size: 24px;

          font-weight: bold;
          color: #555555;
        }
      }

      .role-type {

        width: 150px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;

      }



      .article-type {
        width: 300px;
        height: 100px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;
        font-size: 14px;
        color: #555555;

        .article-about {
          width: 600px;
          float: left;
          height: 100%;
          display: flex;
          align-items: center;

          .grid {
            margin-left: 15px;
            margin-right: 15px;
            display: inline-block;
            width: 100px
          }

          img {
            width: 120px;
            height: 170px;
          }
        }

        .article-handel {
          width: 300px;
          float: right;


        }

      }
    }

   


  }

</style>
