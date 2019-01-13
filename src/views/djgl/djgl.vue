<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select size="mini" v-model="listQuery.czlx" placeholder="工序类型" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.CZLX" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-button size="mini" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column label="工序类型" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.czlx | parseCode('CZLX') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单价" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.dj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.bz }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="155" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">

        <el-form-item label="操作类型">
          <el-select v-model="temp.czlx" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.CZLX" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="单价" prop="dj">
          <el-input-number v-model="temp.dj" :precision="2" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="bz">
          <el-input v-model="temp.bz" />
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
import { queryDjinfo, addDjinfo, deleteDjinfo } from '@/api/djgl'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack'

export default {
  name: 'djgl',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        page: 1,
        limit: 100,
        czlx: undefined,
      },
      temp: {
        djid: undefined,
        czlx: '',
        dj: undefined,
        bz: '',
        yxbz: 1,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增单价信息'
      },
      rules: {
        czlx: [{ required: true, message: '类型必须选择', trigger: 'change' }],
        dj: [{ required: true, message: '单价必须填写', trigger: 'blur' }],
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
  methods: {
    getList() {
      this.listLoading = true
      var obj = {
      }
      obj.czlx = this.listQuery.czlx;
      queryDjinfo(obj).then(response => {
        if (response.data.result && response.data.result.djinfoList) {
          this.list = response.data.result.djinfoList
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
        djid: undefined,
        czlx: '',
        dj: undefined,
        bz: '',
        yxbz: 1,
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
          addDjinfo(this.temp).then((response) => {
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
    handleDelete(row) {
      this.$confirm('确定要删除该条单价信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        var obj = {
        }
        obj.id = row.djid
        deleteDjinfo(obj).then(() => {
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
