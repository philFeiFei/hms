<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select size="mini" v-model="listQuery.wdks" :placeholder="$t('table.wdks')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDKS" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-select size="mini" v-model="listQuery.wdcc" :placeholder="$t('table.wdcc')" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.WDCC" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button size="mini" v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
    </div>
    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
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

      <el-table-column label="数量" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.sl }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

  </div>
</template>

<script>
import { kcQuery } from '@/api/tpgl'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack'

export default {
  name: 'tpkccx',
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
        wdcc: undefined,
        wdks: undefined,
        sl: undefined,
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
      kcQuery(this.listQuery).then(response => {
        if (response.data.result && response.data.result.kcList) {
          this.list = response.data.result.kcList
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

  }
}
</script>
