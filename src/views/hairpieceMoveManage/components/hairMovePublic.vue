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
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.fhsj" type="date" placeholder="发货日期" class="filter-item" />

      <el-select size="mini" v-model="listQuery.lhr" :placeholder="$t('table.lhr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.gzr" :placeholder="$t('table.gzr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.zjr" :placeholder="$t('table.zjr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.djr" :placeholder="$t('table.djr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.djzcr" placeholder="底胶转出人" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.zxr" :placeholder="$t('table.zxr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.cpzjr" placeholder="质检人" clearable style="width: 85px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.fhr" :placeholder="$t('table.fhr')" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-select size="mini" v-model="listQuery.sfzf" placeholder="是否作废" clearable style="width: 80px" class="filter-item">
        <el-option v-for="item in code.SF" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button v-waves class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="enterMultiModify">批量修改</el-button>

    </div>

    <el-table size="mini" v-loading="listLoading" @selection-change="handleSelectionChange" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column type="selection" width="55"></el-table-column>
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

      <el-table-column label="底胶转出时间" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djzcsj | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="底胶转出人" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.djzcr | parseCode('user') }}</span>
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
      <el-table-column :label="$t('table.actions')" align="center" min-width="110" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="100px">

        <el-col :span='12'>
          <el-form-item :label="$t('table.ddbh')" prop="ddbh">
            <el-input v-model="temp.ddbh" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="是否作废" prop="fhr">
            <el-select v-model="temp.sfzf" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.SF" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.lhsj')" prop="lhsj">
            <el-date-picker v-model="temp.lhsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.lhr')" prop="lhr">
            <el-select v-model="temp.lhr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>

          <el-form-item :label="$t('table.gzsj')" prop="gzsj">
            <el-date-picker v-model="temp.gzsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.gzr')" prop="gzr">
            <el-select v-model="temp.gzr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>

          <el-form-item :label="$t('table.zjsj')" prop="zjsj">
            <el-date-picker v-model="temp.zjsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.zjr')" prop="zjr">
            <el-select v-model="temp.zjr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span='12'>
          <el-form-item :label="$t('table.djsj')" prop="djsj">
            <el-date-picker v-model="temp.djsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.djr')" prop="djr">
            <el-select v-model="temp.djr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span='12'>
          <el-form-item label="底胶转出日期" prop="djzcsj">
            <el-date-picker v-model="temp.djzcsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item label="底胶转出人" prop="djzcr">
            <el-select v-model="temp.djzcr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span='12'>
          <el-form-item :label="$t('table.zxsj')" prop="zxsj">
            <el-date-picker v-model="temp.zxsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.zxr')" prop="zxr">
            <el-select v-model="temp.zxr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>

          <el-form-item :label="$t('table.cpzjsj')" prop="cpzjsj">
            <el-date-picker v-model="temp.cpzjsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.cpzjr')" prop="cpzjr">
            <el-select v-model="temp.cpzjr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='12'>

          <el-form-item :label="$t('table.fhsj')" prop="fhsj">
            <el-date-picker v-model="temp.fhsj" type="date" placeholder="请选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span='12'>
          <el-form-item :label="$t('table.fhr')" prop="fhr">
            <el-select v-model="temp.fhr" class="filter-item" placeholder="请选择">
              <el-option v-for="item in code.user" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='22'>
          <el-form-item label="备注" prop="bz">
            <el-input type="textarea" :rows="2" width="400px" v-model="temp.bz" />
          </el-form-item>
        </el-col>
        <div style="clear:both"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量修改订单" :visible.sync="dialogMultiFormVisible">
      <el-form ref="dataMultiForm" :rules="multiRules" label-position="right" :model="multiTemp" class="demo-form-inline" label-width="100px" style="width: 500px; margin-left:50px;">
        <div class="desc"><span>当前要修改的订单编号是【{{multiTemp.ddbh}}】，并且选中了【{{multiTemp.length}}】条数据。</span></div>
        <el-form-item label="新订单编号" prop="newDdbh">
          <el-input width="150px" size="mini" placeholder="订单编号" v-model="multiTemp.newDdbh" />
        </el-form-item>
        <el-form-item label="备注" prop="bz">
          <el-input type="textarea" :rows="2" width="400px" v-model="multiTemp.bz" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMultiFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="saveMultiModify()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateHairpiece, queryHairpiece, updateMultiHairpiece, deleteJf } from '@/api/hairpieceMoveManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。

