<template>
  <el-card class="main">
    <el-row type="flex" justify="space-around">
      <el-col>定点机构编号:</el-col>
      <el-col>定点机构名称:</el-col>
      <el-col>药师编码:</el-col>
      <el-col>药师名称:</el-col>
      <el-col>单据状态:</el-col>
      <el-col>单号:</el-col>
      <el-col>vip信息:</el-col>
    </el-row>

    <el-divider></el-divider>

    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="loading"
      :data="data"
      height="55vh"
      border
    >
      <el-table-column prop="createTime" label="序号"></el-table-column>
      <el-table-column prop="orderId" label="货号"></el-table-column>
      <el-table-column prop="totalPayment" label="品名"> </el-table-column>
      <el-table-column prop="goodsNO" label="折前价"> </el-table-column>
      <el-table-column prop="goodsName" label="折扣"> </el-table-column>
      <el-table-column prop="costPrice" label="折后价"> </el-table-column>
      <el-table-column prop="unitPrice" label="数量"> </el-table-column>
      <el-table-column prop="actualSales" label="金额"> </el-table-column>
      <el-table-column prop="totalAmount" label="不打折商品"> </el-table-column>
      <el-table-column prop="shipping" label="单位"> </el-table-column>
      <el-table-column prop="shipping" label="生产单位"> </el-table-column>
      <el-table-column prop="shipping" label="规格"> </el-table-column>
      <el-table-column prop="userName" label="医保品种"> </el-table-column>
      <el-table-column prop="receiver" label="业务员编号"> </el-table-column>
      <el-table-column prop="receiverMobile" label="业务员"></el-table-column>
      <el-table-column prop="drugName" label="批号"> </el-table-column>
      <el-table-column prop="phone" label="批次号"> </el-table-column>
      <el-table-column prop="fdvdvf" label="批次数量"> </el-table-column>
      <el-table-column prop="actualSales" label="库存"> </el-table-column>
    </el-table>

    <el-row type="flex" justify="space-around">
      <!-- 左 -->
      <div class="leftbox">
        <p>不打折原价金额:14.00 数量合计:1.000 可参与买赠商品汇总金额:14.00</p>

        <p style="font-size: 26px; color: #94bae5">
          姓名: 老凤祥 男 职工基本医疗保险 余额:0
        </p>
        <p style="font-size: 30px">小计:0.00</p>
        <p>请输入vip卡号、电话号、身份证号或vip姓名</p>
        <p>上笔交易实收现金: 0.00 找零:0.00</p>
        <el-divider></el-divider>
        <p>207236、颈康胶囊、0.3*12S*2板/盒</p>
        <p>吉林真元制药有限公司</p>
        <p>零售价:8 会员价:0 可售库存:31</p>
        <p>货位:</p>
      </div>

      <!-- 中 -->
      <div class="middlebox">
        <el-button type="primary" @click="readCard = true">读卡</el-button>
        <el-button type="primary" @click="returndialog = true"
          >退单查询</el-button
        >
      </div>

      <!-- 右 -->
      <el-form :model="form" label-width="80px" style="width: 500px">
        <el-form-item label="旅居史 :">
          <el-input
            type="text"
            size="small"
            style="width: 130px"
            v-model="form.actualStock"
          ></el-input>
          发热 :
          <el-input
            type="text"
            size="small"
            style="width: 130px"
            v-model="form.actualStock"
          ></el-input>
        </el-form-item>

        <el-form-item label="会员 :">
          <el-input
            type="text"
            size="small"
            v-model="form.vipname"
            @keyup.enter.native="vipdown"
            style="width: 138px"
          ></el-input>
          <el-input
            type="text"
            size="small"
            v-model="form.giftActualStock"
            style="width: 160px; margin-left: 2px"
          ></el-input>
        </el-form-item>

        <el-form-item label="营业员 :">
          <el-input
            ref="yingye"
            type="text"
            size="small"
            @keyup.enter.native="workerdown"
            v-model="form.workername"
            style="width: 138px"
          ></el-input>
          <el-input
            type="text"
            size="small"
            v-model="form.giftActualStock"
            style="width: 160px; margin-left: 2px"
          ></el-input>
        </el-form-item>

        <el-form-item label="商品 :">
          <el-input
            type="text"
            size="small"
            v-model="form.goodname"
            @keyup.enter.native="goodsdown"
            style="width: 300px"
          ></el-input>
        </el-form-item>

        <el-form-item label="数量 :">
          <input
            type="text"
            placeholder="1.00"
            style="width: 300px; text-align: right; font-size: 20px"
          />
        </el-form-item>

        <el-form-item label="单价 :">
          <el-input
            type="text"
            size="small"
            v-model="form.giftActualStock"
            style="width: 100px"
            :disabled="true"
          ></el-input>
          <el-input
            type="text"
            size="small"
            v-model="form.giftActualStock"
            style="width: 98px; margin-left: 2px"
          ></el-input>
          <el-input
            type="text"
            size="small"
            v-model="form.giftActualStock"
            style="width: 98px; margin-left: 2px"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注 :">
          <input
            type="text"
            placeholder="1.00"
            style="width: 300px; text-align: right; font-size: 20px"
          />
        </el-form-item>
      </el-form>
    </el-row>

    <!-- 选择批号 -->
    <el-dialog
      :visible.sync="choosedialog"
      :show-close="false"
      modal
      width="900px"
    >
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
        :data="data"
        height="500px"
        border
      >
        <el-table-column prop="createTime" label="序号"></el-table-column>
        <el-table-column prop="orderId" label="货号"></el-table-column>
        <el-table-column prop="totalPayment" label="品名"> </el-table-column>
        <el-table-column prop="goodsNO" label="折前价"> </el-table-column>
        <el-table-column prop="goodsName" label="折扣"> </el-table-column>
        <el-table-column prop="costPrice" label="折后价"> </el-table-column>
        <el-table-column prop="unitPrice" label="数量"> </el-table-column>
        <el-table-column prop="actualSales" label="金额"> </el-table-column>
        <el-table-column prop="totalAmount" label="不打折商品">
        </el-table-column>
        <el-table-column prop="shipping" label="单位"> </el-table-column>
        <el-table-column prop="shipping" label="生产单位"> </el-table-column>
        <el-table-column prop="shipping" label="规格"> </el-table-column>
        <el-table-column prop="userName" label="医保品种"> </el-table-column>
        <el-table-column prop="receiver" label="业务员编号"> </el-table-column>
        <el-table-column prop="receiverMobile" label="业务员"></el-table-column>
        <el-table-column prop="drugName" label="批号"> </el-table-column>
        <el-table-column prop="phone" label="批次号"> </el-table-column>
        <el-table-column prop="fdvdvf" label="批次数量"> </el-table-column>
        <el-table-column prop="actualSales" label="库存"> </el-table-column>
      </el-table>
      <el-row style="margin-top: 15px" type="flex" justify="space-around">
        <el-button size="small" @click="choosedialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="choosebatch"
          >确定</el-button
        >
      </el-row>
    </el-dialog>

    <!-- pos收款 -->
    <el-dialog
      :visible.sync="recpaydialog"
      :show-close="false"
      modal
      width="700px"
    >
      <el-row type="flex" justify="space-around">
        <el-form :model="receiveform" label-width="80px" style="width: 400px">
          <el-form-item label="现金 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="医保 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="现金 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="银联 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="移动G分 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="储值卡 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠券 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
          <el-form-item label="积分抵现 :">
            <el-input
              type="text"
              size="small"
              style="width: 250px"
              v-model="form.actualStock"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" style="width: 300px">
          <el-form-item label="折前金额 :">
            <input
              type="text"
              placeholder="0.00"
              disabled
              style="width: 250px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="应收金额 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 250px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="优惠金额 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 250px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="收现金 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 250px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="找零 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 250px; text-align: right; font-size: 37px"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="margin-top: 15px" type="flex" justify="space-around">
        <el-button size="small" @click="recpaydialog = false">取消</el-button>

        <el-button type="primary" size="small" @click="choosebatch"
          >确定</el-button
        >
      </el-row>
    </el-dialog>

    <!-- pos退货 -->
    <el-dialog
      :visible.sync="returndialog"
      :show-close="false"
      modal
      width="400px"
    >
      <el-form :model="returnform" label-width="100px">
        <el-form-item label="原单流水号 :">
          <el-input
            type="text"
            size="small"
            style="width: 250px"
            v-model="form.actualStock"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row style="margin-top: 15px" type="flex" justify="space-around">
        <el-button type="primary" size="small" @click="confirmSerialId"
          >确定</el-button
        >
        <el-button size="small" @click="returndialog = false">取消</el-button>
      </el-row>
    </el-dialog>

    <!-- 读卡 -->
    <el-dialog :visible.sync="readCard" :show-close="false" modal width="800px">
      <el-tabs type="card">
        <el-tab-pane label="读卡">
          <el-form :model="readcardform" inline label-width="80px">
            <el-form-item label="医疗类别">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>

            <el-form-item label=" ">
              <el-radio-group v-model="readcardform.radio" size="mini">
                <el-radio-button :label="1">医保卡</el-radio-button>
                <el-radio-button :label="2">身份证</el-radio-button>
                <el-radio-button :label="3">电子医保凭证</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="药师">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="text"
                size="mini"
                style="width: 200px"
                v-model="form.actualStock"
              ></el-input>
            </el-form-item>

            <el-form-item label="科室">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>

            <el-form-item label="诊断类别">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>

            <el-form-item label="险种类型">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>

            <el-form-item label="病种">
              <el-select v-model="readcardform.region" size="mini"></el-select>
            </el-form-item>
          </el-form>
          <div class="readutils">
            <el-button type="primary" size="small">读卡</el-button>
            <el-button type="success" size="small">确定</el-button>
            <el-button type="danger" size="small">取消</el-button>
          </div>
          <el-row style="padding-left: 10px">
            医保支付标志
            <el-checkbox v-model="readcardform.checked"></el-checkbox>
          </el-row>
          <el-row style="color: #f84033; font-size: 18px">
            <el-col
              >【药店编码:p23040300096】【药店名称:XXXXXXXXXXXXXXXXXXXXXXX】</el-col
            >
            <el-col>【药师编码:Y231282001040】【药师名称:XXX】</el-col>
          </el-row>

          <el-tabs type="border-card" style="margin-top: 5px">
            <el-tab-pane label="基本信息">
              <el-row style="color: #007acc; font-size: 18px">
                <el-col>人员证件类型:身份证</el-col>
                <el-col>证件号码:634684684684548588</el-col>
                <el-col>人员姓名:</el-col>
                <el-col>性别:男</el-col>
                <el-col>民族:汉</el-col>
                <el-col>职工基本医疗保险:0</el-col>
                <el-col>大额医疗费用补助:0</el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="参保信息">参保信息</el-tab-pane>
            <el-tab-pane label="身份信息">身份信息</el-tab-pane>
          </el-tabs>

          <el-row
            style="
              color: #f84033;
              font-size: 30px;
              border-bottom: 1px solid #ccc;
            "
          >
            哈尔滨人民同泰医药连锁店
          </el-row>
          <el-row style="color: #007acc; font-size: 18px">
            授权期限:2021-10-10
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="其他查询">其他查询</el-tab-pane>
      </el-tabs></el-dialog
    >

    <!-- 预结算 -->
    <el-dialog
      :visible.sync="pre_settlement"
      :show-close="false"
      modal
      width="750px"
    >
      <el-row style="padding: 20px; border: 1px solid #ccc">
        <el-row :gutter="20" style="font-size: 18px">
          <el-col :span="12">
            销售金额 : <span style="color: red">14.00</span>
          </el-col>
          <el-col :span="12"
            >中心结算金额 : <span style="color: red">0.00</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px">
          <el-col :span="12"
            >符合金额 : <span style="color: red">14</span>
          </el-col>
          <el-col :span="12"
            >现金 : <span style="color: red">14.00</span></el-col
          >
        </el-row>
      </el-row>

      <el-row style="margin: 20px 0; padding: 20px; border: 1px solid #ccc">
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">医疗费总额 : 14 </el-col>
          <el-col :span="12">基金支付总额 : 0 </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">个人账户支出 : 0 </el-col>
          <el-col :span="12">个人现金支出 : 0 </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">余额 : 0 </el-col>
          <el-col :span="12">基本医疗保险统筹基金支出 : 0</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">公务员医疗补助资金支出 : 14 </el-col>
          <el-col :span="12">企业补充医疗保险基金支出 : 0</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">居民大病保险资金支出 : 14 </el-col>
          <el-col :span="12">职工大额医疗费用补助基金支出 : 0</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">医疗救助基金支出 : 14 </el-col>
          <el-col :span="12">其他支出 : 0</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">个人负担总金额 : 14 </el-col>
          <el-col :span="12">个人账户共济支付金额 : 0</el-col>
        </el-row>
      </el-row>

      <el-row type="flex" justify="space-between" style="padding: 20px">
        <div style="font-size: 18px; color: red">若点击【确定】,请务必收款</div>
        <div>
          <el-button type="primary" size="mini">确定</el-button>
          <el-button type="primary" size="mini">取消</el-button>
        </div>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import { searchGood, searchVip, searchEmp } from '../../api/api.js'
