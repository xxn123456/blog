<template>
  <div class="info">
    <div class="normal" v-if="state==0">
      <el-form ref="form" :model="form" label-width="80px">


        <el-form-item label="图像">
          <div>
            {{form.avtor_url}}
          </div>
        </el-form-item>

        <el-form-item label="生日">
          <div>
            {{form.birdday}}
          </div>
        </el-form-item>

        <el-form-item label="电子邮件">
          {{form.email}}
        </el-form-item>




        <el-form-item label="手机">
          {{form.phone}}
        </el-form-item>


        <el-form-item label="博客链接">
          {{form.blog_url}}
        </el-form-item>

        <el-form-item label="描述">
          {{form.about}}
        </el-form-item>

        <el-form-item label="网站背景">
          {{form.bg_url}}
        </el-form-item>
      </el-form>

    </div>


    <div class="normal" v-else>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="图像">
          <el-input v-model="form.avtor_url"></el-input>
        </el-form-item>

        <el-form-item label="生日">
          <el-input v-model="form.birdday"></el-input>
        </el-form-item>

        <el-form-item label="电子邮件">
          <el-input v-model="form.email"></el-input>
        </el-form-item>




        <el-form-item label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>


        <el-form-item label="博客链接">
          <el-input v-model="form.blog_url"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.about" type="textarea" :rows="10"></el-input>
        </el-form-item>

        <el-form-item label="网站背景">
          <el-input v-model="form.bg_url"></el-input>
        </el-form-item>
      </el-form>

    </div>

    <div class="handle">
      <el-button type="primary" v-if="state==0" @click="edit">修改</el-button>
      <el-button type="primary" v-else @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
  import {
    updata,
    findOne
  } from "@/api/info.js";
  import qs from 'query-string';
  export default {
    data() {
      return {
        state: 0,
        form: {
          birdday: null,
          avtor_url: null,
          email: null,
          phone: null,
          blog_url: null,
          about: null,
          bg_url: null
        }

      }
    },
    methods: {
      queryInfo() {
        let msg = qs.stringify({
          id: "1"
        });
        findOne(msg).then((res) => {
          let {
            data,
            code
          } = res;
          if (code == "200") {
            this.form = data;
          } else {
            this.$message.error("请求异常");
          }

        })

      },
      edit() {
        this.state = 1;
      },
      submit() {
        let msg = qs.stringify({
          id:1,
          birdday: this.form.birdday,
          avtor_url: this.form.avtor_url,
          email: this.form.email,
          phone: this.form.phone,
          blog_url: this.form.blog_url,
          about: this.form.about,
          bg_url: this.form.bg_url
        });
        updata(msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.$message.success("更新成功");
            this.state=0;
          }

        })

      }
    },
    mounted() {
      this.queryInfo();

    }
  }

</script>
<style lang="scss" scoped>
  .info {
    padding: 30px 20px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    .normal {
      width: 800px;
    }

    .handle {
      width: 100%;
      min-height: 80px;
      text-align: center;
    }

  }

</style>
