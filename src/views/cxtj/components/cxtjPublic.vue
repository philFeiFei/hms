<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.smqsrq" type="date" placeholder="扫码起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.smzzrq" type="date" placeholder="扫码终止日期" class="filter-item" />
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

      <el-date-picker v-if='isLh' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.lhsj" type="date" placeholder="领活日期" class="filter-item" />
      <el-select v-if='isLh' size="mini" v-model="listQuery.lhr" :placeholder="$t('table.lhr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isFh' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.fhsj" type="date" placeholder="发货日期" class="filter-item" />
      <el-select v-if='isFh' size="mini" v-model="listQuery.fhr" :placeholder="$t('table.fhr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isGz' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.gzsj" type="date" placeholder="钩针日期" class="filter-item" />
      <el-select v-if='isGz' size="mini" v-model="listQuery.gzr" :placeholder="$t('table.gzr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isZj' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.zjsj" type="date" placeholder="质检日期" class="filter-item" />
      <el-select v-if='isZj' size="mini" v-model="listQuery.zjr" :placeholder="$t('table.zjr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isDj' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.djsj" type="date" placeholder="底胶日期" class="filter-item" />
      <el-select v-if='isDj' size="mini" v-model="listQuery.djr" :placeholder="$t('table.djr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isDjzc' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.djzcsj" type="date" placeholder="底胶转出日期" class="filter-item" />
      <el-select v-if='isDjzc' size="mini" v-model="listQuery.djzcr" placeholder="底胶转出人" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isCpzj' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.cpzjsj" type="date" placeholder="成品质检日期" class="filter-item" />
      <el-select v-if='isCpzj' size="mini" v-model="listQuery.cpzjr" :placeholder="$t('table.cpzjr')" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-date-picker v-if='isZx' value-format="yyyy-MM-dd" size="mini" v-model="listQuery.zxsj" type="date" placeholder="整形日期" class="filter-item" />
      <el-select v-if='isZx' size="mini" v-model="listQuery.zxr" :placeholder="$t('table.zxr')" clearable style="width: 80px" class="filter-item">
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
      <el-table-column v-if='isLh' :label="$t('table.lhsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isLh' :label="$t('table.lhr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.lhr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isFh' :label="$t('table.fhsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isFh' :label="$t('table.fhr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.fhr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isZj' :label="$t('table.zjsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isZj' :label="$t('table.zjr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zjr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isGz' :label="$t('table.gzsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gzsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isGz' :label="$t('table.gzr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.gzr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isDj' :label="$t('table.djsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isDj' :label="$t('table.djr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.djr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isDjzc' label="底胶转出时间" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djzcsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isDjzc' label="底胶转出人" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.djzcr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isZx' :label="$t('table.zxsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zxsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isZx' :label="$t('table.zxr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zxr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if='isCpzj' :label="$t('table.cpzjsj')" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='isCpzj' :label="$t('table.cpzjr')" min-width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjr | parseCode('user') }}</span>
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
  name: 'cxtjPublic',
  components: { Pagination },
  directives: { waves },
  props: {
    listQueryp: {
      type: Object,
      required: true
    },
    isLh: {
      type: Boolean,
      default: false
    },
    isFh: {
      type: Boolean,
      default: false
    },
    isZj: {
      type: Boolean,
      default: false
    },
    isDj: {
      type: Boolean,
      default: false
    },
    isDjzc: {
      type: Boolean,
      default: false
    },
    isZx: {
      type: Boolean,
      default: false
    },
    isGz: {
      type: Boolean,
      default: false
    },
    isCpzj: {
      type: Boolean,
      default: false
    },
  },
  mounted() {
    var begin = new Date();
    var smqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.smqsrq = parseTime(smqsrq1, '{y}-{m}-{d}');
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
      listQuery: this.listQueryp,
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
      if (!(this.listQuery.smqsrq) && !(this.listQuery.ddbh)) {
        //this.$message("订单编号与扫码起始日期都为空，数据量容易过大！！！");
        this.$confirm('订单编号与扫码起始日期都为空，数据量大，查询耗时较长！, 是否继续?', '提示', {
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
        if (this.isLh) {
          var header1 = '领活时间'
          var header2 = '领活人'
          var filter1 = 'lhsj'
          var filter2 = 'lhr'
          var fileName = `领活汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isGz) {
          var header1 = '钩针时间'
          var header2 = '钩针人'
          var filter1 = 'gzsj'
          var filter2 = 'gzr'
          var fileName = `钩针汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isZj) {
          var header1 = '质检时间'
          var header2 = '质检人'
          var filter1 = 'zjsj'
          var filter2 = 'zjr'
          var fileName = `质检汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isDj) {
          var header1 = '底胶时间'
          var header2 = '底胶人'
          var filter1 = 'djsj'
          var filter2 = 'djr'
          var fileName = `底胶汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isDjzc) {
          var header1 = '底胶转出时间'
          var header2 = '底胶转出人'
          var filter1 = 'djzcsj'
          var filter2 = 'djzcr'
          var fileName = `底胶转出汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isZx) {
          var header1 = '整形时间'
          var header2 = '整形人'
          var filter1 = 'zxsj'
          var filter2 = 'zxr'
          var fileName = `整形汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isCpzj) {
          var header1 = '成品质检时间'
          var header2 = '成品质检人'
          var filter1 = 'cpzjsj'
          var filter2 = 'cpzjr'
          var fileName = `成品质检汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        } else if (this.isFh) {
          var header1 = '发货时间'
          var header2 = '发货人'
          var filter1 = 'fhsj'
          var filter2 = 'fhr'
          var fileName = `发货汇总_${parseTime(new Date(), '{y}-{m}-{d}')}`
        }
        const tHeader = ['扫码日期', '订单编号', '色号', '网底款式', '网底尺寸', '发长', header1, header2, '数量']
        const filterVal = ['ddrq', 'ddbh', 'sh', 'wdks', 'wdcc', 'fc', filter1, filter2, 'sl']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: fileName
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'lhr' || j === 'gzr' || j === 'djr' || j === 'djzcr' || j === 'zjr' || j === 'zxr' || j === 'cpzjr' || j === 'fhr') {
          return parseCode(v[j], 'user')
        }
        else if (j === 'lhsj' || j === 'gzsj' || j === 'zjsj' || j === 'djsj' || j === 'djzcsj' || j === 'zxsj' || j === 'cpzjsj' || j === 'fhsj') {
          return parseTime(v[j], '{y}-{m}-{d}')
        } else if (j === 'ddrq') {
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

