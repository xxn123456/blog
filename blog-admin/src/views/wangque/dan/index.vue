<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <!-- <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="batchDel">删除</el-button> -->
      <!-- <el-button>导出</el-button> -->
    </div>
    <div class="search">
      <span class="demonstration">创建时间：</span>
      <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期"
        format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="search">
      <span class="demonstration">弹幕内容：</span>
      <el-input v-model="search.name" placeholder="请输入内容" class="search-name"></el-input>
      <el-button @click="searchList">开始搜索</el-button>
    </div>

    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="biuContent" label="弹幕内容" width="500"  align="left">
        </el-table-column>
        <el-table-column label="风格" width="180" align="left" :render-header="renderHeader">
                  <template slot-scope="scope">
                     <span class="color-show" :style="{'backgroundColor':scope.row.color}"></span>
                  </template>
                
        </el-table-column>

        <el-table-column prop="author" label="发起人" align="left">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="right">
        </el-table-column>

  

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination  :current-page="currentPage" :page-size="10"
        layout="total, prev, pager, next, jumper" background :total="total" @current-change="currentChange">


      </el-pagination>
    </div>


  </div>
</template>
<script>
  import {
    findAll,
    create,
    updata,
    del,
    batchDel
  } from "@/api/biu.js";
  import qs from 'query-string';
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
          name: "",
          author:"",
          url: "",
          fileList:[],

        },
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [{
                  id:"1",
                  color: "red",
                  biuContent:"",
                  author:"游客",
                  createdAt: "2021-03-02 23:04:12",
          }],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total:10,
        dialogVisible: false

      }
    },
    mounted() {
      this.findAll();

    },
    methods: {
      // 构建表格提示标签
      renderHeader(h, {
        column
      }) {
        return h(
          'div', {
            style: 'display:flex;margin:auto;'
          },
          [
            h('span', column.label),
            // 直接用组件就完事了
            h('prompt-message', {
              props: {
                messages: '弹幕显示的字体'
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
      handleSelectionChange(){

      },
     
      // 按照固定条件搜索
      searchList() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          biuContent: this.search.name,
          startTime: this.search.time[0],
          endTime: this.search.time[1]
        })
       return new Promise((resolve, reject) => {
          findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
             
              let new_list = data.map((el, index) => {
                return {
                  id: el._id,
                  color: el.color,
                  biuContent: el.biuContent,
                  author: "游客",
                  createdAt: el.createdAt
                }
              })
              this.tableData = new_list;
              this.total=res.total;
            } else {
              this.$message("获取分页失败")
            }

          })
        })


      },
    
      findAll() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        return new Promise((resolve, reject) => {
          findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {
             
              let new_list = data.map((el, index) => {
                return {
                  id: el._id,
                  color: el.color,
                  biuContent: el.biuContent,
                  author: "游客",
                  createdAt: el.createdAt
                }
              })
              this.tableData = new_list;
              this.total=res.total;
            } else {
              this.$message("获取分页失败")
            }

          })
        })

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
      handleClose() {
        this.dialogVisible = false;
      },
      currentChange(page){
        this.currentPage=page;
        this.findAll();
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
      .color-show{
        display: inline-block;
        width: 20px;
        height: 20px;
      
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
