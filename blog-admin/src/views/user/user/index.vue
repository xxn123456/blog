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
        <span class="demonstration">用户名称：</span>
        <el-input
          v-model="search.username"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>

    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['user-add']" @click="handleAdd"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <el-button type="success" @click="searchList"
        ><i class="el-icon-search"></i> 搜索</el-button
      >
      <el-button type="danger" @click="batchDel" v-permission="['userd-del']"
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
        <el-table-column prop="username" label="用户名称" align="center">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
          <template slot-scope="scope">
            <img
              class="carousel-item-img"
              :src="scope.row.avatar"
              alt="默认图片地址"
            />
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-permission="['user-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['userd-del']"
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
      :visible.sync="UserDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="submitState == 0">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleName" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
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
        <el-button @click="UserDialogVisible = false">
          <i class="el-icon-close"></i> 取 消</el-button
        >
        <el-button type="primary" @click="submit">
          <i class="el-icon-check"></i> 确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="操作"
      :visible.sync="passDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="form.passwordReset" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="passDialogVisible = false">
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
import * as api from "@/api/user.js";
import imgUploadApi from "@/utils/ossUpload.js";
export default {
  data() {
    return {
      search: {
        time: "",
        username: "",
        role_id: "",
      },
      multipleSelection: [],
      form: {
        id: "",
        username: "",
        password: "",
        avatar: "",
        role_id: "",
        fileList: [],
        passwordReset: "",
      },
      submitState: 0, // 0代表新增操作,1代码修改操作
      roles: [],
      tableData: [],
      tableConfig: {
        roles: [],
      },
      currentPage: 1,
      pageSize: 10,
      total: 400,
      UserDialogVisible: false,
      passDialogVisible: false,
    };
  },
  computed: {
    upApi() {
      return imgUploadApi + "/upload/oss";
    },
  },
  mounted() {
    this.findAll();
    this.findAllRole();
  },
  methods: {
    // ==================== 数据查询 ====================
    /**
     * 查询用户列表（初始化/分页切换/搜索）
     * @param {Object} searchParams - 搜索参数（可选）
     */
    findAll(searchParams = {}) {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        username: this.search.username,
        ...searchParams,
      };

      // 如果有时间范围搜索条件，添加到参数中
      if (this.search.time && this.search.time.length === 2) {
        params.startTime = this.search.time[0];
        params.endTime = this.search.time[1];
      }

      let msg = JSON.stringify(params);
      api.findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
            let new_list = data.rows.map((el, index) => {
            let roleName = "-";
            if (el.role && el.role.name) {
              roleName = el.role.name;
            }
            let avatar = el.avatar;
            if (!el.avatar) {
              avatar = require("@/assets/user/defeaut-user.jpg");
            }
            return {
              id: el.id,
              username: el.username,
              avatar: avatar,
              roleName: roleName,
              updatedAt: el.updatedAt || "-",
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
     * 按照条件搜索用户（复用 findAll 方法）
     */
    searchList() {
      this.currentPage = 1; // 搜索时重置到第一页
      this.findAll();
    },

    /**
     * 查询所有角色列表
     */
    findAllRole() {
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 100,
      });
      api.findAllRole(msg).then((res) => {
        this.roles = [];
        let { code, data } = res;
        let cateNames = data.rows;
        if (code == "200") {
          cateNames.forEach((el) => {
            this.roles.push({
              value: el.id,
              label: el.name,
            });
          });
          this.tableConfig.roles = cateNames;
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
     * 角色字段格式化（未使用）
     */
    formatterRole(row, column, cellValue, index) {
      let rowVal = this.tableConfig.roles.filter((item) => {
        if (item.id == row.role_id) {
          return item;
        }
      });
      if (rowVal.length > 0) {
        return rowVal[0].name;
      } else {
        return "未定义";
      }
    },

    // ==================== 用户管理（增删改） ====================
    /**
     * 打开新增用户对话框
     */
    handleAdd() {
      this.cleanRow();
      this.findAllRole();
      this.form.fileList = [];
      this.UserDialogVisible = true;
      this.submitState = 0;
    },

    /**
     * 打开编辑用户对话框
     */
    handleEdit(index, row) {
      this.UserDialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.username = new_row.username;
      this.form.role_id = new_row.role_id;
      this.form.avatar = new_row.avatar;
      this.form.fileList = [
        {
          name: new_row.avatar,
          url: new_row.avatar,
        },
      ];
      this.findAllRole();
    },

    /**
     * 打开修改密码对话框（未使用）
     */
    handleEditPass(index, row) {
      this.passDialogVisible = true;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.submitState = 2;
    },

    /**
     * 删除单个用户
     */
    handleDelete(index, row) {
      let msg_del = JSON.stringify({
        id: row.id,
      });
      del(msg_del).then((res) => {
        let { code } = res;
        if (code == "200") {
          this.UserDialogVisible = false;
          this.findAll();
        } else {
          this.$message("删除失败");
        }
      });
    },

    /**
     * 批量删除用户
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
      batchDel(msg).then((res) => {
        let { code } = res;
        if (code == "200") {
          this.findAll();
        } else {
          this.$message("批量删除失败");
        }
      });
    },

    /**
     * 提交表单（新增/编辑/修改密码）
     */
    submit() {
      // 表单验证
      if (!this.validateForm()) {
        return;
      }

      // 根据不同状态执行不同操作
      const submitHandlers = {
        0: this.submitCreate,    // 新增
        1: this.submitUpdate,    // 编辑
        2: this.submitPassword,  // 修改密码
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
      if (this.submitState === 0) {
        // 新增时验证必填项
        if (!this.form.username) {
          this.$message.warning("请输入用户名称");
          return false;
        }
        if (!this.form.password) {
          this.$message.warning("请输入密码");
          return false;
        }
      }
      if (this.submitState === 2) {
        // 修改密码时验证
        if (!this.form.passwordReset) {
          this.$message.warning("请输入新密码");
          return false;
        }
      }
      return true;
    },

    /**
     * 提交新增
     */
    submitCreate() {
      const msg = JSON.stringify({
        username: this.form.username,
        password: this.form.password,
        avatar: this.form.avatar,
        role_id: this.form.role_id,
      });

      create(msg)
        .then((res) => {
          if (res.code === "200") {
            this.$message.success(res.msg || "新增成功");
            this.UserDialogVisible = false;
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
        username: this.form.username,
        password: this.form.password,
        avatar: this.form.avatar,
        role_id: this.form.role_id,
      });

      updata(msg)
        .then((res) => {
          if (res.code === "200") {
            this.$message.success("修改成功");
            this.UserDialogVisible = false;
            this.findAll();
          } else {
            this.$message.error(res.msg || "修改失败");
          }
        })
        .catch((err) => {
          this.$message.error("修改失败：" + (err.message || "未知错误"));
        });
    },

    /**
     * 提交修改密码
     */
    submitPassword() {
      const msg = JSON.stringify({
        id: this.form.id,
        password: this.form.passwordReset,
      });

      updata(msg)
        .then((res) => {
          if (res.code === "200") {
            this.$message.success(res.msg || "密码修改成功");
            this.passDialogVisible = false;
            this.form.passwordReset = "";
            this.findAll();
          } else {
            this.$message.error(res.msg || "密码修改失败");
          }
        })
        .catch((err) => {
          this.$message.error("密码修改失败：" + (err.message || "未知错误"));
        });
    },

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
      this.UserDialogVisible = false;
      this.passDialogVisible = false;
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
        this.form.avatar = response.url;
        this.$message("图片上传成功");
      }
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
    .carousel-item-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
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
