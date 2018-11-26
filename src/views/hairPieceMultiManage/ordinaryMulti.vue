<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" height="600px" @sort-change="sortChange">
      <el-table-column :label="$t('table.pcid')" prop="pcid" sortable="custom" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.pcid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddrq')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdks')" min-width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('wdks') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdcc')" min-width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('wdcc') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" min-width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('sh') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fc')" min-width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('fc') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sl')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sl }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
          <el-button size="mini" type="primary" @click="generateQRCode(scope.row)">{{ $t('table.scewm') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.ddrq')" prop="ddrq">
          <el-date-picker v-model="temp.ddrq" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('table.ddbh')" prop="ddbh">
          <el-input v-model="temp.ddbh" />
        </el-form-item>

        <el-form-item :label="$t('table.wdks')" prop="wdks">
          <el-select v-model="temp.wdks" class="filter-item" placeholder="Please select">
            <el-option v-for="item in code.wdks" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.wdcc')" prop="wdcc">
          <el-select v-model="temp.wdcc" class="filter-item" placeholder="Please select">
            <el-option v-for="item in code.wdcc" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.sh')" prop="sh">
          <el-select v-model="temp.sh" class="filter-item" placeholder="Please select">
            <el-option v-for="item in code.sh" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.fc')" prop="fc">
          <el-select v-model="temp.fc" class="filter-item" placeholder="Please select">
            <el-option v-for="item in code.fc" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.sl')" prop="sl">
          <el-input-number v-model="temp.sl" label="描述文字"></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-loading="listLoading" title="二维码" :visible.sync="dialogQRFormVisible" width='700'>
      <canvas v-for="item in itemsOfQR" :key="item.id" :id="item.id"></canvas>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQRFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="printQRCode()">打印</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { queryHairPici, deleteHairPici, getDetail4QRCode, createHairPici } from '@/api/hairpieceMultiManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。
import QRCode from 'qrcode'

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
        sftd: 0
      },
      textMap: {
        update: '修改批量订单',
        create: '新增批量订单'
      },
      dialogFormVisible: false,
      dialogQRFormVisible: false,
      dialogStatus: '',
      temp: {
        pcid: undefined,
        ddrq: undefined,
        ddbh: null,
        wdks: null,
        wdcc: null,
        sh: null,
        fc: null,
        sl: 4,
        yxbz: 1,
        sftd: 0,
        tdurl: null
      },
      rules: {
        ddrq: [{ required: true, message: '订单日期必须填写', trigger: 'change' }],
        ddbh: [{ required: true, message: '订单编号必须填写', trigger: 'change' }],
        wdks: [{ required: true, message: '网底款式必须填写', trigger: 'change' }],
        wdcc: [{ required: true, message: '网底尺寸必须选择', trigger: 'change' }],
        sh: [{ required: true, message: '色号必须选择', trigger: 'change' }],
        fc: [{ required: true, message: '网底尺寸必须选择', trigger: 'change' }],
        sl: [{ required: true, message: '数量必须选择', trigger: 'change' }],
      },
      /* itemsOfQR: [
        {
          id: 'canvas1',
          text: '234234',
          desc: 'Hob99-23-33*-aa'
        },
        {
          id: 'canvas2',
          text: '22222222',
          desc: 'Hobaa-23-33*-dd'
        },
        {
          id: 'canvas3',
          text: '44444444444',
          desc: 'Hob2-23-33*-cc'
        },
        {
          id: 'canvas4',
          text: '7777ghgfhfg',
          desc: 'Hobrr-23-33*-bb'
        },
        {
          id: 'canvas5',
          text: '234234',
          desc: 'Hobggg-2-33*-aa'
        },
      ] */
      itemsOfQR: []

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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryHairPici(this.listQuery).then(response => {
        this.list = response.data.result.items
        this.total = response.data.result.total

        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
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
    },
    resetTemp() {
      this.temp = {
        pcid: undefined,
        ddrq: undefined,
        ddbh: null,
        wdks: null,
        wdcc: null,
        sh: null,
        fc: null,
        sl: 4,
        yxbz: 1,
        sftd: 0,
        tdurl: null
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
          createHairPici(this.temp).then((response) => {
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
    generateQRCode(row) {
      this.dialogQRFormVisible = true
      getDetail4QRCode(row.pcid).then((response) => {
        //---------生成二维码------------start
        /*   var canvas = document.getElementById('canvas')
          QRCode.toCanvas(canvas, '23423423', function (error) {
            if (error) console.error(error)
            console.log('success!');
          }) */
        this.listLoading = true
        this.itemsOfQR = response.data.result.itemsOfQR
        setTimeout(() => {
          this.listLoading = false

          //一秒之后dom加载完毕，进度关闭，展示二维码.不等一会，canvas qritem.id取不到
          console.log("itemsOfQR", this.itemsOfQR);
          this.itemsOfQR.forEach(qritem => {
            var canvas = document.getElementById(qritem.id);
            console.log("canvas", canvas)
            QRCode.toCanvas(canvas, qritem.text, function (error) {
              if (error) console.error(error)
              var ctx = canvas.getContext("2d");
              ctx.font = "12px Georgia";
              ctx.fillText(`k-h3-${qritem.text}`, 30, 112);
              ctx.font = "30px Verdana";
              console.log(`${qritem}生成成功`);
            })
          });

          this.$notify({
            title: '成功',
            message: '二维码生成成功',
            type: 'success',
            duration: 2000
          })
        }, 1 * 1000)
        //---------生成二维码------------end

      })
    },
    printQRCode() {

      window.print();

    },
    handleDelete(row) {

      this.$confirm('确定要删除该批次的订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        deleteHairPici(row.pcid).then(() => {
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
  padding: 7px 7px;
  width: 75px;
}
canvas {
  border: 1px solid rebeccapurple;
  height: 150px !important;
  width: 150px !important;
  margin-right: 13px;
}
</style>

