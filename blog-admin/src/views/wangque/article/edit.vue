<template>
  <div class="artice">
    <div class="top">
      <div class="article-name">


        <div contenteditable="true" class="a-title" id="title">文章标题</div>

      </div>

      <div class="article-type">
        <div class="article-about">
          <span class="grid">文章归类：</span>
          <el-select v-model="form.articleTypeId" placeholder="请选择">
            <el-option v-for="item in articleType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

       

        </div>

        <div class="article-handel">
          <el-button type="primary" round @click="saveArticle">更新文章</el-button>
          <el-button round>清空内容</el-button>
          <el-button round @click="goArticle">返回</el-button>

        </div>


      </div>
    </div>
    <div class="mavon-boy">
      <mavon-editor v-model='form.editorContent' :subfield="false" :ishljs="true" ref=md
        codeStyle="tomorrow-night-eighties" @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData">
      </mavon-editor>

    </div>

  </div>
</template>
<script>
  import {
    upload,
    findOne,
    update,
    upBook
  } from '@/api/article.js'
  import qs from 'querystring'
  import { findAll } from "@/api/articleType.js";
  import 'mavon-editor/dist/css/index.css'
  import {IMGURL} from "@/utils/setDeafult.js";
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
          book:'http://shutiaogege.top/wangque_admin/other/article-pic.png',
          bookUrl:""
        },
        articleType: [{
            label: "天涯",
            value: 1
          },
          {
            label: "q前端",
            value: 2
          }

        ],
        editorContentHtml: null,
      }
    },
    mounted() {
      this.getDetail();
      this.findArticleType();
    },
    methods: {
      getDetail() {
        let msg = qs.stringify({
          id: this.$route.query.id
        })
        findOne(msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.form.editorContent = res.data.content;
          } else {
            this.$message("获取详情失败")
          }

        })

      },

      upBook() {
        const that = this;
        const fileNode = document.getElementById('file');
        // 触发原始上传文件的点击事件
        fileNode.click();
        fileNode.addEventListener('change', function (ev) {
          let file= ev.target.files[0];
          that.form.bookPreview=file;


            let formdata = new FormData();
           formdata.append('book', that.form.bookPreview);

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
       findArticleType(){
        let msg=qs.stringify({
          currentPage:1,
          pageSize:100
        })
        findAll(msg).then((res)=>{
            this.articleType=[];
            let {code,articleType}=res;
            let cateNames=articleType.rows;
            if(code=="200"){
                  for(let i=0;i<cateNames.length;i++){
                     this.articleType.push({
                      value:cateNames[i].id,
                      label:cateNames[i].categoryName
                    });
                  }
            }
      
        })
      },

      //  发布文章
      saveArticle() {
        let title_text = document.getElementById('title').innerText;

        this.form.title = title_text;

        let msg = {
          id: this.$route.query.id,
          title: this.form.title,
          articleTypeId: this.form.articleTypeId,
          userId: this.form.userId,
          content: this.form.editorContent,
        }
        let new_msg = qs.stringify(msg);
        update(new_msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.$message("更新文章成功");
          } else {
            this.$message("更新文章失败")
          }
          
        }).catch(error => {
          reject(error)
        })
      },

      goArticle() {
        this.$router.push({
          path: '/blog/article'
        })
      },
      //  md 文本编辑器 获取相应md 文件" @change="changeData"
      changeData(value, render) {

        this.editorContentHtml = render;

      },
      $imgAdd(pos, $file) {

        let formdata = new FormData();
        formdata.append('articleImg', $file);
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
      height: 170px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .article-name {
        width: 100%;
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
        width: 100%;
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
            height: 100%;
          }
        }

        .article-handel {
          width: 300px;
          float: right;


        }

      }
    }

    .mavon-boy {

        min-height: 400px;
     



    }


  }

</style>
