<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.prqsrq" type="date" placeholder="起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.przzrq" type="date" placeholder="终止日期" class="filter-item" />

      <el-select size="mini" v-model="listQuery.sfzl" placeholder="色发种类" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.SFZL" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.fc" :placeholder="$t('table.fc')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.FC" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-select size="mini" v-model="listQuery.sh" :placeholder="$t('table.sh')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.jgry" placeholder="加工人员" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button size="mini" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves size="mini" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <el-table show-summary :summary-method="getSummaries" size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column label="登记日期" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prdjrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="色发种类" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.sfzl | parseCode('SFZL') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fc')" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('FC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('SH') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加工人员" width="116px">
        <template slot-scope="scope">
          <span>{{ scope.row.jgry | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="原发重量" width="100px" prop="yfweight">
        <template slot-scope="scope">
          <span>{{ scope.row.yfweight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="色发重量" width="100px" prop="sfweight">
        <template slot-scope="scope">
          <span>{{ scope.row.sfweight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出成率" width="100px" prop="ccl">
        <template slot-scope="scope">
          <span>{{ scope.row.ccl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.dj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" width="100px" prop="zje">
        <template slot-scope="scope">
          <span>{{ scope.row.zje }}</span>
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

        <el-form-item value-format="yyyy-MM-dd" label="登记日期" prop="prdjrq">
          <el-date-picker v-model="temp.prdjrq" type="date" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="色发种类">
          <el-select v-model="temp.sfzl" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.SFZL" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.fc')" prop="fc">
          <el-select v-model="temp.fc" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.FC" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.sh')" prop="sh">
          <el-select v-model="temp.sh" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="加工人员" prop="jgry">
          <el-select v-model="temp.jgry" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="原发重量" prop="yfweight">
          <el-input-number v-model="temp.yfweight" :precision="3" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="色发重量" prop="sfweight">
          <el-input-number v-model="temp.sfweight" :precision="3" :step="0.1"></el-input-number>
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
import { queryDjinfo, addDjinfo, deleteDjinfo } from '@/api/prgl'
import waves from '@/directive/waves'
import { parseTime, parseCode } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack'

export default {
  name: 'prglManage',
  components: { Pagination },
  directives: { waves },
  mounted() {
    var begin = new Date();
    var prqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.prqsrq = parseTime(prqsrq1, '{y}-{m}-{d}');
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      hjzje: 0,
      total: 0,
      listLoading: false,
      downloadLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        page: 1,
        limit: 100,
        prqsrq: null,
        przzrq: null,
        sfzl: undefined,
        sh: undefined,
        fc: undefined,
        jgry: undefined,
        zje: undefined,
      },
      temp: {
        prdjid: undefined,
        sfzl: '',
        jgry: '',
        fc: '',
        sh: '',
        prdjrq: '',
        yfweight: undefined,
        sfweight: undefined,
        bz: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增漂染登记信息'
      },
      rules: {
        prdjrq: [{ required: true, message: '登记日期必须选择', trigger: 'blur' }],
        sfzl: [{ required: true, message: '色发种类必须选择', trigger: 'change' }],
        fc: [{ required: true, message: '发长必须选择', trigger: 'change' }],
        sh: [{ required: true, message: '色号必须选择', trigger: 'change' }]
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
      queryDjinfo(this.listQuery).then(response => {
        if (response.data.result && response.data.result.prInfoList) {
          this.list = response.data.result.prInfoList
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
        prdjid: undefined,
        sfzl: '',
        jgry: '',
        fc: '',
        sh: '',
        prdjrq: '',
        yfweight: undefined,
        sfweight: undefined,
        bz: '',
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
      this.$confirm('确定要删除该条登记信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        var obj = {
        }
        obj.prdjid = row.prdjid
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

    handleDownload() {
      if (this.list == null || this.list.length == 0) {
        this.$message('查询结果为空，没有导出数据');
        return false;
      }
      var obj = {        prdjid: undefined,
        sfzl: '',
        jgry: '',
        fc: '',
        sh: '',
        prdjrq: '合计',
        yfweight: '',
        sfweight: '',
        ccl: '',
        dj: '',
        zje: this.hjzje,
        bz: '',      }

      var newArr = new Array();
      this.list.forEach(obj => newArr.push(obj));

      newArr.push(obj)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {

        const tHeader = ['登记日期', '色发种类', '发长', '色号', '加工人员', '原发重量', '色发重量', '出成率', '单价', '总金额', '备注']
        const filterVal = ['prdjrq', 'sfzl', 'fc', 'sh', 'jgry', 'yfweight', 'sfweight', 'ccl', 'dj', 'zje', 'bz']
        const data = this.formatJson(filterVal, newArr)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `漂染登记信息_${parseTime(new Date(), '{y}-{m}-{d}')}`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'prdjrq') {
          if (v[j] == '合计') {
            return v[j]
          }
          return parseTime(v[j], '{y}-{m}-{d}')
        } else if (j === 'sfzl') {
          return parseCode(v[j], 'SFZL')
        } else if (j === 'fc') {
          return parseCode(v[j], 'FC')
        } else if (j === 'sh') {
          return parseCode(v[j], 'SH')
        } else if (j === 'jgry') {
          return parseCode(v[j], 'user')
        } else {
          return v[j]
        }
      }))
    },

    getSummaries(param) {
      const sums = [];
      sums[0] = '合计';
      sums[9] = 0;
      if (this.list == null || this.list.length == 0) {
        return false;
      }
      this.list.forEach(obj => {
        if (obj.zje && !isNaN(obj.zje)) {
          sums[9] = (sums[9] * 1000 + parseFloat(obj.zje) * 1000) / 1000;
        }
      })
      this.hjzje = sums[9];
      return sums;
    }

  }
}
</script>
