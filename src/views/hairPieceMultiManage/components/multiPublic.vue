<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddqsrq" type="date" placeholder="订单起始日期" class="filter-item" />
      <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="listQuery.ddzzrq" type="date" placeholder="订单终止日期" class="filter-item" />
      <el-input size="mini" :placeholder="$t('table.ddbh')" v-model="listQuery.ddbh" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">{{ $t('table.query') }}</el-button>
      <el-button class="filter-item" size="mini" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <span style="color:red;font-size:13px;">注意：数量超过300时，建议分两次增加，便于二维码排版</span>
    </div>

    <el-table size="mini" v-loading="listLoading" :key="tableKey" :data="currentPageList" border fit highlight-current-row style="width: 100%;" :height="tableHeight">
      <el-table-column :label="$t('table.pcid')" prop="pcid" align="center" width="175px">
        <template slot-scope="scope">
          <span>{{ scope.row.pcid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddrq')" width="100px" align="center" prop="ddrq">
        <template slot-scope="scope">
          <span>{{ scope.row.ddrq | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ddbh')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ddbh }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sh')" width="90px" align="center" prop="sh">
        <template slot-scope="scope">
          <span>{{ scope.row.sh | parseCode('SH') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdks')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wdks | parseCode('WDKS') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.wdcc')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wdcc | parseCode('WDCC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.fc')" width="65px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fc | parseCode('FC') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sl')" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除数量" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scsl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bz }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="320" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button size="mini" type="primary" @click="generateQRCode(scope.row)">批次二维码
          </el-button>
          <el-button size="mini" type="primary" @click="generateQRCodeByDdbh(scope.row.ddbh)">订单二维码
          </el-button>
          <el-button v-if="istd" size="mini" type="primary" @click="orderPicDetail(scope.row)">附加信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='600'>
      <el-form ref="dataForm" :rules="rules" label-position="right" :model="temp" class="demo-form-inline" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.ddrq')" prop="ddrq" label-width='110px'>
          <el-date-picker v-model="temp.ddrq" type="date" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item :label="$t('table.ddbh')" prop="ddbh" label-width='110px'>
          <el-input v-model="temp.ddbh" />
        </el-form-item>

        <el-form-item :label="$t('table.sh')" prop="sh" label-width='110px'>
          <el-select v-model="temp.sh" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.SH" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.wdks')" prop="wdks" label-width='110px'>
          <el-select v-model="temp.wdks" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.WDKS" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.wdcc')" prop="wdcc" label-width='110px'>
          <el-select v-model="temp.wdcc" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.WDCC" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.fc')" prop="fc" label-width='110px'>
          <el-select v-model="temp.fc" class="filter-item" placeholder="请选择">
            <el-option v-for="item in code.FC" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.sl')" prop="sl" label-width='110px'>
          <el-input-number v-model="temp.sl" label="数量"></el-input-number>
        </el-form-item>
        <el-form-item label="发货起始编号" prop="fhqsbh" label-width='110px'>
          <el-input v-model="temp.fhqsbh" />
        </el-form-item>
        <el-form-item label="备注" prop="bz" label-width='110px'>
          <el-input type="textarea" :rows="2" width="400px" v-model="temp.bz" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-loading="listLoading" title="二维码" :visible.sync="dialogQRFormVisible" width='500'>
      <div class="btnheader">
        <el-button :loading="downloadLoading" icon="el-icon-download" type="primary" @click="printQRCode()">导出二维码 </el-button>
      </div>
      <div id="printcontent">
        <div v-for="item in itemsOfQR" :key="item.jfid" class="itemdiv">
          <span class="descks">{{`${item.wdks}`}}</span>
          <canvas :id="item.jfid"></canvas>
          <span class="desc">{{`${item.ddbh}${item.sh}-${item.xh}`}}</span><br />
          <span class="desc">{{`${item.wdcc}_${item.fc}`}}</span>
          <div style="clear:both" />
        </div>
      </div>
    </el-dialog>
    <el-dialog @close='closeDialog' v-loading="listLoading" title="订单附加信息" :visible.sync="dialogPicFormVisible">

      <el-upload class="upload-demo" :data="picModel" :file-list="fileList" :on-success="onSuccess" :action="uploadURL" multiple>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">注意:只能上传jpg/png文件,上传的图片将会覆盖当前的</div>
      </el-upload>
      <div id="piccontent">
        <img width="100%" :src="picModel.imgUrl" alt="">
      </div>
      <div style="clear:both;height:100%"></div>
    </el-dialog>

  </div>
</template>

<script>
import { queryHairPici, deleteHairPici, getDetail4QRCode, getDetail4QRCodeByDdbh, createHairPici } from '@/api/hairpieceMultiManage'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import Pagination from '@/components/paginationNoRequestBack' //这里使用的分页组件，不走后台请求。
import QRCode from 'qrcode'
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'multiPublic',
  components: { Pagination },
  directives: { waves },
  props: {
    sftdp: {
      type: Number,
      required: true
    },
    istdp: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    var begin = new Date();
    var ddqsrq1 = new Date(begin.setMonth((new Date().getMonth() - 1)));
    this.listQuery.ddqsrq = parseTime(ddqsrq1, '{y}-{m}-{d}');
  },
  data() {
    return {
      picModel: {
        imgUrl: '',
        pcid: null,
      },
      uploadURL: process.env.BASE_API + '/hairpieceMultiManage/UploadInVue',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      downloadLoading: false,
      tableHeight: window.innerHeight - 200,
      listQuery: {
        page: 1,
        limit: 100,
        ddbh: null,
        ddqsrq: null,
        ddzzrq: null,
        sh: undefined,
        sort: '+pcid',
        sftd: this.sftdp
      },
      istd: this.istdp,
      textMap: {
        update: '修改批量订单',
        create: '新增批量订单'
      },
      dialogFormVisible: false,
      dialogQRFormVisible: false,
      dialogPicFormVisible: false,

      fileList: [],
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
        fhqsbh: undefined,
        yxbz: 1,
        sftd: this.sftdp,
        tdurl: null,
        bz: null
      },
      rules: {
        ddrq: [{ required: true, message: '订单日期必须填写', trigger: 'change' }],
        ddbh: [{ required: true, message: '订单编号必须填写', trigger: 'change' }],
        fhqsbh: [{ required: true, message: '发货起始编号必须填写', trigger: 'change' }],
        /* wdks: [{ required: true, message: '网底款式必须填写', trigger: 'change' }],
        wdcc: [{ required: true, message: '网底尺寸必须选择', trigger: 'change' }],
        sh: [{ required: true, message: '色号必须选择', trigger: 'change' }],
        fc: [{ required: true, message: '网底尺寸必须选择', trigger: 'change' }], */
        sl: [{ required: true, message: '数量必须选择', trigger: 'change' }],
      },
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

      //排序还是筛选都应该在这里计算。。



      return this.list.filter((item, index) => index < limitC * pageC && index >= limitC * (pageC - 1))
    },
    ...mapGetters([
      'code',
    ]),
  },
  created() {
    //this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryHairPici(this.listQuery).then(response => {
        if (response.data.result && response.data.result.jfpclist) {
          this.list = response.data.result.jfpclist
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
        fhqsbh: undefined,
        yxbz: 1,
        sftd: this.sftdp,
        tdurl: null,
        bz: null
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
        var ddrq = this.temp.ddrq;
        var ddrqs = parseTime(ddrq, '{y}-{m}-{d}')
        this.temp.ddrq = ddrqs;
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
    orderPicDetail(row) {
      this.fileList = []
      this.dialogPicFormVisible = true
      this.picModel.imgUrl = row.tdurl
      this.picModel.pcid = row.pcid
      this.uploadURL = this.uploadURL + "?pcid=" + row.pcid
    },
    closeDialog() {
      this.uploadURL = process.env.BASE_API + '/hairpieceMultiManage/UploadInVue' //初始化uploadURL
    },
    onSuccess(response, file, fileList) {
      var _success = response._success
      if (_success === false) {
        var _message = response._message
        this.$message({
          message: _message,
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      this.picModel.imgUrl = response.result.tdurl

      this.handleFilter()
    },
    generateQRCode(row) {
      this.dialogQRFormVisible = true
      this.listLoading = true
      getDetail4QRCode(row).then((response) => {
        //---------生成二维码------------start
        this.itemsOfQR = response.data.result.jfpcdetail
        setTimeout(() => {
          this.listLoading = false

          //一秒之后dom加载完毕，进度关闭，展示二维码.不等一会，canvas qritem.id取不到
          this.itemsOfQR.forEach(qritem => {
            var canvas = document.getElementById(qritem.jfid);
            QRCode.toCanvas(canvas, qritem.jfid, function (error) {
              if (error) console.error(error)
              /*    var ctx = canvas.getContext("2d");
               ctx.fillText(`${qritem.ddbh}${qritem.sh}-${qritem.xh}`, 20, 112);
                ctx.font = "18px Verdana"; */
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
    //根据订单编号获取二维码所需信息
    generateQRCodeByDdbh(ddbhR) {
      this.$message({
        message: '该操作将产生该批次对应的订单的所有二维码！！！',
        type: 'warning'
      });
      this.dialogQRFormVisible = true
      this.listLoading = true
      var params = {
        ddbh: ddbhR
      }
      getDetail4QRCodeByDdbh(params).then((response) => {
        //---------生成二维码------------start
        this.itemsOfQR = response.data.result.jfinfolist
        setTimeout(() => {
          this.listLoading = false

          //一秒之后dom加载完毕，进度关闭，展示二维码.不等一会，canvas qritem.id取不到
          this.itemsOfQR.forEach(qritem => {
            var canvas = document.getElementById(qritem.jfid);
            QRCode.toCanvas(canvas, qritem.jfid, function (error) {
              if (error) console.error(error)
              /*    var ctx = canvas.getContext("2d");
               ctx.fillText(`${qritem.ddbh}${qritem.sh}-${qritem.xh}`, 20, 112);
                ctx.font = "18px Verdana"; */
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
      this.downloadLoading = true
      let _this = this
      html2canvas(document.querySelector("#printcontent")).then(canvas => {
        //document.body.appendChild(canvas)
        //竖向打印，打印六行，每一个二维码高143*6 +六个间隙高度20*6=978
        //看看总高度有几个978，每次从第n竖向位置加载canvas到第n个pdf页面
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        //let pageHeight = contentWidth / 592.28 * 841.89 - 26.89
        let pageHeight = contentWidth / 592.28 * 841.89
        //console.log("pageHeight", pageHeight);
        let leftHeight = contentHeight
        let position = 0
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        //console.log("imgHeight", imgHeight)

        let pageData = canvas.toDataURL('image/jpeg', 1.0)

        let PDF = new jspdf('', 'pt', 'a4')

        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= (841.89)
            //position -= pageHeight
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        this.downloadLoading = false
        PDF.save(`二维码_${parseTime(new Date(), '{y}-{m}-{d}')}.pdf`)
      });
    },
    handleDelete(row) {

      this.$confirm('确定要删除该批次的订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //---------operate start---------
        deleteHairPici(row).then(() => {
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
canvas {
  height: 110.315px !important; /*这个高度跳转二维码高度，随意设置大小*/
  width: 110.315px !important; /*这个高度跳转二维码宽度，随意设置大小*/
  border: 0px solid red;
}
.itemdiv {
  display: inline-block;
  border-bottom: 0px solid #dcdcdc;
  height: 169.4px !important; /*这个高度决定了一页有几行，并且正好分页完美，不会切割二维码*/
  width: 108.315px !important;
  margin-right: 9px;
  margin-top: 0px;
  border: 0px solid blue;
}
.desc {
  position: relative;
  top: -21px;
  left: 7px;
  font-size: 9px;
  color: black;
  font-weight: 400;
}
.descks {
  position: relative;
  top: 15px;
  left: 16px;
  font-size: 9px;
  color: black;
  font-weight: 400;
}
.btnheader {
  /* text-align: right; */
  margin-bottom: 10px;
  padding-right: 10%;
}
div#printcontent {
  width: 595.28px;
  /* margin-left: 20%; */
}
#piccontent {
  width: 75%;
  float: left;
}
.el-upload__tip {
  color: red;
}
</style>

