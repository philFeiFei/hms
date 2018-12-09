<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input size="mini" :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 150px;" class="filter-item" />
      <el-date-picker size="mini" v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker size="mini" v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />
      <el-select size="mini" v-model="listQuery.sh" :placeholder="$t('table.sh')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>

      <br />
      <el-select size="mini" v-model="listQuery.lhr" :placeholder="$t('table.lhr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.gzr" :placeholder="$t('table.gzr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.zjr" :placeholder="$t('table.zjr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.djr" :placeholder="$t('table.djr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.zxr" :placeholder="$t('table.zxr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.cpzjr" :placeholder="$t('table.cpzjr')" clearable style="width: 110px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.fhr" :placeholder="$t('table.fhr')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-checkbox size="mini" v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">显示操作人员</el-checkbox>

    </div>

    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px">
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
      <el-table-column v-if="showReviewer" :label="$t('table.lhr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.lhr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.gzsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gzsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.gzr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.gzr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zjsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.zjr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zjr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.djsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.djr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.djr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.zxsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.zxsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.zxr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.zxr | parseCode('user') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.cpzjsj')" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.cpzjr')" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.cpzjr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fhsj')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fhsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.fhr')" width="70px">
        <template slot-scope="scope">
          <span>{{ scope.row.fhr | parseCode('user') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="155" class-name="small-padding fixed-width" fixed='right'>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
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
import { updateHairpiece, queryHairpiece, deleteJf } from '@/api/hairpieceMoveManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'ordinaryHairMoveManage',
  components: { Pagination },
  directives: { waves },
  mounted() {
    var begin = new Date();
    var ddqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.ddqsrq = ddqsrq1;
  },
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
        lhr: undefined,
        gzr: undefined,
        zjr: undefined,
        djr: undefined,
        zxr: undefined,
        cpzjr: undefined,
        fhr: undefined,
        ddqsrq: null,
        ddzzrq: null,
        ddbh: undefined,
        sh: undefined,
        sort: '+jfid',
        sftd: 1
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
        sftd: 1,
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
      this.listQuery.page = 1
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
    handleDelete(row) {
      this.$confirm('确定要删除该条假发吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        var obj = {
        }
        obj.jfid = row.jfid
        deleteJf(obj).then(() => {
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

  }
}
</script>
