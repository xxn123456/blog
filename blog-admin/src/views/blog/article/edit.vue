<template>
  <div class="artice">
    <div class="top">
      <div class="article-type">
        <div class="article-handel">
          <el-button type="primary" round @click="saveArticle"
            >更新文章</el-button
          >
          <el-button round>清空内容</el-button>
          <el-button round @click="goArticle">返回</el-button>
        </div>
      </div>
    </div>
    <div class="mavon-boy">
      <mavon-editor
        v-model="form.editorContent"
        :ishljs="true"
        ref="md"
        codeStyle="tomorrow-night-eighties"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @change="changeData"
      >
      </mavon-editor>
    </div>
  </div>
</template>
<script>
import { upload, findOne, updata} from "@/api/article.js";
import { findAll } from "@/api/navType.js";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      img_file: {},
      form: {
        id: "",
        title: "",
        navTypeId: "",
        userId: "1",
        editorContent: "",
        bookPreview: "",
        book: "http://shutiaogege.top/blog_admin/other/article-pic.png",
        bookUrl: "",
      },
      articleType: [],
      editorContentHtml: null,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let msg = JSON.stringify({
        id: this.$route.query.id,
      });
      findOne(msg).then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.form.title = data.title;
          this.form.editorContent = data.content||"";
        } else {
          this.$message("获取详情失败");
        }
      });
    },


    //  发布文章
    saveArticle() {
      let title_text = document.getElementById("title").innerText;
      this.form.title = title_text;
      let msg = {
        id: this.$route.query.id,
        title: this.form.title,
        content: this.form.editorContent,
      };
      let new_msg = JSON.stringify(msg);
      updata(new_msg)
        .then((res) => {
          let { code } = res;
          if (code == "200") {
            this.$message("更新文章成功");
          } else {
            this.$message("更新文章失败");
          }
        })
        .catch((error) => {
          reject(error);
        });
    },

    goArticle() {
      this.$router.push({
        path: "/blog/article",
      });
    },
    //  md 文本编辑器 获取相应md 文件" @change="changeData"
    changeData(value, render) {
      this.editorContentHtml = render;
    },
    $imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      this.img_file[pos] = $file;
      upload(formdata)
        .then((res) => {
          const { code, url } = res;
          if (code == "200") {
            let new_imgUrl = url;
            this.$refs.md.$img2Url(pos, new_imgUrl);
          }
        })
        .catch((error) => {
          reject(error);
        });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
  },
};
</script>
<style lang="scss" scoped>
.artice {
  width: 100%;
  height: calc(100vh - 120px);
  padding: 30px 15px;
  /deep/ .v-note-wrapper{
    min-height: 600px;
  }

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .article-name {
      width: calc(100% - 300px);
      margin-right: 15px;

      .a-title {
        width: 90%;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #f2f2f2;
        font-size: 24px;
        font-weight: bold;
        color: #555555;
      }
    }

      .article-about {
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 15px;

        .grid {
          margin-left: 15px;
          margin-right: 15px;
          display: inline-block;
          width: 100px;
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
