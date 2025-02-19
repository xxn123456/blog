<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="batchDel">删除</el-button>
      <!-- <el-button>导出</el-button> -->
    </div>


    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="title" label="轮播标题" width="180" align="center">
        </el-table-column>
        <el-table-column label="图片预览" width="300" align="center">
          <template slot-scope="scope">
            <img class="carousel-item-img" :src="scope.row.pic" alt="默认图片地址">
          </template>

        </el-table-column>
        <el-table-column prop="url" label="轮播url" align="center" :formatter="Tableformatter">
        </el-table-column>

        <el-table-column prop="active" label="次序" align="center">
        </el-table-column>
      



        <el-table-column prop="createdAt" label="创建时间" align="center">
        </el-table-column>





        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">

    </div>

    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="轮播标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label="轮播次序">
          <el-input-number v-model="form.active" @change="handleChange" :min="1" :max="5" label="描述文字">
          </el-input-number>

        </el-form-item>



        <el-form-item label="轮播图">
          <el-upload class="upload-demo" :action="upApi" multiple :limit="1"
            :on-exceed="handleExceed" :file-list="form.fileList" :on-success="handleSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>


        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    findAll,
    create,
    update,
    del,
    batchDel,
    queryCarousel,
    batchUpdate
  } from "@/api/carousel.js";
  import qs from 'query-string';
  import IMGURL from "@/utils/setDeafult.js";
  export default {
    data() {
      return {
        search: {
          time: "",
          name: ""
        },
        multipleSelection: [],
        form: {
          id: "",
          title: "",
          url: "",
          fileList: [],
          userId: "1",
          active: '1'
        },
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [{
          id: "-",
          pic: "-",
          url: "-",
          userId: "-"
        }],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total: 400,
        dialogVisible: false

      }
    },
    mounted() {
      this.findAll();
    
    },
    filters: {
      handelCarouselImg(val) {
       
        return IMGURL + val
      },
   


    },
    computed:{
      upApi(){
           return IMGURL + '/upload/carousel'
      }

    },
    methods: {

      // 构建表格提示标签
      renderHeader(h, {
        column
      }) {
        return h(
          'div', {
            style: 'display:flex;margin:auto;flex-direction: row; justify-content: center;'
          },
          [
            h('span', column.label),
            // 直接用组件就完事了
            h('prompt-message', {
              props: {
                messages: '调整轮播展现次序，1 代表最先展示，最多只能展示五个轮播'
              }
            })
          ]
        )
      },
      Tableformatter(row, column, cellValue, index) {
        if (cellValue == "" || cellValue == null || cellValue == undefined) {
          return "字段为空值"
        } else {
          return cellValue
        }
      },

      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 批量删除
      batchDel() {
        let msg_del_before = this.multipleSelection.map((el, index) => {
          return {
            id: el.id
          }
        });
        let msg_del_after = [];
        msg_del_before.forEach((el, index) => {
          msg_del_after.push(el.id)
        });
        let msg = qs.stringify({
          batchList: msg_del_after
        });
        batchDel(msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.findAll();

          } else {
            this.$message("批量删除失败")
          }

        })
      },
      findAll() {
        let msg = qs.stringify({

        })
        return new Promise((resolve, reject) => {
          findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
              let new_list = data.rows.map((el, index) => {
                return {
                  id: el.id,
                  pic: el.pic,
                  url: el.url,
                  title: el.title,
                  active: el.active,
                  userId: el.userId,
                  createdAt: el.createdAt
                }
              })
              this.tableData = new_list;
              this.total = data.count;
            } else {
              this.$message("获取分页失败")
            }

          })
        })

      },
      handleAdd() {
        this.cleanRow();
        this.dialogVisible = true;
        this.submitState = 0;
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSuccess(response, file, fileList) {
        let {
          code
        } = response;
        if (code == "200") {
          this.form.pic = response.url;
          this.$message("图片上传成功");
        }

      },

      // 进行编辑
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.submitState = 1;
        let new_row = Object.assign({}, row);
        this.form.id = new_row.id;
        this.form.title = new_row.title;
        this.form.url = new_row.url;
        this.form.pic = new_row.pic
      },
      cleanRow() {
        for (let key in this.form) {
          if (key == "fileList") {
            this.form[key] = []
          } else {
            this.form[key] = ''

          }

        }
      },
      // 进行删除
      handleDelete(index, row) {
        let msg_del = qs.stringify({
          id: row.id
        });
        del(msg_del).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.dialogVisible = false;
            // 刷新表格
            this.findAll();
          } else {
            this.messages("删除失败")
          }

        })

      },
      variyActive() {
        return new Promise((resolve, reject) => {
          let msg = qs.stringify({
            active: this.form.active
          })
          queryCarousel(msg).then((respone) => {
            let {
              code,
              state
            } = respone;
            if (code == "200") {
              resolve(state)
            }

          })
        })

      },

      async submit() {
        switch (this.submitState) {
          case 0:
            let hasItemActive;
            await this.variyActive().then((res) => {
              console.log("res", res)
              hasItemActive = res;

            });
            console.log("获取的状态", hasItemActive)

            if (hasItemActive == "0") {
              let msg_create = qs.stringify({
                pic: this.form.pic,
                title: this.form.title,
                url: this.form.url,
                userId: this.form.userId,
                active: this.form.active

              });

              create(msg_create).then((res) => {
                let {
                  data,
                  code,
                  des
                } = res;
                if (code == "200") {
                  this.dialogVisible = false;
                  // 刷新表格
                  this.findAll();
                } else {
                  this.messages("新增失败")
                }
                if (code == "401") {
                  this.dialogVisible = false;
                  // 刷新表格
                  this.$message("超过最大轮播图限制");
                }
              })

            } else {
              this.$message("当前次序已经存在")
            }


            break;
          case 1:

            let msg_update = qs.stringify({
              id: this.form.id,
              pic: this.form.pic,
              title: this.form.title,
              url: this.form.url,
              userId: this.form.userId,
              active: this.form.active
            });

            update(msg_update).then((res) => {
              let {
                data,
                code
              } = res;
              if (code == "200") {
                this.dialogVisible = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("修改失败")
              }

            })
            break;
          default:
            this.$message("操作异常")

        }

      },
      handleClose() {
        this.dialogVisible = false;
      },
      handleChange(val) {
        this.form.active = val;

      }

    }
  }

</script>
<style lang="scss" scoped>
  .table-wrap {
    width: 100%;
    padding: 90px 60px;
    color: #555555;
    background-color: #fff;

    .table-handle-btns {
      width: 100%;
      height: 50px;

    }

    .search {

      width: 100%;
      height: 50px;

      .demonstration {
        display: inline-block;
        width: 80px;
        height: 40px;
        margin-right: 10px;
      }

      .search-name {
        width: 240px;
      }

    }

    .table-main {
      width: 100%;

      .carousel-item-img {
        width: 160px;
        height: 90px;
      }

    }

    .page-nation {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      text-align: center;

    }
  }

</style>
