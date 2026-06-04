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
        <span class="demonstration">导航名称：</span>
        <el-input
          v-model="search.name"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>

    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['nav-add']" @click="handleAdd"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button type="success" @click="searchList"
        ><i class="el-icon-search"></i> 搜索</el-button
      >
      <el-button type="danger" v-permission="['nav-del']" @click="batchDel"
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
          prop="artcleTypename"
          label="导航名称"
          align="center"
        >
        </el-table-column>

        <el-table-column label="图标" align="center">
          <template slot-scope="scope">
            <span
              class="iconfont"
              :class="scope.row.icon"
              style="font-size: 16px"
            ></span>
          </template>
        </el-table-column>

        <el-table-column prop="leftNavUrl" label="前端跳转路径" align="center">
        </el-table-column>

        <el-table-column
          prop="artcleTypeCreat"
          label="更新时间"
          align="center"
          :formatter="Tableformatter"
        >
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-permission="['nav-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['nav-del']"
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
        <el-form-item label="类别名称">
          <el-input v-model="form.categoryName"></el-input>
        </el-form-item>

        <el-form-item label="图标代码">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="nuxt跳转路径">
          <el-input v-model="form.leftNavUrl"></el-input>
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
import * as api from "@/api/navType.js";
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
        categoryName: "",
        icon: "",
        leftNavUrl: "",
      },
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [
        {
          artcleTypename: "王大胖",
          artcleTypeNum: "18",
          artcleTypeCreat: "2020-2-22",
          artcleTypeCreatName: "admin",
          leftNavUrl: "",
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
  methods: {
    // ==================== 数据查询 ====================
    /**
     * 查询导航类型列表（初始化/分页切换/搜索）
     * @param {Object} searchParams - 搜索参数（可选）
     */
    findAll(searchParams = {}) {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        categoryName: this.search.name,
        ...searchParams,
      };

      // 如枟有时间范围搜索条件，添加到参数中
      if (this.search.time && this.search.time.length === 2) {
        params.startTime = this.search.time[0];
        params.endTime = this.search.time[1];
      }

      let msg = JSON.stringify(params);
      api.findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
          let new_list = data.rows.map((el, index) => {
            return {
              id: el.id,
              artcleTypename: el.categoryName,
              artcleTypeNum: el.categoryNum,
              artcleTypeCreat: el.updatedAt,
              artcleTypeCreatName: el.categoryCreater,
              icon: el.icon,
              leftNavUrl: el.leftNavUrl,
            };
          });
          this.tableData = new_list;
          this.total = data.count;
        } else {
          this.$message("获取分页失败");
        }
      });
    },

    /**
     * 按照条件搜索导航类型（复用 findAll 方法）
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
     * 表格数据格式化
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
              messages: "文章类别名称",
            },
          }),
        ]
      );
    },

    // ==================== 导航类型管理（增删改） ====================
    /**
     * 打开新增导航类型对话框
     */
    handleAdd() {
      this.cleanRow();
      this.dialogVisible = true;
      this.submitState = 0;
    },

    /**
     * 打开编辑导航类型对话框
     */
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.categoryName = new_row.artcleTypename;
      this.form.icon = new_row.icon;
      this.form.leftNavUrl = new_row.leftNavUrl;
    },

    /**
     * 删除单个导航类型
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
     * 批量删除导航类型
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
      if (!this.form.categoryName) {
        this.$message.warning("请输入导航名称");
        return false;
      }
      return true;
    },

    /**
     * 提交新增
     */
    submitCreate() {
      const msg = JSON.stringify({
        categoryName: this.form.categoryName,
        categoryCreater: "admin",
        icon: this.form.icon,
        leftNavUrl: this.form.leftNavUrl,
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
        categoryName: this.form.categoryName,
        categoryCreater: "admin",
        icon: this.form.icon,
        leftNavUrl: this.form.leftNavUrl,
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

    // ==================== 辅助方法 ====================
    /**
     * 清空表单数据
     */
    cleanRow() {
      for (let key in this.form) {
        this.form[key] = "";
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
  }

  .page-nation {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    text-align: center;
  }
}
</style>
