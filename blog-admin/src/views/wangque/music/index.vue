<template>
  <div class="table-wrap">
    <div class="table-handle-btns">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="batchDel">删除</el-button>
      <!-- <el-button>导出</el-button> -->
    </div>
    <div class="search">
      <span class="demonstration">创建时间：</span>
      <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期"
        format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="search">
      <span class="demonstration">音乐名称：</span>
      <el-input v-model="search.name" placeholder="请输入内容" class="search-name"></el-input>
      <el-button @click="searchList">开始搜索</el-button>
    </div>

    <div class="table-main">

      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="name" label="音乐名称" width="180"  align="left">
        </el-table-column>
        <el-table-column prop="url" label="储存地址" width="180" align="left" :render-header="renderHeader">
        </el-table-column>

        <el-table-column prop="author" label="作者" width="180" align="left">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="right">
        </el-table-column>

  

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <el-dialog title="操作" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="音乐名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>

        <el-form-item label="文件">
            <el-upload class="upload-demo" action="http://localhost:3000/music/upload"
                multiple :limit="1"
                :on-exceed="handleExceed" :file-list="form.fileList" :on-success="handleSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
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
  import {
    findAll,
    create,
    updata,
    del,
    batchDel
  } from "@/api/music.js";
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
                  name: "我曾",
                  author: "隔壁老樊",
                  url: "www.baidu.com",
                  createdAt: "2021-03-02 23:04:12"
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
                messages: '文件位于服务器上面的地址'
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
       handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSuccess(response, file, fileList){
        let {code}=response;
        if(code=="200"){
          this.form.pic=response.url;
          this.$message("图片上传成功");
        }

      },
     
      // 按照固定条件搜索
      searchList() {
        let msg = qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.search.name,
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
                  name: el.name,
                  author: el.author,
                  url: el.url,
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
      // 多选操作
      handleSelectionChange(val){
         this.multipleSelection = val;
      },
      // 批量删除
      batchDel(){
        let msg_del_before=this.multipleSelection.map((el,index)=>{
           return {
            id: el.id
           }
        });
        let msg_del_after=[];
        msg_del_before.forEach((el,index)=>{
           msg_del_after.push(el.id)
        });
        let msg=qs.stringify({
          batchList:msg_del_after
        });
        batchDel(msg).then((res)=>{
          let {code}=res;
          if(code=="200"){
            this.findAll();

          }else{
             this.$message("批量删除失败")
          }

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
                  name: el.name,
                  author: el.author,
                  url: el.url,
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
      handleAdd() {
        this.cleanRow();
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
        this.form.url = new_row.url,
        this.form.author =new_row.author
      },
    cleanRow() {
        for (let key in this.form) {
          if(key=="fileList"){
              this.form[key]=[]
          }else{
             this.form[key] = ''

          }
         
        }
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
      // 当前页发生改变
      handleCurrentChange() {

      },
      submit() {
        switch (this.submitState) {
          case 0:
          
            let msg_create = qs.stringify({
              name: this.form.name,
              author: this.form.author,
              url:this.form.author
            });
            create(msg_create).then((res) => {
              let {
                date,
                code
              } = res;
              if (code == "200") {
                this.dialogVisible = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("新增失败")
              }

            })
            break;
          case 1:

            let msg_updata = qs.stringify({
              id: this.form.id,
              name: this.form.name,
              author: this.form.author,
              url:this.form.author
            });
            updata(msg_updata).then((res) => {
              let {
                date,
                code
              } = res;
              if (code == "200") {
                this.dialogVisible = false;
                // 刷新表格
                this.findAll();
              } else {
                this.messages("修改失败")
              }

            })
            break;
          default:
            this.$message("操作异常")

        }

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

    }

    .page-nation {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      text-align: center;

    }
  }

</style>
