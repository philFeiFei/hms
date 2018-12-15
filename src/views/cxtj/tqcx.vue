<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />
      <el-input size="mini" :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 80px;" class="filter-item" />
      <el-select size="mini" v-model="listQuery.tqts" placeholder="拖期天数" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in tqOption" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.sfzf" placeholder="是否作废" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.SF" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button v-waves size="mini" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column :label="$t('table.jfid')" prop="jfid" align="center" width="75" fixed v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.jfid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddrq')" width="90px" align="center" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" width="120px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" width="75px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('SH') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="xh" align="center" min-width="55" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.xh }}</span>
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

      <el-table-column :label="$t('table.fc')" width="65px">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('FC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lhsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lhr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.lhr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.gzsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gzsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.gzr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.gzr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zjsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.zjr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zjr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.djsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.djr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.djr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zxsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zxsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.zxr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zxr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.cpzjsj')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.cpzjr')" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.fhr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否作废" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sfzf | parseCode('SF') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="70px" align="center">
        <template slot-scope="scope">
          <el-tooltip v-if="showBz(scope.row.bz)" :content="scope.row.bz" placement="left" effect="light">
            <el-button size="mini">备注</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="总天数" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tqts}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

  </div>
</template>

<script>
import { queryTqjf } from '@/api/cxtj'
import waves from '@/directive/waves' // Waves directive
import { parseTime, parseCode } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'tqcx',
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
      list: null,
      total: 0,
      listLoading: false,
      tableHeight: window.innerHeight - 200,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 100,
        ddqsrq: null,
        ddzzrq: null,
        ddbh: undefined,
        tqts: 40,
        sfzf: '0',
      },
      tqOption: [
        {
          key: 20,
          value: '20天'
        },
        {
          key: 30,
          value: '30天'
        },
        {
          key: 40,
          value: '40天'
        },
        {
          key: 50,
          value: '50天'
        },
        {
          key: 60,
          value: '60天'
        },
        {
          key: 70,
          value: '70天'
        }
      ]
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
    showBz(bz) {
      if (bz) {
        return true;
      } else {
        return false;
      }
    },
    getList() {
      this.queryList()
    },
    queryList() {
      this.listQuery.page = 1
      this.listLoading = true
      queryTqjf(this.listQuery).then(response => {
        if (response.data.result && response.data.result.tqjflist) {
          this.list = response.data.result.tqjflist
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

        const tHeader = ['订单日期', '订单编号', '色号', '序号', '网底款式', '网底尺寸', '发长', '领活时间', '领货人', '钩针时间', '钩针人', '质检时间', '质检人', '底胶时间', '底胶人', '整形时间', '整形人', '成品质检时间', '成品质检人', '发货时间', '发货人', '是否作废', '备注', '超期天数']
        const filterVal = ['ddrq', 'ddbh', 'sh', 'xh', 'wdks', 'wdcc', 'fc', 'lhsj', 'lhr', 'gzsj', 'gzr', 'zjsj', 'zjr', 'djsj', 'djr', 'zxsj', 'zxr', 'cpzjsj', 'cpzjr', 'fhsj', 'fhr', 'sfzf', 'bz', 'tqts']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `拖期明细_${parseTime(new Date(), '{y}-{m}-{d}')}`
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'lhr' || j === 'gzr' || j === 'djr' || j === 'zjr' || j === 'zxr' || j === 'cpzjr' || j === 'fhr') {
          return parseCode(v[j], 'user')
        }
        else if (j === 'lhsj' || j === 'gzsj' || j === 'zjsj' || j === 'djsj' || j === 'zxsj' || j === 'cpzjsj' || j === 'fhsj') {
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
        } else if (j === 'sfzf') {
          return parseCode(v[j], 'SF')
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
button.el-button.el-tooltip.el-button--default.el-button--mini {
  padding: 2px 8px;
}
/* 这下面的这些为啥不生效呢？？？？ */
label.el-form-item__label {
  font-weight: 500 !important;
}
label {
  font-weight: 500 !important;
}
.el-dialog__body {
  padding: 0px 0px !important;
}
.el-dialog__footer {
  text-align: center !important;
}
</style>

