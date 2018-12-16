<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column label="参数关键字" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数值" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog title="新增" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="参数编号">
          <span>{{temp.cdbh}}</span>
        </el-form-item>
        <el-form-item label="参数值" prop="cdkey">
          <el-input v-model="temp.cdkey" />
        </el-form-item>
        <el-form-item label="关键字">
          <span>{{temp.cdkey}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addParams } from '@/api/csgl'
import waves from '@/directive/waves' // Waves directive
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'multiPublic',
  components: { Pagination },
  directives: { waves },
  props: {
    csbhp: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        page: 1,
        limit: 100,
      },
      dialogFormVisible: false,

      temp: {
        cdbh: this.csbhp,
        cdkey: undefined,
        cdvalue: undefined,

      },
      rules: {
        cdkey: [{ required: true, message: '参数值必须填写,不要与当前存在的重复', trigger: 'change' }],
      },

    }
  },
  computed: {
    //把上面table的数据源改为‘currentPageList'，并且子组件去掉$emit('pagiation')事件。
    ...mapGetters([
      'code',
    ]),
    list() {
      return this.code[this.csbhp]
    },
    total() {
      return this.list.length
    },
    currentPageList() {
      var limitC = this.listQuery.limit
      var pageC = this.listQuery.page
      if (this.list == null || this.list == undefined) {
        return null;
      }

      return this.list.filter((item, index) => index < limitC * pageC && index >= limitC * (pageC - 1))
    },
  },
  methods: {
    resetTemp() {
      this.temp = {
        cdbh: this.csbhp,
        cdkey: undefined,
        cdvalue: undefined,

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
        this.temp.cdvalue = this.temp.cdkey;
        if (valid) {
          addParams(this.temp).then((response) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `新增${this.temp.cdkey}成功`,
              type: 'success',
              duration: 2000
            })
            this.$store.dispatch('GetConfigFromServer')
          })
        }
      })
    },
  }
}
</script>

