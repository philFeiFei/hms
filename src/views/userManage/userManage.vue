<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" :placeholder="$t('table.username')" v-model="listQuery.username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input size="mini" :placeholder="$t('table.xm')" v-model="listQuery.xm" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select size="mini" v-model="listQuery.xb" :placeholder="$t('table.xb')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.XB" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button size="mini" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px">
      <el-table-column :label="$t('table.username')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <!--  <el-table-column :label="$t('table.password')" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('table.roleId')" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId | parseArrCode('role')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sfzhm')" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.sfzhm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.xm')" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.xm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.sjh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.csrq')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.csrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.xb')" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.xb | parseCode('XB') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jtzz')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.jtzz }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="155" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <!-- <el-form-item :label="$t('table.password')" prop="password">
          <el-input v-model="temp.password" type="password" />
        </el-form-item> -->
        <el-form-item :label="$t('table.roleId')" prop="roleId">
          <el-select v-model="temp.roleId" class="filter-item" placeholder="Please select" multiple>
            <el-option v-for="item in code.role" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.xm')" prop="xm">
          <el-input v-model="temp.xm" />
        </el-form-item>
        <el-form-item label="手机号" prop="sjh">
          <el-input v-model="temp.sjh" />
        </el-form-item>
        <el-form-item :label="$t('table.sfzhm')" prop="sfzhm">
          <el-input v-model="temp.sfzhm" />
        </el-form-item>
        <el-form-item :label="$t('table.csrq')" prop="timestamp">
          <el-date-picker v-model="temp.csrq" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('table.xb')">
          <el-select v-model="temp.xb" class="filter-item" placeholder="Please select">
            <el-option v-for="item in code.XB" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.jtzz')" prop="jtzz">
          <el-input v-model="temp.jtzz" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { queryUser, deleteUser, createUser, updateUser } from '@/api/userManage'
import waves from '@/directive/waves' // Waves directive
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        xm: '',
        sfzhm: undefined,
        sort: '+userId',
        xb: undefined,
      },
      temp: {
        userId: undefined,
        username: '',
        roleId: [],
        xm: '',
        sjh: '',
        xb: undefined,
        csrq: '',
        sfzhm: undefined,
        jtzz: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改用户信息',
        create: '新增用户信息'
      },
      rules: {
        username: [{ required: true, message: '用户名必须填写', trigger: 'change' }],
        xm: [{ required: true, message: '姓名必须填写', trigger: 'blur' }],
        sjh: [{ required: true, message: '手机号必须填写', trigger: 'blur' }],
        roleId: [{ required: true, message: '角色必须选择', trigger: 'change' }]
      },

    }
  },
  computed: {
    //把上面table的数据源改为‘currentPageList'，并且子组件去掉$emit('pagiation')事件。
    currentPageList() {
      var limitC = this.listQuery.limit
      var pageC = this.listQuery.page
      if (this.list == null || this.list == undefined) {
        return null;
      }
      return this.list.filter((item, index) => index < limitC * pageC && index >= limitC * (pageC - 1))
    },
    ...mapGetters([
      'code',
    ]),
  },
  created() {
    //this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryUser(this.listQuery).then(response => {
        if (response.data.result && response.data.result.userlist) {
          this.list = response.data.result.userlist
          this.total = this.list.length
        }

        setTimeout(() => {
          this.listLoading = false
        }, 0 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        userId: undefined,
        username: '',
        roleId: [],
        xm: '',
        sjh: '',
        xb: undefined,
        csrq: '',
        sfzhm: undefined,
        jtzz: '',
        yxbz: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then((response) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      var csrq = this.temp.csrq;
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          //console.log("csrq-saveupdate", tempData.csrq)
          tempData.csrq = +new Date(tempData.csrq) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        var obj = {
        }
        obj.userid = row.userid
        deleteUser(obj).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        })
        //---------operate end---------
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },

  }
}
</script>
