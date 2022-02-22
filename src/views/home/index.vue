<template>
  <el-card class="main">
    <top-info
      :vipInfo="conditionform.vipchooseInfo"
      :isReturnGood="isReturnGood"
      :serialnumber="serialnumber"
    />
    <el-divider></el-divider>

    <!-- <table-list :data="data" :loading="loading" @delone="delOne" /> -->
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="loading"
      :data="data"
      height="47vh"
      border
    >
      <el-table-column type="index" width="75" label="序号"> </el-table-column>
      <el-table-column prop="货号" label="货号"> </el-table-column>
      <el-table-column prop="品名" label="品名"> </el-table-column>
      <el-table-column prop="药品国标码" label="药品国标码"></el-table-column>
      <el-table-column prop="零售价" label="零售价"> </el-table-column>
      <el-table-column prop="折后价" label="折后价"></el-table-column>
      <el-table-column prop="数量" label="数量"></el-table-column>
      <el-table-column prop="金额" label="金额"></el-table-column>
      <el-table-column prop="批号" label="批号"> </el-table-column>
      <el-table-column prop="批次号" label="批次号"> </el-table-column>
      <el-table-column label="是否处方">
        <template slot-scope="scope">
          {{ scope.row.是否处方 === true ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="规格" label="规格"> </el-table-column>
      <el-table-column prop="单位" label="单位"></el-table-column>
      <el-table-column prop="生产单位" label="生产单位"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="delOne(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 操作台 -->
    <el-row class="ccccc">
      <!-- 左 -->
      <!-- 货号 国标码 品名  规格 生产企业 零售价 可售库存 -->
      <div class="leftbox">
        <el-row
          type="flex"
          style="font-size: 1vw; color: red; padding: 0; margin: 1px"
        >
          <el-row style="margin-right: 25px"
            >姓名: {{ CardDetail.psnName }}</el-row
          >
          <el-row style="margin-right: 25px"
            >性别: {{ CardDetail.gend }}</el-row
          >
          <el-row style="margin-right: 25px"
            >险种: {{ CardDetail.insuType }}</el-row
          >
          <el-row style="margin-right: 25px"
            >余额: {{ CardDetail.balc }}</el-row
          >
        </el-row>
        <p style="padding: 0; margin: 1px"></p>
        <span style="font-size: 1.7vw; font-weight: 550"
          >小计: {{ subtotal }}</span
        >
        <p style="padding: 0; margin: 1px"></p>
        <el-row style="font-size: 1vw; font-weight: 550; margin-bottom: 5px">
          <el-row style="margin-bottom: 5px"
            >品名: {{ selectedRow.品名 }}</el-row
          >
          <el-row style="margin-bottom: 5px"
            >货号: {{ selectedRow.货号 }}</el-row
          >
          <el-row style="margin-bottom: 5px"
            >规格: {{ selectedRow.规格 }}</el-row
          >
          <el-row style="margin-bottom: 5px"
            >国标码: {{ selectedRow.药品国标码 }}</el-row
          >
        </el-row>
        <el-row style="font-size: 1vw; font-weight: 550; margin-bottom: 5px">
          可售库存: {{ selectedRow.库存数量 }}
        </el-row>
        <el-row type="flex" style="font-size: 1vw; font-weight: 550">
          <el-col>零售价: {{ selectedRow.零售价 }}</el-col>
          <el-col> 生产单位: {{ selectedRow.生产单位 }} </el-col>
        </el-row>
      </div>

      <!-- 中 -->
      <div class="middlebox">
        <el-button type="primary" @click="readCard = true">读卡</el-button>
        <el-button type="primary" @click="returndialog = true">退单</el-button>
        <el-button type="primary" @click="reload">刷新</el-button>
      </div>

      <!-- 右 -->
      <div class="rightbox">
        <el-row>
          <span style="font-size: 1.5vw">会员 : </span>
          <input
            ref="vip"
            type="text"
            v-model="conditionform.membername"
            @keyup.enter="vipdown"
            style="width: 10vw; margin-left: 0.1vw; font-size: 1.5vw" />
          <input
            type="text"
            v-model="conditionform.vipnamevalue"
            style="width: 12vw; margin-left: 0.5vw; font-size: 1.5vw"
        /></el-row>

        <el-row>
          <span style="font-size: 1.5vw">营业员 : </span>
          <input
            ref="salesperson"
            type="text"
            size="small"
            @keyup.enter="workerdown"
            v-model="conditionform.workername"
            style="width: 10vw; margin-left: 0.1vw; font-size: 1.5vw"
          />
          <input
            type="text"
            size="small"
            v-model="conditionform.workernamevalue"
            style="width: 12vw; margin-left: 0.5vw; font-size: 1.5vw"
          />
        </el-row>

        <el-row>
          <span style="font-size: 1.5vw">商品 : </span>
          <input
            ref="goodname"
            type="text"
            v-model="conditionform.goodname"
            @keyup.enter="goodsdown"
            style="width: 22.5vw; font-size: 1.5vw"
          />
        </el-row>

        <el-row>
          <span style="font-size: 1.5vw">数量 : </span>
          <input
            type="text"
            v-model="quantity"
            ref="quantity"
            @keydown.enter="quantitydown"
            style="width: 22.5vw; text-align: right; font-size: 1.5vw"
          />
        </el-row>

        <el-row>
          <span style="font-size: 1.5vw">单价 : </span>
          <!-- 零售价 -->
          <input
            type="text"
            v-model="retailprice"
            style="width: 7.3vw; font-size: 1.5vw; text-align: right"
            :disabled="true"
          />
          <!-- 折扣 -->
          <input
            type="text"
            v-model="discount"
            ref="discount"
            @keyup.enter="discountdown"
            @input="discountInput"
            :disabled="true"
            style="
              width: 7.3vw;
              font-size: 1.5vw;
              margin-left: 0.3vw;
              text-align: right;
            "
          />
          <!-- 折后价 -->
          <input
            type="text"
            ref="priceafterdiscount"
            @keydown.enter="priceafterdiscountdown"
            v-model="priceafterdiscount"
            @input="priceafterdiscountInput"
            style="
              width: 7.3vw;
              font-size: 1.5vw;
              margin-left: 0.3vw;
              text-align: right;
            "
          />
        </el-row>

        <el-row>
          <span style="font-size: 1.5vw">备注 : </span>
          <input
            type="text"
            size="small"
            ref="remark"
            @input="notesChange"
            @keydown.enter="remarkdown"
            v-model="conditionform.notes"
            style="width: 22.5vw; font-size: 1.5vw"
          />
        </el-row>
      </div>
    </el-row>

    <!-- 会员查询 -->
    <el-dialog
      title="会员查询"
      :visible.sync="vip_search"
      :show-close="false"
      @closed="vip_index = 0"
      modal
      top="5vh"
      width="950px"
    >
      <el-table
        ref="vip_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="viploading"
        :data="vip_table"
        height="500px"
        highlight-current-row
        @row-click="chooseVip"
        border
      >
        <el-table-column prop="会员名称" label="会员名称"></el-table-column>
        <el-table-column prop="会员编号" label="会员编号"></el-table-column>
        <el-table-column prop="兑现积分" label="兑现积分"> </el-table-column>
        <el-table-column prop="变更积分" label="变更积分"> </el-table-column>
        <el-table-column prop="手机号" label="手机号"> </el-table-column>
        <el-table-column prop="积分剩余" label="积分剩余"> </el-table-column>
        <el-table-column prop="累计积分" label="累计积分"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 商品选择 -->
    <el-dialog
      :visible.sync="choosedialog"
      top="5vh"
      @closed="good_index = 0"
      modal
      width="950px"
    >
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        ref="good_table"
        v-loading="goodloading"
        :data="good_table"
        highlight-current-row
        @row-click="chooseGood"
        height="500px"
        border
      >
        <el-table-column prop="品名" label="品名"> </el-table-column>
        <el-table-column prop="生产单位" label="生产单位"> </el-table-column>
        <el-table-column prop="产地" label="产地"></el-table-column>
        <el-table-column prop="库存数量" label="库存数量"> </el-table-column>
        <el-table-column prop="批号" label="批号"> </el-table-column>
        <el-table-column prop="批次号" label="批次号"> </el-table-column>
        <el-table-column prop="有效期" label="有效期"> </el-table-column>
        <el-table-column label="是否处方">
          <template slot-scope="scope">
            {{ scope.row.是否处方 === true ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="药品国标码"
          width="100"
          label="药品国标码"
        ></el-table-column>
        <el-table-column prop="规格" label="规格"> </el-table-column>
        <el-table-column prop="货号" label="货号"> </el-table-column>
        <el-table-column prop="单位" label="单位"></el-table-column>
        <el-table-column prop="零售价" label="零售价"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 营业员查询 -->
    <el-dialog
      :visible.sync="salespersondialog"
      :show-close="false"
      @closed="saleperson_index = 0"
      modal
      top="5vh"
      width="900px"
    >
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        ref="salesperson_table"
        v-loading="salespersonloading"
        :data="salesperson_table"
        highlight-current-row
        @row-click="chooseSalesperson"
        height="500px"
        border
      >
        <el-table-column prop="职员编号" label="职员编号"> </el-table-column>
        <el-table-column prop="职员名称" label="职员名称"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- pos收款 -->
    <el-dialog
      title="pos收款"
      top="5vh"
      :visible.sync="recpaydialog"
      modal
      width="850px"
    >
      <el-row type="flex">
        <el-form
          :model="receiveform"
          inline
          label-width="120px"
          style="width: 550px"
        >
          <el-form-item
            v-for="(item, index) in paymentWayList"
            :key="index"
            :label="`${item.名称} :`"
          >
            <el-input
              type="text"
              size="small"
              style="width: 110px"
              v-model="receiveform[item.名称]"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="receiveform" style="width: 9vw; margin-left: 1vw">
          <el-form-item label="折前金额 :">
            <input
              type="text"
              placeholder="0.00"
              disabled
              style="width: 200px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <!-- 应收金额 小计  -->

          <el-form-item label="应收金额 :">
            <input
              type="text"
              disabled
              placeholder="0.00"
              v-model="shouldReceive"
              style="width: 200px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="优惠金额 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 200px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="收现金 :">
            <input
              type="text"
              placeholder="0.00"
              v-model="cashreceivable"
              style="width: 200px; text-align: right; font-size: 20px"
            />
          </el-form-item>

          <el-form-item label="找零 :">
            <input
              type="text"
              placeholder="0.00"
              style="width: 200px; text-align: right; font-size: 30px"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="margin-top: 15px" type="flex" justify="space-around">
        <el-button size="small" @click="recpaydialog = false">取消</el-button>
        <!-- 调用医保预结算 -->

        <el-button
          type="primary"
          size="small"
          :disabled="subtotal > 0 || cannotMedicare"
          @click="cancelSetl"
          >撤销结算</el-button
        >
        <el-button
          type="primary"
          size="small"
          :disabled="subtotal < 0 || cannotMedicare"
          @click="preSettlement"
          >医保结算</el-button
        >
      </el-row>
    </el-dialog>

    <!-- 读卡 -->
    <el-dialog
      title="读卡"
      :visible.sync="readCard"
      top="12vw"
      modal
      width="950px"
    >
      <el-tabs type="card">
        <el-tab-pane label="读卡">
          <el-form
            :model="readcardform"
            :inline="true"
            ref="readform"
            label-width="120px"
            style="width: 800px"
            :rules="rules"
          >
            <el-form-item label="医疗类别" prop="medicalTreatmentType">
              <el-select
                v-model="readcardform.medicalTreatmentType"
                size="mini"
              >
                <el-option label="定点药店购药" value="41"> </el-option>
                <el-option label="药店购慢特病药" value="140104"> </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="读取类型">
              <el-radio-group v-model="readcardform.radio" size="mini">
                <el-radio-button :label="1">医保卡</el-radio-button>
                <el-radio-button :label="2">身份证</el-radio-button>
                <el-radio-button :label="3">电子医保凭证</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="药师">
              <el-input
                type="text"
                size="mini"
                style="width: 195px"
                disabled
                v-model="OrganizationAndPharmacist.职员名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="text"
                size="mini"
                style="width: 190px"
                v-model="readcardform.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="科室">
              <el-select v-model="readcardform.department" size="mini">
                <el-option label="01,内科" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="诊断类别">
              <el-select v-model="readcardform.diagnosisCategory" size="mini">
                <el-option label="西医主要诊断" value="1"> </el-option>
                <el-option label="中医主病诊断" value="2"></el-option>
                <el-option label="中医主证诊断" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="险种类型" prop="insuType">
              <el-select v-model="readcardform.insuType" size="mini">
                <el-option
                  label="职工基本医疗保险"
                  value="职工基本医疗保险"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病种" prop="diseCode">
              <el-select v-model="readcardform.diseCode" size="mini">
                <el-option
                  v-for="(item, index) in diseCodeArr"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="readutils">
            <el-button type="primary" size="small" @click="getReadCard"
              >读卡</el-button
            >
            <el-button type="primary" size="small" @click="changePassword"
              >密码修改</el-button
            >
            <el-button type="primary" size="small" @click="submitMedicareInfo"
              >确定</el-button
            >
            <el-button type="danger" size="small" @click="readCard = false"
              >取消</el-button
            >
          </div>

          <el-row style="padding-left: 10px; margin: 8px 0">
            医保支付标志
            <el-checkbox v-model="readcardform.isMedicarePayment"></el-checkbox>
          </el-row>
          <el-row style="color: #f84033; font-size: 18px">
            <el-col
              >【药店编码:{{
                OrganizationAndPharmacist.定点药店编号
              }}】【药店名称:{{
                OrganizationAndPharmacist.定点机构名
              }}】</el-col
            >
            <el-col
              >【药师编码:{{
                OrganizationAndPharmacist.药师编号
              }}】【药师名称:{{ OrganizationAndPharmacist.职员名称 }}】</el-col
            >
          </el-row>

          <el-tabs type="border-card" style="margin-top: 5px">
            <el-tab-pane label="基本信息">
              <el-row style="color: #007acc; font-size: 18px">
                <el-col>人员证件类型 : {{ CardDetail.psnCertType }}</el-col>
                <el-col>证件号码 : {{ CardDetail.certNo }}</el-col>
                <el-col>人员姓名 : {{ CardDetail.psnName }}</el-col>
                <el-col>性别 : {{ CardDetail.gend }}</el-col>
                <el-col>民族 : {{ CardDetail.naty }}</el-col>
                <el-col>职工基本医疗保险 : {{ CardDetail.balc }}</el-col>
                <el-col>大额医疗费用补助 : </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="参保信息">参保信息</el-tab-pane>
            <el-tab-pane label="身份信息">身份信息</el-tab-pane>
          </el-tabs>

          <el-row
            style="
              color: #f84033;
              font-size: 30px;
              padding-left: 20px;
              border-bottom: 1px solid #ccc;
            "
          >
            {{ OrganizationAndPharmacist.定点机构名 }}
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="其他查询">其他查询</el-tab-pane>
      </el-tabs>

      <!-- 身份证录入 -->
      <el-dialog :visible.sync="isShowIdIpt" modal width="500px" append-to-body>
        <el-form :model="idCardIpt" label-width="80px">
          <el-form-item label="姓名 :">
            <el-input
              v-model="idCardIpt.name"
              placeholder="请输入姓名"
              style="width: 350px"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="身份证 :" style="margin-top: 15px">
            <el-input
              v-model="idCardIpt.idNo"
              placeholder="请输入身份证号"
              style="width: 350px"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-button type="primary" size="small" @click="queryByIdentity"
            >确定</el-button
          >
        </el-row>
      </el-dialog>
    </el-dialog>

    <!-- 预结算 -->
    <el-dialog
      title="预结算"
      :visible.sync="pre_settlement"
      modal
      width="800px"
    >
      <el-row style="padding: 20px; border: 1px solid #ccc">
        <el-row :gutter="20" style="font-size: 18px">
          <el-col :span="12">
            销售金额 : <span style="color: red">{{ totalToFixed }} </span>
          </el-col>
          <el-col :span="12"
            >中心结算金额 : <span style="color: red">0.00</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px">
          <el-col :span="12"
            >符合金额 : <span style="color: red">0.00</span>
          </el-col>
          <el-col :span="12"
            >现金 : <span style="color: red">0.00</span></el-col
          >
        </el-row>
      </el-row>

      <el-row style="margin: 20px 0; padding: 20px; border: 1px solid #ccc">
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >医疗费总额 : {{ preSetlForm.medfeeSumAmt }}
          </el-col>
          <el-col :span="12"
            >基金支付总额 : {{ preSetlForm.fundPaySumAmt }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">个人账户支出 : {{ preSetlForm.acctPay }} </el-col>
          <el-col :span="12"
            >个人现金支出 : {{ preSetlForm.psnCashPay }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">余额 : {{ preSetlForm.balc }} </el-col>
          <el-col :span="12"
            >基本医疗保险统筹基金支出 : {{ preSetlForm.hifpPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >公务员医疗补助资金支出 : {{ preSetlForm.cvlservPay }}
          </el-col>
          <el-col :span="12"
            >企业补充医疗保险基金支出 : {{ preSetlForm.hifesPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >居民大病保险资金支出 : {{ preSetlForm.hifmiPay }}
          </el-col>
          <el-col :span="12"
            >职工大额医疗费用补助基金支出 : {{ preSetlForm.hifobPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >医疗救助基金支出 : {{ preSetlForm.mafPay }}
          </el-col>
          <el-col :span="12">其他支出 : {{ preSetlForm.othPay }}</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >个人负担总金额 : {{ preSetlForm.psnPartAmt }}
          </el-col>
          <el-col :span="12"
            >个人账户共济支付金额 : {{ preSetlForm.acctMulaidPay }}</el-col
          >
        </el-row>
      </el-row>

      <el-row type="flex" justify="space-between" style="padding: 20px">
        <div style="font-size: 18px; color: red">若点击【确定】,请务必收款</div>
        <div>
          <!-- 调用正式结算 -->
          <el-button
            type="primary"
            size="small"
            :disabled="alreadyPay"
            @click="formalSettlement"
            >确定</el-button
          >
          <el-button type="primary" size="small" @click="pre_settlement = false"
            >取消</el-button
          >
        </div>
      </el-row>
    </el-dialog>

    <!-- 退单查询 -->
    <el-dialog
      title="退单查询"
      top="5vh"
      :visible.sync="returndialog"
      modal
      width="950px"
    >
      <!-- <el-tabs type="card"> -->
      <!-- <el-tab-pane label="整单退货"> -->
      <el-form
        :model="returnform"
        inline
        label-width="120px"
        style="width: 1000px"
      >
        <el-form-item label="流水号">
          <el-input
            type="text"
            style="width: 220px"
            v-model="returnform.billno"
          ></el-input>
        </el-form-item>
        <el-form-item label="起始日期">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            @change="dealTime(0)"
            v-model="returnform.beginDate"
            style="width: 220px"
          ></el-date-picker>
        </el-form-item>
        <!-- 流水号查询 -->
        <el-form-item>
          <el-button type="primary" size="small" @click="searchByOverflow"
            >查询</el-button
          >
          <el-button type="primary" size="small" @click="returndialog = false"
            >确定</el-button
          >
        </el-form-item>

        <el-form-item label="会员编号">
          <el-input
            type="text"
            style="width: 220px"
            v-model="returnform.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            type="date"
            placeholder="结束日期"
            @change="dealTime(1)"
            style="width: 220px"
            v-model="returnform.endDate"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <el-table
        style="margin-top: 10px"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
        :data="chargebackList"
        height="230px"
        @row-click="chooseChargeback"
        border
      >
        <el-table-column prop="BillNo" label="单据编号"></el-table-column>
        <el-table-column prop="billdate" label="单据日期"></el-table-column>
        <el-table-column prop="billtime" label="单据时间"> </el-table-column>
        <el-table-column prop="id" label="会员编号"> </el-table-column>
        <el-table-column prop="membername" label="会员"> </el-table-column>
        <el-table-column prop="amounttax" label="价税合计"> </el-table-column>
      </el-table>

      <el-table
        style="margin: 10px 0"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="loading"
        :data="oneChargeback"
        height="230px"
        border
      >
        <el-table-column prop="Psnname" label="医保姓名"></el-table-column>
        <el-table-column prop="Medfeesumamt" label="刷卡金额"></el-table-column>
        <el-table-column prop="materielguid" label="货号"> </el-table-column>
        <el-table-column prop="singlequantity" label="数量"> </el-table-column>
        <el-table-column prop="singlequantity" label="退货数量">
        </el-table-column>
        <el-table-column prop="xy_ybgbm" label="药品国标码"> </el-table-column>
        <el-table-column prop="PM" label="品名"> </el-table-column>
        <el-table-column prop="GG" label="规格"> </el-table-column>
        <el-table-column prop="SCDW" label="生产企业"> </el-table-column>
        <el-table-column prop="PDW" label="单位"> </el-table-column>
        <el-table-column prop="batchno" label="批号"> </el-table-column>
      </el-table>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="拆单退货">拆单退货</el-tab-pane> -->
      <!-- </el-tabs> -->
    </el-dialog>

    <!-- 结算成功提示 -->
    <el-dialog
      :visible.sync="settlementSuccess"
      modal
      top="5vh"
      :show-close="false"
      width="750px"
      :close-on-click-modal="false"
      class="paysuccess"
      style="padding: 0"
    >
      <!-- hifpPay 统筹基金支出 -->
      <!-- acctPay 个人账户支出 -->
      <el-row justify="center">
        <el-row
          type="flex"
          justify="center"
          style="font-size: 32px; color: #41a863"
        >
          医保结算成功</el-row
        >
        <el-row type="flex" style="font-size: 25px; margin: 20px 0 0 100px">
          医保支付总金额:
          {{
            this.preSetlForm.medfeeSumAmt ? this.preSetlForm.medfeeSumAmt : "0"
          }}</el-row
        >
        <el-row type="flex" style="font-size: 25px; margin: 20px 0 0 100px"
          >个人账户支出: {{ PaymentSetInfo.acctPay }}</el-row
        >
        <el-row type="flex" style="font-size: 25px; margin: 20px 0 0 100px"
          >统筹基金支出: {{ PaymentSetInfo.hifpPay }}</el-row
        >
      </el-row>
      <el-row style="margin: 20px 0; padding: 20px; border: 1px solid #ccc">
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >医疗费总额 : {{ preSetlForm.medfeeSumAmt }}
          </el-col>
          <el-col :span="12"
            >基金支付总额 : {{ preSetlForm.fundPaySumAmt }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">个人账户支出 : {{ preSetlForm.acctPay }} </el-col>
          <el-col :span="12"
            >个人现金支出 : {{ preSetlForm.psnCashPay }}
          </el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12">余额 : {{ preSetlForm.balc }} </el-col>
          <el-col :span="12"
            >基本医疗保险统筹基金支出 : {{ preSetlForm.hifpPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >公务员医疗补助资金支出 : {{ preSetlForm.cvlservPay }}
          </el-col>
          <el-col :span="12"
            >企业补充医疗保险基金支出 : {{ preSetlForm.hifesPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >居民大病保险资金支出 : {{ preSetlForm.hifmiPay }}
          </el-col>
          <el-col :span="12"
            >职工大额医疗费用补助基金支出 : {{ preSetlForm.hifobPay }}</el-col
          >
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >医疗救助基金支出 : {{ preSetlForm.mafPay }}
          </el-col>
          <el-col :span="12">其他支出 : {{ preSetlForm.othPay }}</el-col>
        </el-row>
        <el-row :gutter="20" style="font-size: 18px; color: red">
          <el-col :span="12"
            >个人负担总金额 : {{ preSetlForm.psnPartAmt }}
          </el-col>
          <el-col :span="12"
            >个人账户共济支付金额 : {{ preSetlForm.acctMulaidPay }}</el-col
          >
        </el-row>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 30px"
        ><el-button type="primary" @click="closeSettlementDialog"
          >关闭</el-button
        ></el-row
      >
    </el-dialog>

    <!-- 修改密码 -->
    <!-- <change-password /> -->
  </el-card>
</template>

<script>
import {
  searchGood,
  searchVip,
  searchEmp,
  getOverFlow,
  getOrganizationAndPharmacist,
  getPaymentWay,
  getReadCard,
  reMc,
  searchByOverflow,
  returnBackGuid,
  GenerateOutgoingList,
  preSettlement,
  formalSettlement,
  cancelSetl,
  queryInfoByIdentity,
  queryByIpt,
  changePassword
} from '../../api/api.js'
// import { mapState } from 'vuex'
import topInfo from './components/topInfo'
// import changePassword from './components/change_password'
// import eventBus from '@/utils/eventBus'
import { floatMultiply } from '../../utils/plugins'

export default {
  inject: ['reload'], // 调用 this.reload  加载
  data () {
    var validateDiseCode = (rule, value, callback) => {
      if (this.readcardform.medicalTreatmentType === '140104' && value === '') {
        callback(new Error('医疗类别为药店购慢特病药时,病种不能为空 !!!'))
      } else {
        callback()
      }
    }

    return {
      conditionform: {
        lvs: '', // 旅居史
        ywfr: '', // 发热
        vipname: '', // 会员
        vipnamevalue: '', // 会员积分
        vipchooseInfo: '', // 会员信息
        workername: '', // 营业员
        workernamevalue: '', // 营业员
        goodname: '', // 商品名
        notes: '' // 备注
      },
      idCardIpt: {
        name: '',
        idNo: ''
      },
      alreadyPay: false, // 已经医保结算了
      loading: false, // 主表加载
      viploading: false, // 会员加载
      goodloading: false, // 商品加载
      choosedialog: false, // 选择商品批号
      recpaydialog: false, // 收款
      returndialog: false, // 退单
      vip_search: false, // 会员查询
      pre_settlement: false, // 预结算
      readCard: false, // 读卡

      OrganizationAndPharmacist: {}, // 组织机构、药师、班次号
      isReturnGood: 5, // 单据状态 ---》 5 售货状态   7退货状态
      serialnumber: '', // 流水号

      quantity: '', // 数量
      retailprice: 0, // 零售价
      discount: 100, // 折扣
      priceafterdiscount: 0, // 折后价
      subtotal: 0, // 小计

      vip_table: [], // 会员表信息
      vipInfo: {}, // 当前选择的会员信息
      good_table: [], // 商品明细列表
      selectedRow: {}, // 当前选择的商品信息

      serialIndex: 1, // 序号
      data: [], // 表格数据

      paymentWayList: [], // 所有的支付方式列表
      receiveform: {}, // pos收款表单
      shouldReceive: 0, // 应收金额
      otherpayment: 0, // 其他支付方式总金额
      cashreceivable: 0, // 应收现金

      CardDetail: {}, // 医保读卡详细信息

      readcardform: {
        medicalTreatmentType: '', // 医疗类别
        radio: 1, // 卡类别
        yaoshi: '', // 药师
        password: '', // 密码
        department: '', // 科室
        diagnosisCategory: '', // 诊断类别
        insuType: '', // 险种类别
        diseCode: '', // 病种
        isMedicarePayment: true // 医保支付标识
      },

      returnform: {
        // 退单查询
        billno: '', // 流水号
        beginDate: '', // 开始日期
        id: '', // 会员编号
        endDate: '' // 结束日期
      },

      chargebackList: [], // 退单查询结果
      oneChargeback: [], // 下方明细
      preSetlForm: {
        // 医保预结算返回
      },
      nowGuid: '', // 当前退单guid
      orgNo: '', // 当前退单orgNo
      settlementSuccess: false, // 结算成功弹窗
      vip_index: 0,
      good_index: 0,
      saleperson_index: 0,
      rules: {
        medicalTreatmentType: [
          { required: true, message: '请选择医疗类别', trigger: 'change' }
        ],
        insuType: [
          { required: true, message: '请选择险种类别', trigger: 'change' }
        ],
        diseCode: [{ validator: validateDiseCode, trigger: 'blur' }]
      },
      cannotMedicare: false,
      salespersondialog: false, // 营业员dialog
      salespersonloading: false, // 营业员加载
      salesperson_table: [], // 查回所有营业员信息
      PaymentSetInfo: {}, // 正式支付结果
      isShowIdIpt: false, // 当卡类别为身份证时要显示身份证录入
      diseCodeArr: [] // 疾病编码数组
    }
  },
  methods: {
    notesChange () {
      if (this.readcardform.diseCode === '') {
        this.$message({
          type: 'warning',
          message: '个账不允许输入备注'
        })
        this.conditionform.notes = ''
      }
    },
    // 新增一个商品！！！！！！！！！！！！！！！！！！！
    async submitOne () {
      const { 有效期, 成本价, 生产日期, 药品国标码, 批号, 批次号, 货号 } =
        this.selectedRow

      const { membername, workername, notes } = this.conditionform
      // 向selectRow 补充
      var onePiece = {
        billtype: this.isReturnGood, // 单据状态
        personname: membername, // 会员名
        employeeid: workername, // 营业员
        notes,
        code1: localStorage.getItem('operatoId'), // 操作人员
        discountprice: this.retailprice, // 折前零售价
        discountrate: this.discount, // 折扣
        unitpricetax: this.priceafterdiscount, // 折后价
        billno: this.serialnumber, // 流水号
        originalno: this.serialnumber,
        id: this.vipInfo.会员编号, // 会员编号
        code: this.OrganizationAndPharmacist.定点药店编号, // 定点药店编号
        detailno: this.serialIndex, // 序号
        stockid: 1, // 仓库号
        billdate: this.$dealTime(Date.now()) + ' ' + '00:00:00', // 日期
        billtime: '1900-01-01' + ' ' + this.$minTime(Date.now()), // 时间
        chalkdate: this.$relTime(Date.now()),
        auxquantity: this.quantity, // 数量
        singlequantity: this.quantity,
        validdate: 有效期, // 有效期
        costprice: 成本价, // 成本价
        batchprice: 成本价, // 批次成本价
        batchdate: 生产日期, // 生产日期
        medListCode: 药品国标码,
        数量: this.quantity,
        折后价: this.priceafterdiscount,
        金额: floatMultiply(
          Number(this.quantity),
          Number(this.priceafterdiscount)
        ),
        amounttax: floatMultiply(
          Number(this.quantity),
          Number(this.priceafterdiscount)
        ),
        batchno: 批号, // 批号
        batchnumber: 批次号, // 批次号
        materielid: 货号 // 货号
      }
      this.selectedRow = { ...this.selectedRow, ...onePiece }
      const repeat = this.data.find((item) => {
        return (
          item.batchno === this.selectedRow.batchno &&
          item.batchnumber === this.selectedRow.batchnumber &&
          item.materielid === this.selectedRow.materielid
        )
      })
      if (repeat) {
        if (
          repeat.auxquantity * 1 + this.quantity * 1 >
          this.selectedRow.库存数量 && this.conditionform.notes !== '11'
        ) {
          alert('所选药品总数量大于库存数量')
          return
        } else {
          repeat.auxquantity = repeat.auxquantity * 1 + this.quantity * 1
          repeat.数量 = repeat.auxquantity
          repeat.singlequantity = repeat.singlequantity * 1 + this.quantity * 1
          repeat.amounttax = floatMultiply(
            Number(repeat.auxquantity),
            Number(repeat.unitpricetax)
          )
          repeat.金额 = repeat.amounttax * 1
        }
      } else {
        this.data.push(this.selectedRow)
        this.serialIndex = this.serialIndex + 1 // 序号
      }

      // 小计
      this.subtotal = 0
      this.data.forEach((item, index) => {
        this.subtotal = (Number(this.subtotal) + item.amounttax).toFixed(2)
      })
    },

    // 删除一个商品
    delOne (index) {
      this.data.splice(index, 1)
      this.subtotal = 0
      this.data.forEach((item) => {
        this.subtotal = (Number(this.subtotal) + item.amounttax).toFixed(2)
      })
    },

    // 获取定点机构
    async getOrganizationAndPharmacist () {
      const res = await getOrganizationAndPharmacist()
      this.OrganizationAndPharmacist = res.data[0]
      this.$store.commit('getOrganizationAndPharmacist', res.data[0])
    },

    // 获取流水号
    async getOverFlow () {
      const res = await getOverFlow({})
      if (res.code === 0 && res.msg === 'success') {
        this.serialnumber = res.data
      }
    },

    // 修改折扣
    discountInput () {
      if (this.discount < 0) this.discount = 0
      this.priceafterdiscount = (
        (this.retailprice * this.discount) /
        100
      ).toFixed(2)
    },

    // 修改折后价
    priceafterdiscountInput () {
      if (this.priceafterdiscount < 0) this.priceafterdiscount = 0
      this.discount = (
        (this.priceafterdiscount / this.retailprice) *
        100
      ).toFixed(2)
    },

    // 查询会员
    async vipdown () {
      if (this.conditionform.membername) {
        this.vip_search = true

        this.viploading = true
        const res = await searchVip({
          param: this.conditionform.membername
        })
        this.viploading = false
        if (res.code === 0 && res.msg === 'success') {
          this.vip_table = res.data
          this.$refs.vip_table.setCurrentRow(this.vip_table[this.vip_index]) // 默认选择第一个
        } else {
          this.$message({
            type: 'error',
            message: '查询失败'
          })
        }
      } else {
        this.$confirm('未输入会员信息,确定不输入会员信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$refs.salesperson.focus()
          })
          .catch(() => {})
      }
    },

    // 会员列表点击事件
    chooseVip (val) {
      this.vipInfo = val
      if (val.会员名称) this.conditionform.membername = val.会员名称
      if (val.身份证号) this.conditionform.idcardno = val.身份证号
      const values = Object.values(val)
      const newArr = [val['会员名称'], val['手机号'], val['积分剩余']]
      const aArr = Object.keys(val).map((item, index) => {
        if (item === '积分剩余') {
          return values[index]
        }
      })
      this.conditionform.vipnamevalue = aArr.join(' ')
      this.conditionform.vipchooseInfo = newArr.join('_')
      this.vip_search = false
    },

    // 查营业员
    async workerdown () {
      this.salespersondialog = true
      this.salespersonloading = true
      try {
        const res = await searchEmp({
          DH: this.conditionform.workername
        })
        this.salespersonloading = false
        if (res.code === 0 && res.msg === 'success' && res.data.length > 0) {
          this.salesperson_table = res.data
        } else {
          this.$message({
            type: 'error',
            message: '查询失败!'
          })
        }
      } catch (error) {
        this.$message({
          type: 'error',
          message: '查询失败!'
        })
      }

      this.$refs.salesperson.blur()
      this.$refs.salesperson_table.setCurrentRow(
        this.salesperson_table[this.saleperson_index]
      )
    },

    // 营业员点击行
    chooseSalesperson (val) {
      this.conditionform.workername = val.职员编号
      this.conditionform.workernamevalue = val.职员名称
      this.salespersondialog = false
      this.$refs.goodname.focus()
    },

    // 查询商品
    async goodsdown () {
      this.goodloading = true

      if (this.conditionform.goodname !== '') {
        this.choosedialog = true
        const res = await searchGood({
          param: this.conditionform.goodname
        })
        this.goodloading = false
        if (res.code === 0 && res.msg === 'success') {
          this.good_table = res.data
          this.$refs.good_table.setCurrentRow(this.good_table[this.good_index])
        } else {
          this.$message({
            type: 'error',
            message: '查询失败'
          })
        }
      } else {
        return false
      }
    },

    // 商品列表点击事件
    chooseGood (val) {
      this.selectedRow = val
      this.retailprice = val.零售价
      this.conditionform.goodname = val.品名
      this.choosedialog = false
      this.$refs.quantity.focus() // 聚焦数量
    },

    // 数量回车
    quantitydown () {
      if (this.quantity > this.selectedRow.库存数量 && this.conditionform.notes !== '11') {
        this.$message({
          type: 'error',
          message: '药品售卖数量不能大于库存数量'
        })
        return false
      } else if (this.quantity.trim() === '') {
        return false
      } else {
        this.$refs.priceafterdiscount.focus()
      }
    },

    // 折后价回车事件
    priceafterdiscountdown () {
      if (this.quantity > this.selectedRow.库存数量 && this.conditionform.notes !== '11') {
        this.$message({
          type: 'error',
          message: '药品售卖数量不能大于库存数量'
        })
        return false
      } else {
        this.$refs.remark.focus()
      }
    },

    // 备注回车          >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    remarkdown () {
      if (this.quantity > this.selectedRow.库存数量 && this.conditionform.notes !== '11') {
        this.$message({
          type: 'error',
          message: '药品售卖数量不能大于库存数量'
        })
        return false
      } else if (
        this.conditionform.workername === '' ||
        this.quantity === '' ||
        this.priceafterdiscount === '' ||
        this.conditionform.goodname === ''
      ) {
        this.$message({
          type: 'error',
          message: '请填写必填项'
        })
        return false
      } else {
        this.submitOne()
        this.conditionform.goodname = ''
        this.conditionform.priceafterdiscount = 0
        this.retailprice = 0
        this.discount = 100
        this.selectedRow = {}
        this.quantity = ''
        this.$refs.remark.blur()
      }
    },

    // 获取支付方式
    async getPaymentWay () {
      const res = await getPaymentWay()
      if (res.code === 0 && res.msg === 'success') {
        this.paymentWayList = res.data
      }
    },

    // pagedown pos收款  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async GenerateOutgoingList () {
      try {
        const res = await GenerateOutgoingList(this.data)
        if (res.code === 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.serialIndex = 0 // 序号清零

          // 查guid
          try {
            const result = await searchByOverflow({
              billno: this.serialnumber // 流水号
            })
            if (result.code === 0 && result.msg === 'success') {
              this.nowGuid = result.data[0].Guid
            } else {
              this.$message({
                message: 'guid查询失败',
                type: 'error'
              })
            }
          } catch (error) {
            this.$message({
              message: 'guid查询失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '单据插入失败，请稍后再试',
            type: 'error'
          })
          this.cannotMedicare = true
        }
      } catch (error) {
        this.$message({
          message: '单据插入失败,请稍后再试',
          type: 'error'
        })
      }
    },

    // 读医保卡和身份证   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    async getReadCard () {
      if (!this.readcardform.medicalTreatmentType) {
        alert('请选择医疗类别后再进行读卡')
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading', // 加载时文字
        spinner: 'el-icon-loading', // 加载样式
        background: 'rgba(0, 0, 0, 0.7)' // 透明度
      })

      const { 定点药店编号, 药店名称, 药师编号, 职员名称 } =
        this.OrganizationAndPharmacist
      const { medicalTreatmentType } = this.readcardform

      if (this.readcardform.radio === 1) {
        // 读医保卡
        try {
          const res = await getReadCard({
            hospitalNo: 定点药店编号, // 定点药店编码
            shopName: 药店名称, // 药店名称
            opter: 药师编号, // 药师编码
            opterName: 职员名称, // 药师名称
            orgNo: '210800', // 定点机构编码
            medicalTreatmentType: medicalTreatmentType
          })
          loading.close()
          if (res.code === 0 && res.msg === 'success') {
            this.$message({
              message: '读取成功',
              type: 'success'
            })
            this.CardDetail = res.baseInfo
            this.diseCodeArr = res.baseInfo.diseCode
              ? res.baseInfo.diseCode.split(';')
              : []
            if (this.diseCodeArr.length > 0) {
              this.readcardform.diseCode = this.diseCodeArr[0]
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        } catch (error) {
          loading.close()
          this.$message({
            message: '读取失败,请重新读取',
            type: 'error'
          })
        }
      } else if (this.readcardform.radio === 2) {
        // 读身份证
        try {
          const res = await queryByIpt({
            hospitalNo: 定点药店编号, // 定点药店编码
            shopName: 药店名称, // 药店名称
            orgNo: '210800', // 定点机构编码
            medicalTreatmentType: medicalTreatmentType
          })
          loading.close()
          if (res.code === 0 && res.msg === 'success') {
            this.$message({
              message: '读取成功',
              type: 'success'
            })
            this.idCardIpt.name = res.name
            this.idCardIpt.idNo = res.idNo
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        } catch (error) {
          loading.close()
          this.$message({
            message: '读取失败,请重新读取',
            type: 'error'
          })
        }
        this.isShowIdIpt = true
      } else if (this.readcardform.radio === 3) {
        // 获取电子凭证
        try {
          const data = {
            hospitalNo: 定点药店编号, // 定点药店编码
            shopName: 药店名称, // 药店名称
            opter: 药师编号, // 药师编码
            opterName: 职员名称, // 药师名称
            orgNo: '210800', // 定点机构编码
            medicalTreatmentType: medicalTreatmentType
          }
          const res = await reMc(data)
          if (res.code === 0 && res.msg === 'success') {
            this.$message({
              message: '获取电子凭证成功',
              type: 'success'
            })
            this.CardDetail = res.baseInfo
            this.diseCodeArr = res.baseInfo.diseCode
              ? res.baseInfo.diseCode.split(';')
              : []
            if (this.diseCodeArr.length > 0) {
              this.readcardform.diseCode = this.diseCodeArr[0]
            }
          } else {
            this.$message({
              message: '获取电子凭证失败',
              type: 'error'
            })
          }

          loading.close()
        } catch (error) {
          loading.close()
          this.$message({
            message: '获取电子凭证失败',
            type: 'error'
          })
        }
      }
    },

    // 密码修改
    async changePassword () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading', // 加载时文字
        spinner: 'el-icon-loading', // 加载样式
        background: 'rgba(0, 0, 0, 0.7)' // 透明度
      })
      try {
        const { 定点药店编号 } = this.OrganizationAndPharmacist
        const res = await changePassword({
          hospitalNo: 定点药店编号
        })
        loading.close()
        if (res.code === 0 && res.msg === 'success') {
          alert('修改成功')
        }
      } catch (error) {
        loading.close()
        this.$message({
          type: 'error',
          message: '修改失败,请重试'
        })
      }

      // eventBus.$emit('changePassword')
    },

    // 根据身份证查询基本信息
    async queryByIdentity () {
      this.isShowIdIpt = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading', // 加载时文字
        spinner: 'el-icon-loading', // 加载样式
        background: 'rgba(0, 0, 0, 0.7)' // 透明度
      })
      const { 定点药店编号, 药店名称 } = this.OrganizationAndPharmacist
      const { medicalTreatmentType } = this.readcardform
      try {
        const res = await queryInfoByIdentity({
          hospitalNo: 定点药店编号,
          shopName: 药店名称,
          orgNo: '210800',
          name: this.idCardIpt.name,
          idNo: this.idCardIpt.idNo,
          medicalTreatmentType: medicalTreatmentType
        })
        loading.close()
        if (res.code === 0 && res.msg === 'success') {
          this.$message({
            message: '获取个人信息成功',
            type: 'success'
          })
          this.CardDetail = res.baseInfo
          this.diseCodeArr = res.baseInfo.diseCode
            ? res.baseInfo.diseCode.split(';')
            : []
          if (this.diseCodeArr.length > 0) {
            this.readcardform.diseCode = this.diseCodeArr[0]
          }
        } else {
          this.$message({
            message: '获取个人信息失败,请稍后再试!',
            type: 'error'
          })
        }
        this.idCardIpt = {}
      } catch (error) {
        loading.close()
        this.$message({
          message: '获取个人信息失败,请稍后再试!',
          type: 'error'
        })
      }
    },

    // 读卡dialog  确定事件
    submitMedicareInfo () {
      this.$refs.readform.validate((isOk) => {
        if (isOk) {
          this.readCard = false
        } else {
          this.$message({
            type: 'error',
            message: '请填写必填项!!!'
          })
        }
      })
    },

    // 预结算
    async preSettlement () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading', // 加载时文字
        spinner: 'el-icon-loading', // 加载样式
        background: 'rgba(0, 0, 0, 0.7)' // 透明度
        // 255,255,255,.9  白色背景
      })
      const items = this.data.map((item) => {
        return {
          medicalItemCode: item.medListCode, // 医药机构目录编码
          medListCode: item.medListCode, // 医疗目录编码
          amount: item.amounttax, // 明细项目费用总额
          num: item.singlequantity, // 数量
          unitPrice: item.discountprice // 单价
        }
      })
      const { 定点药店编号, 药店名称, 药师编号, 职员名称 } =
        this.OrganizationAndPharmacist
      const { insuOrgNo, psnNo, certNo, psnName } = this.CardDetail
      const { diseCode, isMedicarePayment, medicalTreatmentType, insuType } =
        this.readcardform
      try {
        const res = await preSettlement({
          hospitalNo: 定点药店编号, // 定点药店编码
          shopName: 药店名称, // 药店名称
          opter: 药师编号, // 药师编码
          opterName: 职员名称, // 药师名称
          diseaseCode: diseCode, // 慢特病
          orgNo: insuOrgNo, // 定点机构编码
          psnNo: psnNo, // 个人编号
          psnName: psnName, // 个人姓名
          idNo: certNo, // 身份证号
          begnTime: this.$relTime(Date.now()), // 购药时间
          totalAmount: this.subtotal, // 医疗费总额
          acctUserFlag: isMedicarePayment ? 1 : 0, // 医保支付标志
          medicalTreatmentType: medicalTreatmentType, // 医疗类别
          insuType: insuType, // 险种类别
          billNo: this.serialnumber,
          items: items
        })
        loading.close()
        if (res.code === 0 && res.msg === 'success') {
          this.preSetlForm = res.setlInfo
          this.pre_settlement = true
        } else {
          this.$message({
            type: 'error',
            message: res.msg ? res.msg : '预结算失败,请重试!'
          })
        }
      } catch (error) {
        loading.close()
        this.$message({
          type: 'error',
          message: '预结算失败,请重试!'
        })
      }
    },

    // 正式结算
    async formalSettlement () {
      this.alreadyPay = true // 点击一次禁用确定按钮
      const items = this.data.map((item) => {
        return {
          medicalItemCode: item.medListCode, // 医药机构目录编码
          medListCode: item.medListCode, // 医疗目录编码
          amount: item.amounttax, // 明细项目费用总额
          num: item.singlequantity, // 数量
          unitPrice: item.discountprice // 单价
        }
      })
      const loading = this.$loading({
        lock: true,
        text: 'Loading', // 加载时文字
        spinner: 'el-icon-loading', // 加载样式
        background: 'rgba(0, 0, 0, 0.7)' // 透明度
        // 255,255,255,.9  白色背景
      })
      const stopIndex = this.data.findIndex(
        (item) => item.materielid === '91000'
      )
      if (stopIndex !== -1) {
        alert('当前已选商品中存在测试货号,不允许正式结算!!!')
        loading.close()
      } else {
        const { 定点药店编号, 药店名称, 药师编号, 职员名称 } =
          this.OrganizationAndPharmacist
        const { insuOrgNo, psnNo, certNo, balc } = this.CardDetail
        const { diseCode, isMedicarePayment, medicalTreatmentType, insuType } =
          this.readcardform
        try {
          const res = await formalSettlement({
            hospitalNo: 定点药店编号, // 定点药店编码
            shopName: 药店名称, // 药店名称
            opter: 药师编号, // 药师编码
            opterName: 职员名称, // 药师名称
            orgNo: insuOrgNo, // 定点机构编码
            psnNo, // 个人编号
            idNo: certNo, // 身份证号
            balance: balc, // 医保刷卡余额
            begnTime: this.$relTime(Date.now()), // 购药时间
            totalAmount: this.subtotal, // 医疗费总额
            diseaseCode: diseCode, // 慢特病
            acctUserFlag: isMedicarePayment ? 1 : 0, // 医保支付标志
            medicalTreatmentType, // 医疗类别
            insuType, // 险种类别
            orderId: this.nowGuid,
            billNo: this.serialnumber,
            items: items
          })
          loading.close()
          if (res.code === 0 && res.msg === 'success') {
            // hifpPay 统筹基金支出
            // acctPay 个人账户支出
            // 正式支付结果
            this.PaymentSetInfo = res.setlInfo
            this.settlementSuccess = true
            this.pre_settlement = false
            this.recpaydialog = false
            // this.receiveform.大石桥医保 = res.setlInfo.balance
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        } catch (error) {
          loading.close()
          this.$message({
            type: 'error',
            message: '结算失败,请重试!'
          })
        }
      }
    },

    // 关闭正式结算
    closeSettlementDialog () {
      this.settlementSuccess = false
      this.reload()
    },

    // 撤销结算
    async cancelSetl () {
      const { 定点药店编号, 药店名称, 药师编号, 职员名称 } =
        this.OrganizationAndPharmacist
      const res = await cancelSetl({
        hospitalNo: 定点药店编号, // 定点药店编码
        shopName: 药店名称, // 药店名称
        opter: 药师编号, // 药师编码
        opterName: 职员名称, // 药师名称
        orgNo: this.CardDetail.insuOrgNo, // 定点机构编码
        orderId: this.nowGuid, // 订单号
        billNo: this.serialnumber // 流水号
      })
      if (res.code === 0 && res.msg === 'success') {
        this.$message({
          message: '撤销结算成功',
          type: 'success'
        })
        this.recpaydialog = false
        this.reload()
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },

    // 退单流水号查询
    async searchByOverflow () {
      const res = await searchByOverflow(this.returnform)
      this.chargebackList = res.data
    },

    // 订单查询 退单 选择事件
    async chooseChargeback (val) {
      const {
        Guid,
        orgNo,
        membername,
        tele,
        idcardno,
        address,
        lvs,
        ywfr,
        BillType,
        BillNo,
        appguid,
        appdetailguid,
        id,
        Warehouseguid,
        notes
      } = val
      this.nowGuid = Guid // guid
      this.orgNo = orgNo // 定点机构编号
      this.conditionform.membername = membername // 会员名
      this.conditionform.tele = tele // 手机号
      this.conditionform.idcardno = idcardno // 身份证号
      this.conditionform.address = address // 地址
      this.conditionform.lvs = lvs // 旅居史
      this.conditionform.ywfr = ywfr // 发热
      this.conditionform.notes = notes
      this.isReturnGood = Number(BillType) // 单据状态
      this.serialnumber = BillNo + '_TH' // 流水号
      if (BillNo === '') {
        alert('当前订单流水号为空，请重新选择')
        return
      }

      try {
        // 点击单 查询退单子明细
        const res = await returnBackGuid({
          guid: this.nowGuid
        })
        if (res.code === 0 && res.msg === 'success') {
          this.oneChargeback = res.data
        }

        this.subtotal = 0
        this.data = this.oneChargeback.map((item, index) => {
          this.subtotal = (
            Number(this.subtotal) + Number('-' + item.amounttax)
          ).toFixed(2)
          return {
            货号: item.materielguid,
            药品国标码: item.xy_ybgbm,
            品名: item.PM,
            数量: Number('-' + item.singlequantity),
            零售价: item.discountprice,
            折后价: item.unitpricetax,
            金额: Number('-' + item.amounttax),
            批号: item.batchno,
            批次号: item.batchnumber,
            是否处方: item.SFCF,
            规格: item.GG,
            生产单位: item.SCDW,
            单位: item.PDW,
            billtype: BillType, // 单据状态
            personname: membername, // 会员名
            appguid: appguid,
            appdetailguid: appdetailguid,
            employeeid: item.employeeguid, // 营业员 //要先输入营业员在退单
            code1: localStorage.getItem('operatoId'), // 操作人员
            discountprice: item.discountprice, // 折前零售价
            discountrate: item.discountrate, // 折扣
            unitpricetax: item.unitpricetax, // 折后价
            billno: BillNo + '_TH', // 流水号
            originalno: BillNo,
            id: id, // 会员编号
            code: this.OrganizationAndPharmacist.定点药店编号, // 定点药店编号
            detailno: index + 1, // 序号
            stockid: Warehouseguid, // 仓库号
            billdate: this.$dealTime(Date.now()) + ' ' + '00:00:00',
            billtime: '1900-01-01' + ' ' + this.$minTime(Date.now()), // 时间
            chalkdate: this.$relTime(Date.now()),
            materielid: item.materielguid, // 货号
            amounttax: Number('-' + item.amounttax), // 子明细总金额
            auxquantity: Number('-' + item.auxquantity), // 数量
            singlequantity: Number('-' + item.singlequantity), // 数量
            batchno: item.batchno, // 批号
            batchnumber: item.batchnumber, // 批次号
            validdate: item.validdate, // 有效期
            costprice: item.costprice, // 成本价
            batchprice: item.batchprice, // 批次成本价
            batchdate: item.batchdate, // 生产日期
            medListCode: item.xy_ybgbm // 国标码
          }
        })
      } catch (error) {
        this.$message({
          type: 'error',
          message: '查询失败!'
        })
      }
    },

    // 处理时间格式
    dealTime (index) {
      if (index === 0) {
        this.returnform.beginDate = this.$dealTime(this.returnform.beginDate)
      } else {
        this.returnform.endDate = this.$dealTime(this.returnform.endDate)
      }
    }
  },

  created () {
    this.getOrganizationAndPharmacist()
    this.getOverFlow()
    // 键盘事件
    document.onkeydown = (e) => {
      const evn = e || event
      const key = evn.keyCode || evn.which || evn.charCode

      // pagedown pos收款
      if (key === 34) {
        if (this.serialnumber.indexOf('_TH') !== -1 && this.subtotal > 0) {
          alert('当前流水号为退单流水号,请手动刷新当前流水号！！！')
          return
        }
        this.shouldReceive = this.subtotal // 应收现金
        const stopIndex = this.data.findIndex(
          (item) => item.materielid === '91000'
        )
        if (stopIndex === -1) this.GenerateOutgoingList() // 91000不插入雨人
        this.getPaymentWay() // 获取支付方式
        if (this.data.length > 0) this.recpaydialog = true
      } else if (key === 38 && this.vip_search === true) {
        // vip
        this.vip_index--
        if (this.vip_index >= 0) {
          this.$refs.vip_table.setCurrentRow(this.vip_table[this.vip_index])
        } else {
          this.vip_index = 0
        }
      } else if (key === 40 && this.vip_search === true) {
        this.vip_index++
        this.$refs.vip_table.setCurrentRow(this.vip_table[this.vip_index])
      } else if (key === 13 && this.vip_search === true) {
        // 会员回车
        this.vipInfo = this.vip_table[this.vip_index]

        if (this.vip_table[this.vip_index].会员名称) {
          this.conditionform.membername =
            this.vip_table[this.vip_index].会员名称
        }
        if (this.vip_table[this.vip_index].身份证号) {
          this.conditionform.idcardno = this.vip_table[this.vip_index].身份证号
        }
        const values = Object.values(this.vip_table[this.vip_index])
        const newArr = [
          this.vip_table[this.vip_index]['会员名称'],
          this.vip_table[this.vip_index]['手机号'],
          this.vip_table[this.vip_index]['积分剩余']
        ]
        const aArr = Object.keys(this.vip_table[this.vip_index]).map(
          (item, index) => {
            if (item === '积分剩余') {
              return values[index]
            }
          }
        )
        this.conditionform.vipnamevalue = aArr.join(' ')
        this.conditionform.vipchooseInfo = newArr.join('_')
        this.vip_search = false
        this.$refs.vip.blur() // 失焦
        this.$nextTick(() => {
          this.$refs.salesperson.focus() // 聚焦营业员
        })
      } else if (key === 38 && this.choosedialog === true) {
        // 商品
        this.good_index--
        if (this.good_index >= 0) {
          this.$refs.good_table.setCurrentRow(this.good_table[this.good_index])
        } else {
          this.good_index = 0
        }
      } else if (key === 40 && this.choosedialog === true) {
        this.good_index++
        this.$refs.good_table.setCurrentRow(this.good_table[this.good_index])
      } else if (key === 13 && this.choosedialog === true) {
        // 商品回车
        this.selectedRow = this.good_table[this.good_index]
        this.retailprice = this.selectedRow.零售价
        this.conditionform.goodname = this.selectedRow.品名
        this.choosedialog = false
        this.$refs.goodname.blur() // 失焦
        setTimeout(() => {
          this.$refs.quantity.focus() // 先用着
        }, 10)
      } else if (key === 38 && this.salespersondialog === true) {
        // 营业员
        this.saleperson_index--
        if (this.saleperson_index >= 0) {
          this.$refs.salesperson_table.setCurrentRow(
            this.salesperson_table[this.saleperson_index]
          )
        } else {
          this.saleperson_index = 0
        }
      } else if (key === 40 && this.salespersondialog === true) {
        this.saleperson_index++
        this.$refs.salesperson_table.setCurrentRow(
          this.salesperson_table[this.saleperson_index]
        )
      } else if (key === 13 && this.salespersondialog === true) {
        this.conditionform.workername =
          this.salesperson_table[this.saleperson_index].职员编号
        this.conditionform.workernamevalue =
          this.salesperson_table[this.saleperson_index].职员名称
        this.salespersondialog = false
        this.$refs.goodname.focus()
      }
    }
  },
  watch: {
    // 修改数量
    quantity: function (newVal, oldVal) {
      if (this.quantity > this.selectedRow.库存数量 && this.conditionform.notes !== '11') {
        this.$message({
          type: 'error',
          message: '药品售卖数量不能大于库存数量!'
        })
        this.quantity = ''
      }
      // this.subtotal = (newVal * this.priceafterdiscount).toFixed(2)
    },

    // 零售价变化
    retailprice: function (newVal, oldVal) {
      this.discount = 100
      this.priceafterdiscount = (this.retailprice * this.discount) / 100
    },

    receiveform: {
      handler: function (newVal) {
        this.otherpayment = 0
        Object.values(newVal).forEach((item) => {
          this.otherpayment += Number(item)
        })

        if (this.shouldReceive - this.otherpayment >= 0) {
          // 应收现金
          this.cashreceivable = (
            this.shouldReceive - this.otherpayment
          ).toFixed(2)
        } else {
          this.receiveform = {}
        }
      },
      deep: true,
      immediate: false
    }
  },
  computed: {
    totalToFixed () {
      return Number(this.subtotal).toFixed(2)
    }
    // ...mapState(['OrganizationAndPharmacist'])
  },
  components: {
    'top-info': topInfo
    // 'change-password': changePassword
  }
}
</script>

<style lang="less" scoped>
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

// /deep/ .el-dialog__header {
//   padding: 0 0;
// }

// /deep/ .el-dialog__body {
//   padding: 10px 10px;
// }

.ccccc {
  display: flex;
  justify-content: space-between;

  .leftbox {
    width: 30vw;
    padding: 5px;
    margin-top: 10px;
    // border: 1px dashed #000;
  }

  .middlebox {
    width: 25vw;
    margin-top: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: mediumspringgreen;
    .el-button + .el-button {
      margin-left: 0;
      margin-top: 10px;
    }
  }

  .rightbox {
    width: 30vw;
    margin-top: 10px;
    text-align: right;
    .el-row {
      // margin-right: 8vw;
      margin-bottom: 0.5vw;
    }
  }
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
  display: flex;
  flex-direction: column;
}
</style>