export default {
  name: 'hairMovePublic',
  components: { Pagination },
  directives: { waves },
  props: {
    sftdp: {
      type: Number,
      required: true
    },
  },
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
      listQuery: {
        page: 1,
        limit: 100,
        lhr: undefined,
        gzr: undefined,
        zjr: undefined,
        djr: undefined,
        djzcr: undefined,
        zxr: undefined,
        cpzjr: undefined,
        fhr: undefined,
        ddqsrq: null,
        ddzzrq: null,
        lhsj: null,
        fhsj: null,
        ddbh: undefined,
        sh: undefined,
        sh: undefined,
        wdcc: undefined,
        wdks: undefined,
        fc: undefined,
        sort: '+jfid',
        sftd: this.sftdp,
        sfzf: undefined,
      },
      textMap: {
        update: '修改假发信息',
        create: '新增假发信息'
      },
      dialogFormVisible: false,
      dialogMultiFormVisible: false,
      multipleSelection: [],
      dialogStatus: '',
      temp: {
        jfid: undefined,
        ddbh: '',
        sftd: this.sftdp,
        yxbz: 1,
      },
      multiTemp: {
        jfList: [],
        newDdbh: '',
        bz: '',
      },
      rules: {
        ddbh: [{ required: true, message: '订单编号必须填写', trigger: 'change' }],
      },
      multiRules: {
        newDdbh: [{ required: true, message: '新的订单编号必须填写', trigger: 'blur' }],
        bz: [{ required: true, message: '备注必须填写', trigger: 'blur' }],
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
    showBz(bz) {
      if (bz) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
          updateHairpiece(this.temp).then(() => {
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
    enterMultiModify() {
      let val = this.multipleSelection;
      console.log("val", val);
      this.dialogMultiFormVisible = false;
      var hasManyPc = false;
      var hasManyDdbh = false;
      if (!val || val.length == 0) {
        this.$message({
          type: 'info',
          message: '请批量选择要修改的假发！'
        });
        return false;
      }
      var selectDdbh = val[0].ddbh;
      var selectdPcid = val[0].pcid;
      var length = val.length;
      this.multiTemp = {
        jfList: [],
        length: 0,
        newDdbh: '',
        bz: '',
      }
      this.multiTemp.jfList = val;
      this.multiTemp.length = val.length;
      this.multiTemp.ddbh = val[0].ddbh;
      for (var i = 0; i < length; i++) {
        var ddbh = val[i].ddbh;
        if (selectDdbh != ddbh) {
          this.$message({
            type: 'warning',
            message: '选择了多个订单编号，请检查！'
          });
          hasManyDdbh = true;
          break;
        }
        if (selectdPcid != val[i].pcid) {
          hasManyPc = true;
          break;
        }
      }
      if (hasManyDdbh) {
        return false;
      }
      if (hasManyPc && !hasManyDdbh) {
        this.$confirm('选择的订单不属于同一批次, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify.info({
            title: '消息',
            message: '您选择了继续！'
          });

          this.dialogMultiFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataMultiForm'].clearValidate()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (!hasManyPc && !hasManyDdbh) {
        this.dialogMultiFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataMultiForm'].clearValidate()
        })
      } else {
        return false;
      }

    },
    saveMultiModify() {
      this.$refs['dataMultiForm'].validate((valid) => {
        if (valid) {
          updateMultiHairpiece(this.multiTemp).then(() => {
            this.dialogMultiFormVisible = false
            this.$notify({
              title: '成功',
              message: '批量修改成功',
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
<style scoped>
.fixed-width .el-button--mini {
  width: 40px !important;
}
button.el-button.el-tooltip.el-button--default.el-button--mini {
  padding: 2px 8px;
}
.desc {
  color: red;
  margin-bottom: 20px;
  margin-left: 10px;
  font-size: 15px;
}
</style>

