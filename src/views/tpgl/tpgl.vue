<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.djqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.djzzrq" type="date" placeholder="订单终止日期" class="filter-item" />

      <el-select size="mini" v-model="listQuery.tplx" placeholder="头皮类型" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.TPLX" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.jgry" placeholder="加工人员" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.wdks" :placeholder="$t('table.wdks')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDKS" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-select size="mini" v-model="listQuery.wdcc" :placeholder="$t('table.wdcc')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDCC" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button size="mini" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves size="mini" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <el-table show-summary :summary-method="getSummaries" size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column label="登记日期" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头皮类型" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.tplx | parseCode('TPLX') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加工人员" width="116px">
        <template slot-scope="scope">
          <span>{{ scope.row.jgry | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdks')" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('WDKS') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdcc')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('WDCC') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="数量" width="100px" prop="sl">
        <template slot-scope="scope">
          <span>{{ scope.row.sl }}</span>
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

        <el-form-item value-format="yyyy-MM-dd" label="登记日期" prop="djrq">
          <el-date-picker v-model="temp.djrq" type="date" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="头皮类型">
          <el-select v-model="temp.tplx" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.TPLX" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="加工人员" prop="jgry">
          <el-select v-model="temp.jgry" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.wdks')" prop="wdks">
          <el-select v-model="temp.wdks" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.WDKS" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.wdcc')" prop="wdcc">
          <el-select v-model="temp.wdcc" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.WDCC" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="sl">
          <el-input-number v-model="temp.sl" :step="1"></el-input-number>
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
import { queryTpdjinfo, addTpdjinfo, deleteTpdjinfo } from '@/api/tpgl'
import waves from '@/directive/waves'
import { parseTime, parseCode } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack'

export default {
  name: 'tpglManage',
  components: { Pagination },
  directives: { waves },
  mounted() {
    var begin = new Date();
    var djqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.djqsrq = parseTime(djqsrq1, '{y}-{m}-{d}');
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      zsl: 0,
      hjzje: 0,
      total: 0,
      listLoading: false,
      downloadLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        page: 1,
        limit: 100,
        djqsrq: null,
        djzzrq: null,
        tplx: undefined,
        wdcc: undefined,
        wdks: undefined,
        jgry: undefined,
        sl: undefined,
        dj: undefined,
        zje: undefined,
      },
      temp: {
        tpdjid: undefined,
        tplx: '',
        jgry: '',
        wdks: '',
        wdcc: '',
        djrq: '',
        sl: undefined,
        bz: '',
        yxbz: 1,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '新增头皮登记信息'
      },
      rules: {
        djrq: [{ required: true, message: '登记日期必须选择', trigger: 'blur' }],
        tplx: [{ required: true, message: '头皮类型必须选择', trigger: 'change' }],
        wdks: [{ required: true, message: '网底款式必须选择', trigger: 'change' }],
        wdcc: [{ required: true, message: '网底尺寸必须选择', trigger: 'change' }]
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
      queryTpdjinfo(this.listQuery).then(response => {
        if (response.data.result && response.data.result.tpdjinfoList) {
          this.list = response.data.result.tpdjinfoList
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
        tpdjid: undefined,
        tplx: '',
        jgry: '',
        wdks: '',
        wdcc: '',
        djrq: '',
        sl: undefined,
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
          addTpdjinfo(this.temp).then((response) => {
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
        obj.tpdjid = row.tpdjid
        deleteTpdjinfo(obj).then(() => {
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
      var obj = {        tpdjid: undefined,
        tplx: '',
        jgry: '',
        wdks: '',
        wdcc: '',
        djrq: '合计',
        sl: this.zsl,
        dj: '',
        zje: this.hjzje,
        bz: '',
        yxbz: 1,      }

      var newArr = new Array();
      this.list.forEach(obj => newArr.push(obj));

      newArr.push(obj)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {

        const tHeader = ['登记日期', '头皮类型', '加工人员', '网底款式', '网底尺寸', '数量', '单价', '总金额', '备注']
        const filterVal = ['djrq', 'tplx', 'jgry', 'wdks', 'wdcc', 'sl', 'dj', 'zje', 'bz']
        const data = this.formatJson(filterVal, newArr)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `头皮登记信息_${parseTime(new Date(), '{y}-{m}-{d}')}`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'djrq') {
          if (v[j] == '合计') {
            return v[j]
          }
          return parseTime(v[j], '{y}-{m}-{d}')
        } else if (j === 'tplx') {
          return parseCode(v[j], 'TPLX')
        } else if (j === 'wdks') {
          return parseCode(v[j], 'WDKS')
        } else if (j === 'wdcc') {
          return parseCode(v[j], 'WDCC')
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
      sums[5] = 0;
      sums[7] = 0;
      if (this.list == null || this.list.length == 0) {
        return false;
      }
      this.list.forEach(obj => {
        if (!isNaN(obj.sl)) {
          sums[5] += parseFloat(obj.sl);
        }
        if (!isNaN(obj.zje)) {
          sums[7] += parseFloat(obj.zje);
        }
      })
      this.zsl = sums[5];
      this.hjzje = sums[7];
      return sums;
    }

  }
}
</script>
