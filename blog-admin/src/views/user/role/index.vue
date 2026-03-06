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
        <span class="demonstration">按照名称：</span>
        <el-input
          v-model="search.name"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>
    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['role-add']" @click="handleAdd"
        >新增</el-button
      >
      <el-button type="primary" @click="searchList">搜索</el-button>
      <el-button v-permission="['role-del']" @click="batchDel">批量删除</el-button>
      
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
          prop="name"
          label="角色名称"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="routers"
          label="路由表"
          align="center"
          :formatter="Tableformatter"
        >
        </el-table-column>
        <el-table-column
          prop="permission_btns"
          label="权限按钮"
          align="center"
          :formatter="Tableformatter"
        >
        </el-table-column>

        <el-table-column
          prop="updatedAt"
          width="100"
          label="更新时间"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-permission="['role-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['role-del']"
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
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="路由表">
          <el-input
            v-model="form.routers"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="按钮权限">
          <el-tree
            :data="form.btns"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
          >
          </el-tree>
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
import { findAll, create, updata, del, batchDel } from "@/api/role.js";
import { permission } from "./btns.js";
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
        routers: "",
        permission_btns: "",
        btns: permission,
      },
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      categoryName: "",
      total: 400,
      dialogVisible: false,
    };
  },
  mounted() {
    this.findAll();
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
      if (!cellValue) {
        return "字段为空值";
      } else {
        return cellValue.substring(0, 300) + "...";
      }
    },
    // 按照固定条件搜索
    searchList() {
      console.log("进入搜索");
      let msg = JSON.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.search.name,
        startTime: this.search.time[0],
        endTime: this.search.time[1],
      });
      findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
          let new_list = data.rows.map((el, index) => {
            return {
              id: el.id,
              name: el.name,
              routers: el.routers,
              permission_btns: el.permission_btns,
              updatedAt: el.updatedAt,
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
      });
      findAll(msg).then((res) => {
        let { data, code } = res;
        if (code == "200") {
          let new_list = data.rows.map((el, index) => {
            return {
              id: el.id,
              name: el.name,
              routers: el.routers,
              permission_btns: el.permission_btns,
              updatedAt: el.updatedAt,
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
      this.form.btns = permission;
      this.dialogVisible = true;
      this.submitState = 0;
    },
    // 进行编辑
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.submitState = 1;
      let new_row = Object.assign({}, row);
      this.form.id = new_row.id;
      this.form.name = new_row.name;
      this.form.routers = new_row.routers;
      this.form.permission_btns = new_row.permission_btns;
      this.setKey();
    },
    setKey() {
      let node_key = JSON.parse(this.form.permission_btns);
      console.log("node_key.key",node_key.key)
      if (node_key.key) {
        this.$nextTick(()=>{
          this.$refs.tree.setCheckedKeys(node_key.key);
        })
      }
    },
    getKey() {
      let node_premission = this.$refs.tree.getCheckedNodes(true);
      let node_ley = this.$refs.tree.getCheckedKeys(true);
      let permission_btns = {};
      node_premission.forEach((item) => {
        permission_btns[item.permission] = true;
      });

      this.form.permission_btns = JSON.stringify({
        btns: permission_btns,
        key: node_ley,
      });

      // this.$store.commit('permission/SET_BTNS',permission_btns)
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
      this.getKey();
      switch (this.submitState) {
        case 0:
          let msg_create = JSON.stringify({
            name: this.form.name,
            permission_btns: this.form.permission_btns,
            routers: this.form.routers,
          });
          create(msg_create).then((res) => {
            let { code } = res;
            if (code == "200") {
              this.dialogVisible = false;
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
            name: this.form.name,
            permission_btns: this.form.permission_btns,
            routers: this.form.routers,
          });
          updata(msg_updata).then((res) => {
            let { articleType, code } = res;
            if (code == "200") {
              this.dialogVisible = false;
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
  }

  .page-nation {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    text-align: center;
  }
}
</style>
