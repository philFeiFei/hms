<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.userName')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input :placeholder="$t('table.xm')" v-model="listQuery.xm" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px" @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.password')" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.roleId')" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.sfzhm')" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.sfzhm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.xm')" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.xm }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.csrq')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.csrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.xb')" width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.xb }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.jtzz')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.jtzz }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

  </div>
</template>

<script>
import { queryUser } from '@/api/userManage'
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
        userName: undefined,
        xm: '',
        sfzhm: undefined,
        sort: '+userId'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+userId' }, { label: 'ID Descending', key: '-userId' }],
      temp: {
        userId: undefined,
        userName: '',
        password: '',
        roleId: undefined,
        xm: '',
        sjh: '',
        xb: '',
        csrq: '',
        sfzhm: undefined,
        jtzz: '',
        yxbz: '1',
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
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryUser(this.listQuery).then(response => {
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
      if (prop === 'userId') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+userId'
      } else {
        this.listQuery.sort = '-userId'
      }
      this.handleFilter()
    }

  }
}
</script>
