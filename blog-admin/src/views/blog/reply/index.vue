<template>
  <div class="table-wrap">
    <div class="search-wrap">
      <div class="search">
        <span class="demonstration">更新时间：</span>
        <el-date-picker
          v-model="search.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="search">
        <span class="demonstration">评论人：</span>
        <el-input
          v-model="search.name"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>

    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['set-add']" @click="handleAdd"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button type="success" @click="searchList"
        ><i class="el-icon-search"></i> 搜索</el-button
      >
      <el-button type="danger" v-permission="['set-del']" @click="batchDel"
        ><i class="el-icon-delete"></i> 删除</el-button
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
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评价内容"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="replyBlog" label="对应文章" align="center">
        </el-table-column>
        <el-table-column prop="replyUserName" label="评论人" align="center">
        </el-table-column>
        <el-table-column label="评论人头像" align="center">
          <template slot-scope="scope">
            <img
              class="carousel-item-img"
              :src="scope.row.replyUserLogo"
              alt="默认图片地址"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="replyUserEmail"
          label="评论人邮箱"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="updatedAt"
          label="更新时间"
          width="100"
          align="center"
        >
        </el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-permission="['set-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['set-del']"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i> 删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        background
        :total="total"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="运营位名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="配置项">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="form.configs"
          ></el-input>
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
import * as api from "@/api/reply.js";
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
        name: "",
        configs: "",
      },
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      categoryName: "",
      total: 10,
      dialogVisible: false,
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    // ==================== 数据查询 ====================
    /**
     * 查询评论列表（初始化/分页切换/搜索）
     * @param {Object} searchParams - 搜索参数（可选）
     */
    findAll(searchParams = {}) {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.search.name,
        ...searchParams,
      };

      // 如果有时间范围搜索条件，添加到参数中
      if (this.search.time && this.search.time.length === 2) {
        params.startTime = this.search.time[0];
        params.endTime = this.search.time[1];
      }

      let msg = JSON.stringify(params);
      return new Promise((resolve, reject) => {
        api.findAll(msg).then((res) => {
          let { data, code } = res;
          if (code == "200") {
            let new_list = data.rows.map((el, index) => {
              let replyTitle = "标题丢失了";
              if (el.article && el.article.title) {
                replyTitle = el.article.title;
              }
              let avatar = require("@/assets/user/defeaut-user.jpg")
              if(el.user && el.user.avatar){
                avatar = el.user.avatar;
              }
              return {
                id: el.id,
                comment: el.comment,
                user: el.user,
                replyUserName: el.user.username||"匿名用户",
                replyUserLogo: avatar,
                replyUserEmail: el.user.email||"邮箱丢失了",
                replyBlog: replyTitle,
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

    /**
     * 按照条件搜索评论（复用 findAll 方法）
     */
    searchList() {
      this.currentPage = 1; // 搜索时重置到第一页
      this.findAll();
    },

    // ==================== 表格操作 ====================
    /**
     * 表格多选操作
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页切换
     */
    currentChange(page) {
      this.currentPage = page;
      this.findAll();
    },

    /**
     * 当前页改变（未使用）
     */
    handleCurrentChange() {},

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
          style: "display:flex;margin:auto;",
        },
        [
          h("span", column.label),
          h("prompt-message", {
            props: {
              messages: "文件位于服务器上面的地址",
            },
          }),
        ]
      );
    },

    // ==================== 评论管理（增删改） ====================
    /**
     * 打开新增评论对话框
     */
    handleAdd() {
      this.cleanRow();
      this.dialogVisible = true;
      this.submitState = 0;
    },

    /**
     * 打开编辑评论对话框
     */
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.name = new_row.name;
      this.form.configs = new_row.configs;
    },

    /**
     * 删除单个评论
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
     * 批量删除评论
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
    submit() {
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
        handler();
      } else {
        this.$message("操作异常");
      }
    },

    /**
     * 表单验证
     */
    validateForm() {
      if (!this.form.name) {
        this.$message.warning("请输入运营位名称");
        return false;
      }
      return true;
    },

    /**
     * 提交新增
     */
    submitCreate() {
      const msg = JSON.stringify({
        name: this.form.name,
        configs: this.form.configs,
      });

      api.create(msg)
        .then((res) => {
          if (res.code === "200") {
            this.$message.success("新增成功");
            this.dialogVisible = false;
            this.findAll();
          } else {
            this.$message.error(res.msg || "新增失败");
          }
        })
        .catch((err) => {
          this.$message.error("新增失败：" + (err.message || "未知错误"));
        });
    },

    /**
     * 提交编辑
     */
    submitUpdate() {
      const msg = JSON.stringify({
        id: this.form.id,
        name: this.form.name,
        configs: this.form.configs,
      });

      api.updata(msg)
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

    // ==================== 文件上传（未使用） ====================
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
  },
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  padding: 30px 15px;
  color: #555555;
  background-color: #fff;

  .table-handle-btns {
    width: 100%;
    height: 50px;
  }

  .search-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    .search {
      height: 50px;
      .demonstration {
        display: inline-block;
        height: 40px;
        margin-right: 10px;
      }

      .search-name {
        width: 240px;
      }
    }
  }

  .table-main {
    width: 100%;
    .carousel-item-img {
      width: 40px;
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
