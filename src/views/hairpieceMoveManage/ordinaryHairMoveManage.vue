<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 200px;" class="filter-item" />
      <el-date-picker v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />
      <el-select v-model="listQuery.sh" :placeholder="$t('table.sh')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.fhr" :placeholder="$t('table.fhr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">显示操作人员</el-checkbox>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px">
      <el-table-column :label="$t('table.jfid')" prop="jfid" align="center" width="75" fixed v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.jfid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="xh" align="center" width="75" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.xh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddrq')" width="100px" align="center" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" width="120px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" width="130px" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('SH') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdks')" width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('WDKS') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdcc')" width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('WDCC') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.fc')" width="75px">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('FC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lhsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.lhr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.lhr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.gzsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gzsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.gzr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.gzr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zjsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.zjr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.zjr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.djsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.djr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.djr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zxsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zxsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.zxr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.zxr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.cpzjsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.cpzjr')" min-width="95px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhsj')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.fhr')" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.fhr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="80" class-name="small-padding fixed-width" fixed='right'>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.ddbh')" prop="ddbh">
          <el-input v-model="temp.ddbh" />
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
import { updateHairpiece, queryHairpiece } from '@/api/hairpieceMoveManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      showReviewer: false,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        fhr: undefined,
        ddqsrq: null,
        ddzzrq: null,
        ddbh: undefined,
        sh: undefined,
        sort: '+jfid',
        sftd: 0
      },
      textMap: {
        update: '修改假发信息',
        create: '新增假发信息'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        jfid: undefined,
        ddbh: '',
        sftd: 0,
        yxbz: 1,
      },
      rules: {
        ddbh: [{ required: true, message: '订单编号必须填写', trigger: 'change' }],
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
  created() {
    //this.getList()//此查询结果集可能过多，不易直接查询。
  },
  methods: {
    getList() {
      //check some limit
      if (this.listQuery.ddqsrq == null && this.listQuery.ddbh == null) {
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
      if (this.listQuery.ddqsrq) {
        var ddqsrq = this.listQuery.ddqsrq;
        var ddqsrqs = parseTime(ddqsrq, '{y}-{m}-{d}')
        this.listQuery.ddqsrq = ddqsrqs;
      }
      if (this.listQuery.ddzzrq) {
        var ddzzrq = this.listQuery.ddzzrq;
        var ddzzrqs = parseTime(ddzzrq, '{y}-{m}-{d}')
        this.listQuery.ddzzrq = ddzzrqs;
      }
      this.listLoading = true
      queryHairpiece(this.listQuery).then(response => {
        if (response.data.result && response.data.result.jfinfolist) {
          this.list = response.data.result.jfinfolist
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var jfid = this.temp.jfid
          var ddbh = this.temp.ddbh
          var obj = {
            jfid: jfid,
            ddbh: ddbh
          }
          updateHairpiece(obj).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },

  }
}
</script>
