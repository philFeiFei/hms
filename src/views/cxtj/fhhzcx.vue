<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />
      <el-input size="mini" :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 80px;" class="filter-item" />
      <el-select size="mini" v-model="listQuery.sh" :placeholder="$t('table.sh')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.wdks" :placeholder="$t('table.wdks')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDKS" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.wdcc" :placeholder="$t('table.wdcc')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDCC" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.fc" :placeholder="$t('table.fc')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.FC" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.lhsj" type="date" placeholder="领活日期" class="filter-item" />

      <el-select size="mini" v-model="listQuery.lhr" :placeholder="$t('table.lhr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button v-waves size="mini" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column :label="$t('table.ddrq')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" min-width="75px">
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('SH') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdks')" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('WDKS') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdcc')" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('WDCC') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.fc')" min-width="65px">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('FC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.fhr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.sl}}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="defaultPage" :limit.sync="defaultLimit" />

  </div>
</template>

<script>
import { hzcx } from '@/api/cxtj'
import waves from '@/directive/waves' // Waves directive
import { parseTime, parseCode } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'fhhzcx',
  components: { Pagination },
  directives: { waves },

  mounted() {
    var begin = new Date();
    var ddqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.ddqsrq = parseTime(ddqsrq1, '{y}-{m}-{d}');
  },
  data() {
    return {
      tableKey: 0,
      defaultPage: 1,
      defaultLimit: 100,
      list: null,
      total: 0,
      listLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        ddqsrq: null,
        ddzzrq: null,
        lhsj: null,
        ddbh: null,
        sh: null,
        wdcc: null,
        wdks: null,
        fc: null,
        lhr: null,
        querytype: 2,
      },
      downloadLoading: false
    }
  },
  computed: {
    //把上面table的数据源改为‘currentPageList'，并且子组件去掉$emit('pagiation')事件。
    currentPageList() {
      var limitC = this.defaultLimit
      var pageC = this.defaultPage
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
      //check some limit
      if (!(this.listQuery.ddqsrq) && !(this.listQuery.ddbh)) {
        //this.$message("订单编号与订单起始日期都为空，数据量容易过大！！！");
        this.$confirm('订单编号与订单起始日期都为空，数据量大，查询耗时较长！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.queryList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消查询'
          });
        });
      } else {
        this.queryList()
      }

    },
    queryList() {
      this.defaultPage = 1
      this.listLoading = true
      hzcx(this.listQuery).then(response => {
        if (response.data.result && response.data.result.jfhzlist) {
          this.list = response.data.result.jfhzlist
          this.total = this.list.length
        }

        setTimeout(() => {
          this.listLoading = false
        }, 0 * 1000)
      })
    },
    handleFilter() {
      this.getList()
    },
    handleDownload() {
      if (this.list == null || this.list.length == 0) {
        this.$message('查询结果为空，没有导出数据');
        return false;
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['订单日期', '订单编号', '色号', '网底款式', '网底尺寸', '发长', '发货时间', '发货人', '数量']
        const filterVal = ['ddrq', 'ddbh', 'sh', 'wdks', 'wdcc', 'fc', 'fhsj', 'fhr', 'sl']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'fhr') {
          return parseCode(v[j], 'user')
        } else if (j === 'ddrq' || j === 'fhsj') {
          return parseTime(v[j], '{y}-{m}-{d}')
        } else if (j === 'sh') {
          return parseCode(v[j], 'SH')
        } else if (j === 'wdks') {
          return parseCode(v[j], 'WDKS')
        } else if (j === 'wdcc') {
          return parseCode(v[j], 'WDCC')
        } else if (j === 'fc') {
          return parseCode(v[j], 'FC')
        } else {
          return v[j]
        }
      }))
    }

  }
}
</script>
<style scoped>
.fixed-width .el-button--mini {
  width: 40px !important;
}
</style>

