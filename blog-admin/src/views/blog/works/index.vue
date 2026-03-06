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
        <span class="demonstration">作品名称：</span>
        <el-input
          v-model="search.name"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
      <div class="search">
        <span class="demonstration">标签：</span>
        <el-input
          v-model="search.tag"
          placeholder="请输入内容"
          class="search-name"
        ></el-input>
      </div>
    </div>
    <div class="table-handle-btns">
      <el-button type="primary" v-permission="['works-add']" @click="handleAdd"
        >新增</el-button
      >
      <el-button type="primary" @click="searchList">搜索</el-button>
      <el-button v-permission="['works-del']" @click="batchDel">删除</el-button>
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
          label="作品名称"
          width="180"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="tag" label="标签" align="center">
        </el-table-column>

        <el-table-column prop="des" label="描述" width="240" align="center">
        </el-table-column>

        <el-table-column label="封面" width="180" align="center">
          <template slot-scope="scope">
            <img
              class="carousel-item-img"
              :src="scope.row.coverBg"
              alt="默认图片地址"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          align="center"
          :formatter="Tableformatter"
        >
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-permission="['works-edit']"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              v-permission="['works-cont']"
              @click="handleEditCont(scope.$index, scope.row)"
              >编辑内容</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-permission="['works-del']"
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
        <el-form-item label="作品名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="form.des"
            :autosize="{ minRows: 2, maxRows: 10 }"
          ></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findAll, create, updata, del, batchDel } from "@/api/works.js";
import IMGURL from "@/utils/setDeafult.js";
import qs from "query-string";
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
        tag: "",
        des: "",
        cont: "",
        coverBg: "",
        fileList: [],
        cardType: 1,
        height: 280,
      },
      // 0代表新增操作,1代码修改操作
      submitState: 0,
      tableData: [
        {
          artcleName: "忘却之都",
          artcleType: "前端",
          vistNum: "2020",
          CreaterName: "admin",
          artcleCreat: "2021-02-23",
          category: {},
          user: {},
        },
      ],
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
  computed: {
    upApi() {
      return IMGURL + "/upload/oss";
    },
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
              messages: "发布的文章名称",
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
    formatterCard(row, column, cellValue, index) {
      if (row.cardType == 1) {
        return "pc界面/" + row.cardType;
      } else if (row.cardType == 2) {
        return "手机界面/" + row.cardType;
      } else {
        return "未定义";
      }
    },
    // 按照固定条件搜索
    searchList() {
      console.log("进入搜索");
      let msg = JSON.stringify({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        title: this.search.name,
        tag: this.search.tag,
        startTime: this.search.time[0],
        endTime: this.search.time[1],
      });
      return new Promise((resolve, reject) => {
        findAll(msg).then((res) => {
          let { data, code } = res;
          if (code == "200") {
            let new_list = data.rows.map((el, index) => {
              return {
                id: el.id,
                title: el.title,
                tag: el.tag,
                des: el.des || "-",
                coverBg: el.coverBg,
                cont: el.cont,
                updatedAt: el.updatedAt,
              };
            });
            this.tableData = new_list;
            this.total = data.count;
          } else {
            this.$message("获取分页失败");
          }
        });
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
              title: el.title,
              tag: el.tag,
              des: el.des || "-",
              coverBg: el.coverBg,
              cont: el.cont,
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
      this.dialogVisible = true;
      this.submitState = 0;
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
        this.form.coverBg = response.url;
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
      this.form.tag = new_row.tag;
      this.form.des = new_row.des;
      this.form.coverBg = new_row.coverBg;
      this.form.cont = new_row.cont;
      if (new_row.coverBg) {
        this.form.fileList = [
          {
            name: new_row.coverBg,
            url: new_row.coverBg,
          },
        ];
      }
    },
    handleEditCont(index, row) {
      this.$router.push({
        path: "/workEdit",
        query: {
          id: row.id,
        },
      });
    },
    cleanRow() {
      for (let key in this.form) {
        if (key == "fileList") {
          this.form[key] = [];
        } else {
          this.form[key] = "";
        }
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
            title: this.form.title,
            tag: this.form.tag,
            des: this.form.des,
            coverBg: this.form.coverBg,
            cont: "",
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
            title: this.form.title,
            tag: this.form.tag,
            des: this.form.des,
            coverBg: this.form.coverBg
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
    inputHeight(val) {
      if (val == 280) {
        this.form.cardType = 1;
      }
      if (val == 620) {
        this.form.cardType = 2;
      }
    },
    handleChange(val) {
      this.form.cardType = val;
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
