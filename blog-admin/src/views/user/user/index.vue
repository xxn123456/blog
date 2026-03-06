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
        >新增</el-button
      >
      <el-button type="primary" @click="searchList">搜索</el-button>
      <el-button @click="batchDel" v-permission="['userd-del']"
        >批量删除</el-button
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
              v-permission="['user-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['userd-del']"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="操作"
      :visible.sync="dialogVisiblePass"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="form.passwordReset" show-password></el-input>
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
  updata,
  del,
  batchDel,
  findAllRole,
} from "@/api/user.js";
import IMGURL from "@/utils/setDeafult.js";
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
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      roles: [],
      tableData: [
        {
          artcleTypename: "王大胖",
          artcleTypeNum: "18",
          artcleTypeCreat: "2020-2-22",
          artcleTypeCreatName: "admin",
        },
      ],
      tableConfig: {
        roles: [],
      },
      currentPage: 1,
      pageSize: 10,
      categoryName: "",
      total: 400,
      dialogVisible: false,
      dialogVisiblePass: false,
    };
  },
  computed: {
    upApi() {
      return IMGURL + "/upload/oss";
    },
  },
  mounted() {
    this.findAll();
    this.findAllRole();
  },
  methods: {
    // 构建表格提示标签
    renderHeader(h, { column }) {
      return h(
        "div",
        {
          style: "display:flex;margin:auto;",
        },
        [
          h("span", column.label),
          // 直接用组件就完事了
          h("prompt-message", {
            props: {
              messages: "文章类别名称",
            },
          }),
        ]
      );
    },
    Tableformatter(row, column, cellValue, index) {
      if (cellValue == "" || cellValue == null || cellValue == undefined) {
        return "字段为空值";
      } else {
        return cellValue;
      }
    },

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
    // 按照固定条件搜索
    searchList() {
      let msg = JSON.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        username: this.search.username,
        startTime: this.search.time[0],
        endTime: this.search.time[1],
      });
      findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
          let new_list = data.rows.map((el, index) => {
            let roleName = "-";
            if (el.role && el.role.name) {
              roleName = el.role.name;
            }
            return {
              id: el.id,
              username: el.username,
              avatar: el.avatar,
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
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
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
    findAll() {
      let msg = JSON.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        username: this.username,
      });
      findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
          let new_list = data.rows.map((el, index) => {
            let roleName = "-";
            if (el.role && el.role.name) {
              roleName = el.role.name;
            }
            return {
              id: el.id,
              username: el.username,
              avatar: el.avatar,
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
    handleAdd() {
      this.cleanRow();
      this.findAllRole();
      this.form.fileList = [];
      this.dialogVisible = true;
      this.submitState = 0;
    },
    findAllRole() {
      let msg = JSON.stringify({
        currentPage: 1,
        pageSize: 100,
      });
      findAllRole(msg).then((res) => {
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
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleSuccess(response, file, fileList) {
      let { code } = response;
      if (code == "200") {
        this.form.avatar = response.url;
        this.$message("图片上传成功");
      }
    },
    // 进行编辑
    handleEdit(index, row) {
      this.dialogVisible = true;
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

    handleEditPass(index, row) {
      this.dialogVisiblePass = true;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.submitState = 2;
    },
    cleanRow() {
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    // 进行删除
    handleDelete(index, row) {
      let msg_del = JSON.stringify({
        id: row.id,
      });
      del(msg_del).then((res) => {
        let { code } = res;
        if (code == "200") {
          this.dialogVisible = false;
          // 刷新表格
          this.findAll();
        } else {
          this.$message("删除失败");
        }
      });
    },
    // 当前页发生改变
    handleCurrentChange() {},
    submit() {
      switch (this.submitState) {
        case 0:
          let msg_create = JSON.stringify({
            username: this.form.username,
            password: this.form.password,
            avatar: this.form.avatar,
            role_id: this.form.role_id,
          });
          create(msg_create).then((res) => {
            let { code } = res;
            if (code == "200") {
              this.dialogVisible = false;
              this.$message(res.msg);
              // 刷新表格
              this.findAll();
            } else {
              this.$message("新增失败");
            }
          });
          break;
        case 1:
          let msg_updata = JSON.stringify({
            id: this.form.id,
            username: this.form.username,
            password: this.form.password,
            avatar: this.form.avatar,
            role_id: this.form.role_id,
          });
          updata(msg_updata).then((res) => {
            let { code } = res;
            if (code == "200") {
              this.dialogVisible = false;
              // 刷新表格
              this.findAll();
            } else {
              this.$message("修改失败");
            }
          });
          break;
        case 2:
          let msg_pass = JSON.stringify({
            id: this.form.id,
            password: this.form.passwordReset,
          });
          updata(msg_pass).then((res) => {
            let { code } = res;
            if (code == "200") {
              this.dialogVisiblePass = false;
              this.$message(res.msg);
              this.form.passwordReset = "";
              // 刷新表格
              this.findAll();
            } else {
              this.$message("修改失败");
            }
          });
          break;
        default:
          this.$message("操作异常");
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisiblePass = false;
    },
    currentChange(page) {
      this.currentPage = page;
      this.findAll();
    },
  },
};
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  padding: 30px 40px;
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
      width: 50px;
      height: 50px;
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
