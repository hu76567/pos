<!-- 修改医保密码 -->
<template>
  <el-dialog
    :visible.sync="isShow"
    modal
    width="500px"
    append-to-body
    top="16vw"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @closed="dialogClose"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="90px">
      <el-form-item label="原密码 :" prop="originalPassword">
        <el-input
          type="password"
          v-model="form.originalPassword"
          placeholder="请输入原密码"
          style="width: 350px"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="新密码 :" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          placeholder="请输入新密码"
          style="width: 350px"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码 :" prop="checkPassword">
        <el-input
          v-model="form.checkPassword"
          placeholder="请再次输入新密码"
          style="width: 350px"
          show-password
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="info" plain size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { changePassword } from '@/api/api.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(rule)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      form: {
        originalPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        originalPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '长度为 6 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '长度为 6 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '长度为 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    dialogClose () {
      this.form = {}
    },
    reset () {
      this.form = {}
    },
    submit () {
      this.$refs.form.validate().then(async () => {
        try {
          const res = await changePassword()
          console.log(res)
        } catch (error) {

        }

        console.log('校验成功')
      })
    }
  },
  created () {
    eventBus.$on('changePassword', () => {
      this.isShow = true
    })
  }
}
</script>
<style lang='less' scoped>
</style>
