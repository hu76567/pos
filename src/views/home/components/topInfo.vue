<!--  -->
<template>
  <div>
    <el-row class="organization">
      <span>定点机构编号 :{{ OrganizationAndPharmacist.定点药店编号 }}</span>
      <span>定点机构名称 : {{ OrganizationAndPharmacist.定点机构名 }}</span>
      <span>药师编码 : {{ OrganizationAndPharmacist.药师编号 }}</span>
      <span>药师名称 : {{ OrganizationAndPharmacist.职员名称 }}</span>
      <el-button
        type="danger"
        style="position: absolute; right: 0; top: 0"
        size="small"
        @click="loginout"
        >退出登录</el-button
      >
    </el-row>
    <el-row class="logininfo">
      <span>登录代码 : {{ loginInfo.职员编号 }}</span>
      <span>登录名称 : {{ loginInfo.职员名称 }}</span>
      <span>班次号 : {{ OrganizationAndPharmacist.班次号 }}</span>
      <span>会员信息 : {{ vipInfo }}</span>
    </el-row>
    <el-row class="orderstatus">
      <span
        >单据状态 :
        {{
          isReturnGood === 5 ? "售货状态" : isReturnGood === 7 ? "退货状态" : ""
        }}</span
      >
      <span>流水号 : {{ serialnumber }}</span>
    </el-row>
  </div>
</template>

<script>
import { searchEmp } from '@/api/api.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['OrganizationAndPharmacist'])
  },
  props: ['vipInfo', 'isReturnGood', 'serialnumber'],
  data () {
    return {
      loginInfo: {} // 班次和营业员
    }
  },

  methods: {
    // 查询当前人员班次
    async getOperatoId (operatoId) {
      const res = await searchEmp({
        DH: operatoId
      })
      this.loginInfo = res.data[0]
    },
    // 退出登录
    loginout () {
      this.$confirm('确定退出登录么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('operatoId')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  },
  created () {
    this.getOperatoId(localStorage.getItem('operatoId'))
  }
}
</script>
<style lang='less' scoped>
  .organization {
    span {
      margin-right: 3vw;
      color: #41a863;
      font-size: 18px;
      font-weight: 570;
    }
  }
  .logininfo {
    span {
      margin-right: 3vw;
      color: #409eff;
      font-size: 18px;
      font-weight: 570;
    }
  }
  .orderstatus {
    span {
      margin-right: 3vw;
      color: #ef4b00;
      font-size: 18px;
      font-weight: 570;
    }
  }
</style>
