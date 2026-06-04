<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['swiper-add']" @click="handleAdd"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button type="danger" v-permission="['swiper-del']" @click="batchDel"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      >
    </div>

    <div class="table-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column
          prop="title"
          label="轮播标题"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="图片预览" width="300" align="center">
          <template slot-scope="scope">
            <img
              class="carousel-item-img"
              :src="scope.row.pic"
              alt="默认图片地址"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="跳转路径"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-permission="['swiper-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['swiper-del']"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i> 删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation"></div>

    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="轮播标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="跳转路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label="轮播次序">
          <el-input-number
            v-model="form.active"
            @change="handleChange"
            :min="1"
            :max="5"
            label="描述文字"
          >
          </el-input-number>
        </el-form-item>

        <el-form-item label="轮播图">
          <el-upload
            class="upload-demo"
            :action="upApi"
            multiple
            :limit="1"
            list-type="picture"
            :on-exceed="handleExceed"
            :file-list="form.fileList"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          <i class="el-icon-close"></i> 取 消</el-button
        >
        <el-button type="primary" @click="submit">
          <i class="el-icon-check"></i> 确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "@/api/carousel.js";
import imgUploadApi from "@/utils/ossUpload.js";
export default {
  data() {
    return {
      search: {
        time: "",
        name: "",
      },
      multipleSelection: [],
      form: {
        id: "",
        title: "",
        url: "",
        fileList: [],
        userId: "1",
        active: "1",
      },
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [
        {
          id: "-",
          pic: "-",
          url: "-",
          userId: "-",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      categoryName: "",
      total: 400,
      dialogVisible: false,
    };
  },
  mounted() {
    this.findAll();
  },
  filters: {
    handelCarouselImg(val) {
      return imgUploadApi + val;
    },
  },
  computed: {
    upApi() {
      return imgUploadApi + "/upload/oss";
    },
  },
  methods: {
    // ==================== 数据查询 ====================
    /**
     * 查询轮播图列表
     */
    findAll() {
      let msg = JSON.stringify({});
      return new Promise((resolve, reject) => {
        api.findAll(msg).then((res) => {
          let { data, code } = res;
          if (code == "200") {
            let new_list = data.rows.map((el, index) => {
              let pic = el.pic;
              if(!pic){
                pic = require("@/assets/404_images/1.png");
              }
              return {
                id: el.id,
                pic: el.pic,
                url: el.url || "-",
                title: el.title,
                active: el.active,
                userId: el.userId,
                updatedAt: el.updatedAt,
              };
            });
            this.tableData = new_list;
            this.total = data.count;
            resolve();
          } else {
            this.$message("获取分页失败");
            reject();
          }
        });
      });
    },

    // ==================== 表格操作 ====================
    /**
     * 表格多选操作
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 表格数据格式化（未使用）
     */
    Tableformatter(row, column, cellValue, index) {
      if (cellValue == "" || cellValue == null || cellValue == undefined) {
        return "字段为空值";
      } else {
        return cellValue;
      }
    },

    /**
     * 构建表格提示标签（未使用）
     */
    renderHeader(h, { column }) {
      return h(
        "div",
        {
          style:
            "display:flex;margin:auto;flex-direction: row; justify-content: center;",
        },
        [
          h("span", column.label),
          h("prompt-message", {
            props: {
              messages:
                "调整轮播展现次序，1 代表最先展示，最多只能展示五个轮播",
            },
          }),
        ]
      );
    },

    // ==================== 轮播图管理（增删改） ====================
    /**
     * 打开新增轮播图对话框
     */
    handleAdd() {
      this.cleanRow();
      this.dialogVisible = true;
      this.submitState = 0;
    },

    /**
     * 打开编辑轮播图对话框
     */
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.title = new_row.title;
      this.form.url = new_row.url;
      this.form.pic = new_row.pic;
      this.form.active = new_row.active;
      this.form.fileList = [
        {
          name: new_row.pic,
          url: new_row.pic,
        },
      ];
    },

    /**
     * 删除单个轮播图
     */
    handleDelete(index, row) {
      let msg_del = JSON.stringify({
        id: row.id,
      });
      api.del(msg_del).then((res) => {
        let { code } = res;
        if (code == "200") {
          this.dialogVisible = false;
          this.findAll();
        } else {
          this.$message("删除失败");
        }
      });
    },

    /**
     * 批量删除轮播图
     */
    batchDel() {
      let msg_del_before = this.multipleSelection.map((el, index) => {
        return {
          id: el.id,
        };
      });
      let msg_del_after = [];
      msg_del_before.forEach((el, index) => {
        msg_del_after.push(el.id);
      });
      let msg = JSON.stringify({
        batchList: msg_del_after,
      });
      api.batchDel(msg).then((res) => {
        let { code } = res;
        if (code == "200") {
          this.findAll();
        } else {
          this.$message("批量删除失败");
        }
      });
    },

    /**
     * 提交表单（新增/编辑）
     */
    async submit() {
      // 表单验证
      if (!this.validateForm()) {
        return;
      }

      // 根据不同状态执行不同操作
      const submitHandlers = {
        0: this.submitCreate,  // 新增
        1: this.submitUpdate,  // 编辑
      };

      const handler = submitHandlers[this.submitState];
      if (handler) {
        await handler();
      } else {
        this.$message("操作异常");
      }
    },

    /**
     * 表单验证
     */
    validateForm() {
      if (!this.form.title) {
        this.$message.warning("请输入轮播标题");
        return false;
      }
      if (!this.form.pic) {
        this.$message.warning("请上传轮播图片");
        return false;
      }
      return true;
    },

    /**
     * 验证轮播次序是否已存在
     */
    variyActive() {
      return new Promise((resolve, reject) => {
        let msg = JSON.stringify({
          active: this.form.active,
        });
        api.queryCarousel(msg).then((respone) => {
          let { code, state } = respone;
          if (code == "200") {
            resolve(state);
          }
        });
      });
    },

    /**
     * 提交新增
     */
    async submitCreate() {
      // 验证轮播次序
      let hasItemActive;
      await this.variyActive().then((res) => {
        hasItemActive = res;
      });

      if (hasItemActive == "0") {
        const msg = JSON.stringify({
          pic: this.form.pic,
          title: this.form.title,
          url: this.form.url,
          userId: this.form.userId,
          active: this.form.active,
        });

        api.create(msg)
          .then((res) => {
            let { data, code, des } = res;
            if (code == "200") {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.findAll();
            } else if (code == "401") {
              this.$message.error("超过最大轮播图限制");
              this.dialogVisible = false;
            } else {
              this.$message.error(des || "新增失败");
            }
          })
          .catch((err) => {
            this.$message.error("新增失败：" + (err.message || "未知错误"));
          });
      } else {
        this.$message.warning("当前次序已经存在");
      }
    },

    /**
     * 提交编辑
     */
    submitUpdate() {
      const msg = JSON.stringify({
        id: this.form.id,
        pic: this.form.pic,
        title: this.form.title,
        url: this.form.url,
        userId: this.form.userId,
        active: this.form.active,
      });

      api.update(msg)
        .then((res) => {
          if (res.code === "200") {
            this.$message.success("修改成功");
            this.dialogVisible = false;
            this.findAll();
          } else {
            this.$message.error(res.msg || "修改失败");
          }
        })
        .catch((err) => {
          this.$message.error("修改失败：" + (err.message || "未知错误"));
        });
    },

    // ==================== 文件上传 ====================
    /**
     * 超出文件数量限制提示
     */
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    /**
     * 文件上传成功回调
     */
    handleSuccess(response, file, fileList) {
      let { code } = response;
      if (code == "200") {
        this.form.pic = response.url;
        this.$message.success("图片上传成功");
      }
    },

    // ==================== 辅助方法 ====================
    /**
     * 清空表单数据
     */
    cleanRow() {
      for (let key in this.form) {
        if (key == "fileList") {
          this.form[key] = [];
        } else {
          this.form[key] = "";
        }
      }
    },

    /**
     * 关闭对话框
     */
    handleClose() {
      this.dialogVisible = false;
    },

    /**
     * 轮播次序改变
     */
    handleChange(val) {
      this.form.active = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  padding: 30px 15px;
  color: #555555;
  background-color: #fff;
  /deep/ .el-upload-list__item-thumbnail{
    width: auto;
  }

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
