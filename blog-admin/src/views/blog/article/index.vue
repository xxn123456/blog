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
        <span class="demonstration">文章名称：</span>
        <el-input
          v-model="search.name"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>

    <div class="table-handle-btns">
      <el-button
        v-permission="['article-add']"
        type="primary"
        @click="handleAdd"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button type="success" @click="searchList"
        ><i class="el-icon-search"></i> 搜索</el-button
      >
      <el-button type="danger" v-permission="['article-del']" @click="batchDel"
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
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章名称"
          width="300"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="navName" label="栏目导航" align="center">
        </el-table-column>

        <el-table-column label="图片预览" width="300" align="center">
          <template slot-scope="scope">
            <img
              class="carousel-item-img"
              :src="scope.row.book"
              alt="默认图片地址"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="vistNum"
          label="阅读量"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="reply" label="评论数" width="150" align="center">
        </el-table-column>

        <el-table-column
          prop="updatedAt"
          label="发布时间"
          align="center"
          width="100"
        >
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-permission="['article-deit']"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i> 修改</el-button
            >
            <el-button
              size="mini"
              type="warning"
              v-permission="['article-cont']"
              @click="handleEditCont(scope.$index, scope.row)"
              ><i class="el-icon-document"></i> 编辑内容</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['article-del']"
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
        :page-size="pageSize"
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
        <el-form-item label="文章名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="归档">
          <el-select v-model="form.navTypeId" placeholder="请选择">
            <el-option
              v-for="item in articleType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面">
          <el-upload
            class="upload-demo"
            :action="upApi"
            multiple
            list-type="picture"
            :limit="1"
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

        <el-form-item label="阅读量">
          <el-input-number
            v-model="form.visitNum"
            @change="handleChange"
            :min="1"
            :max="5"
            label="描述文字"
          >
          </el-input-number>
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
import * as api from "@/api/article.js";
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
        navTypeId: "",
        fileList: [],
        book: "",
        visitNum: 0,
      },
      articleType: [],
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [],
      tableConfig: {
        navTypeIdFormat: [],
      },
      currentPage: 1,
      pageSize: 5,
      categoryName: "",
      total: 400,
      dialogVisible: false,
    };
  },
  mounted() {
    this.findAll();
    this.findArticleType();
  },
  computed: {
    upApi() {
      return imgUploadApi + "/upload/oss";
    },
  },
  methods: {
    // ==================== 数据查询 ====================
    /**
     * 查询文章列表（初始化/分页切换/搜索）
     * @param {Object} searchParams - 搜索参数（可选）
     */
    findAll(searchParams = {}) {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        title: this.search.name,
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
              let navName = "-";
              if (el.navType && el.navType.categoryName) {
                navName = el.navType.categoryName;
              }
              let reply = "-";
              if (el.reply) {
                reply = el.reply.length;
              }
              return {
                id: el.id,
                title: el.title,
                navName: navName,
                navType: el.navType,
                book: el.book,
                vistNum: el.visitNum,
                reply: reply,
                content: el.content,
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
     * 按照条件搜索文章（复用 findAll 方法）
     */
    searchList() {
      this.currentPage = 1; // 搜索时重置到第一页
      this.findAll();
    },

    /**
     * 查询所有栏目导航列表
     */
    findArticleType() {
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 100,
      });
      api.findAllNav(msg).then((res) => {
        this.articleType = [];
        let { code, data } = res;
        let cateNames = data.rows;
        if (code == "200") {
          cateNames.forEach((el) => {
            this.articleType.push({
              value: el.id,
              label: el.categoryName,
            });
          });
          this.tableConfig.navTypeIdFormat = cateNames;
        }
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
     * 栏目导航字段格式化（未使用）
     */
    formatterNav(row, column, cellValue, index) {
      let rowVal = this.tableConfig.navTypeIdFormat.filter((item) => {
        if (item.categoryNum == row.navTypeId) {
          return item;
        }
      });

      if (rowVal.length > 0) {
        return rowVal[0].categoryName;
      } else {
        return "未定义";
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
              messages: "发布的文章名称",
            },
          }),
        ]
      );
    },

    /**
     * 查询表格标题（未使用）
     */
    queryTablefitle() {},

    // ==================== 文章管理（增删改） ====================
    /**
     * 打开新增文章对话框
     */
    handleAdd() {
      this.cleanRow();
      this.dialogVisible = true;
      this.findArticleType();
      this.submitState = 0;
    },

    /**
     * 打开编辑文章对话框
     */
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.findArticleType();
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.title = new_row.title;
      this.form.navTypeId = new_row.navType.id;
      this.form.vistNum = new_row.vistNum;
      this.form.book = new_row.book;
      this.form.content = new_row.content;
      this.submitState = 1;
      if (new_row.book) {
        this.form.fileList = [
          {
            name: new_row.book,
            url: new_row.book,
          },
        ];
      }
    },

    /**
     * 跳转到编辑文章内容页面
     */
    handleEditCont(index, row) {
      this.$router.push({
        path: "/blogEdit",
        query: {
          id: row.id,
        },
      });
    },

    /**
     * 删除单个文章
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
     * 批量删除文章
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
      if (!this.form.title) {
        this.$message.warning("请输入文章名称");
        return false;
      }
      return true;
    },

    /**
     * 提交新增
     */
    submitCreate() {
      const msg = JSON.stringify({
        title: this.form.title,
        navTypeId: this.form.navTypeId,
        vistNum: this.form.vistNum,
        book: this.form.book,
        content: this.form.content,
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
        title: this.form.title,
        navTypeId: this.form.navTypeId,
        vistNum: this.form.vistNum,
        book: this.form.book,
        content: this.form.content,
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
        this.form.book = response.url;
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
     * 阅读量改变
     */
    handleChange(val) {
      this.form.visitNum = val;
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
  /deep/ .el-upload-list__item-thumbnail {
    width: auto;
  }

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
        width: 80px;
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