export default {
  data () {
    return {
      loading: false,
      data: [],
      form: {
        sojournhistory: '', // 旅居史
        vipname: '', // 会员
        workername: '', // 营业员
        goodname: '' // 商品名
      },
      receiveform: {},
      returnform: {},
      choosedialog: false, // 选择批号
      recpaydialog: false, // 收款
      returndialog: false, // 退货
      pre_settlement: false, // 预结算
      readCard: false, // 读卡
      readcardform: {
        radio: 1
      }
    }
  },
  methods: {
    // 查会员
    async vipdown () {
      if (this.form.vipname) {
        const res = await searchVip({
          param: this.form.vipname
        })
        console.log(res)
      } else {
        this.$confirm('未输入会员信息,确定不输入会员信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log(1)
          })
          .catch(() => {
            console.log(2)
          })
      }
      this.$refs.yingye.focus()
    },
    // 查营业员
    async workerdown () {
      const res = await searchEmp({
        DH: this.form.workername
      })
      console.log(res)
    },
    // 查商品
    async goodsdown () {
      const res = await searchGood({
        param: this.form.goodname
      })
      console.log(res)
      this.choosedialog = true
    },
    // 批号确认
    choosebatch () {},
    // 流水号确定
    confirmSerialId () {}
  },
  created () {
    // 键盘事件
    document.onkeydown = (e) => {
      const evn = e || event
      const key = evn.keyCode || evn.which || evn.charCode

      console.log(key)

      if (key === 13) {
        console.log('查询该笔交易明细')
      } else if (key === 34) {
        // pagedown
        this.recpaydialog = true
      } else if (evn.ctrlKey && key === 89) {
        // ctrl+Y
        this.returndialog = true
      } else if (evn.ctrlKey && key === 73) {
        // ctrl+I
        this.pre_settlement = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 100vh;
}
.el-card {
  border: none;
}

.el-form-item {
  margin-bottom: 0;
  // background-color: orangered;
}

/deep/ .el-dialog__header {
  padding: 0 0;
}

/deep/ .el-dialog__body {
  padding: 10px 10px;
}
.leftbox {
  width: 500px;
  height: 300px;
}

.middlebox {
  width: 200px;
  height: 200px;
  margin-top: 100px;
  text-align: center;
  // background-color: mediumspringgreen;
}

.readutils {
  width: 100px;
  height: 200px;
  position: absolute;
  right: 50px;
  top: 10px;
  .el-button + .el-button {
    margin-left: 0;
    margin-top: 10px;
  }
  // display: flex;
  // flex-direction: column;
}
</style>
