<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" />
      <el-date-picker v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px" @sort-change="sortChange">
      <el-table-column :label="$t('table.pcid')" prop="pcid" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pcid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddrq')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.wdks')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('wdks') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.wdcc')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('wdcc') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.sh')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('sh') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.fc')" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('fc') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.sl')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.sl }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

  </div>
</template>

<script>
import { queryHairPici } from '@/api/hairpieceMultiManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        ddbh: undefined,
        sh: undefined,
        sort: '+pcid',
        sftd: 1
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      }

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
    }
    //把table中数据源改为’list‘，重新加上$emit('pagiation')事件，还原恢复
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryHairPici(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 0.0 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'pcid') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+pcid'
      } else {
        this.listQuery.sort = '-pcid'
      }
      this.handleFilter()
    }

  }
}
</script>
