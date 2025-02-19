<template>
  <div class="table-wrap">
   
    <div class="search">
      <span class="demonstration">创建时间：</span>
      <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期"
        format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="search">
      <span class="demonstration">操作用户：</span>
      <el-input v-model="search.name" placeholder="请输入内容" class="search-name"></el-input>
      <el-button @click="searchList">开始搜索</el-button>
    </div>

    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="url" label="请求接口"  align="center">
        </el-table-column>

        

        <el-table-column prop="desc" label="请求参数"  align="center">
        </el-table-column>

        <el-table-column prop="host" label="请求地址"  align="center">
        </el-table-column>
       

        <el-table-column prop="nickname" label="操作的用户" align="center">
        </el-table-column>
        <el-table-column prop="createdAt" label="请求时间" align="center">
        </el-table-column>

      </el-table>
    </div>
    <div class="page-nation">
      <el-pagination :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" background
        :total="total" @current-change="currentChange">


      </el-pagination>
    </div>


  </div>
</template>
<script>
  import {
    findAll
  } from "@/api/log.js";
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
          id: 0,
          url: "#",
          method: "-",
          desc: "-",
          host: "-",
          nickname: "-",
          createdAt: "----"

        },
        // 0代表新增操作,1代码修改操作
        submitState: 0,
        tableData: [{
           id: 0,
          url: "#",
          method: "-",
          desc: "-",
          host: "-",
          nickname: "-",
          createdAt: "----"
        }],
        currentPage: 1,
        pageSize: 10,
        categoryName: "",
        total: 10,
        dialogVisible: false

      }
    },
    mounted() {
      this.findAll();

    },
    methods: {
    
      Tableformatter(row, column, cellValue, index) {
        if (cellValue == "" || cellValue == null || cellValue == undefined) {
          return "字段为空值"
        } else {
          return cellValue
        }
      },
    

      // 按照固定条件搜索
      searchList() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          nickname: this.search.name,
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

            let new_list = data.rows.map((el, index) => {
                return {
                  id: el._id,
                  url: el.url,
                  method: el.biuContent,
                  desc: el.desc,
                  host: el.host,
                  nickname: el.nickname,
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

      findAll() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
       findAll(msg).then((res) => {
            let {
              data,
              code
            } = res;
            if (code == "200") {

              let new_list = data.rows.map((el, index) => {
                return {
                  id: el._id,
                  url: el.url,
                  method: el.biuContent,
                  desc: el.desc,
                  host: el.host,
                  nickname: el.nickname,
                  createdAt: el.createdAt
                }
              })

              this.tableData = new_list;
              this.total = data.count;
            } else {
              this.$message("获取分页失败")
            }

          })

      },

      handleClose() {
        this.dialogVisible = false;
      },
      currentChange(page) {
        this.currentPage = page;
        this.findAll();
      },
      handleSelectionChange(){
        
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

      .color-show {
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
