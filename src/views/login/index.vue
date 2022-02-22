<template>
  <div class="login">
    <el-card class="login_card">
      <div class="title"></div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        style="margin-top: 20px"
      >
        <el-form-item prop="code" label="代码">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="口令">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '../../api/login.js'

export default {
  data () {
    return {
      // 定义表单数据对象
      loginForm: {
        code: '',
        password: ''
      },
      // 定义表单验证规则
      loginRules: {
        code: [
          { required: true, message: '代码不能为空' },
          {
            // 用正则来校验格式是否正确
            pattern: /^[a-zA-Z0-9_-]{1,16}$/, // 正则表达式
            message: '代码格式错误'
          }
        ],
        password: [
          { required: true, message: '密码不能为空' },
          {
            pattern: /^[a-zA-Z0-9_-]{1,16}$/,
            message: '口令格式错误'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate().then(async () => {
        // localStorage.setItem('operatoId', 'asdf')
        // this.$router.push('/home')
        const loading = this.$loading({
          lock: true,
          text: '登录中', // 加载时文字
          spinner: 'el-icon-loading', // 加载样式
          background: 'rgba(0, 0, 0, 0.7)' // 透明度
        })
        try {
          const res = await login(this.loginForm)
          loading.close()
          if (res.msg === '登陆成功' && res.code === 0) {
            localStorage.setItem('operatoId', this.loginForm.code)
            this.$router.push('/home')
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
            message: '服务器错误 , 请稍后再试'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // 毛玻璃效果
  &:before {
    // filter: blur(1px);
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url("../../assets/img/login_bg.jpg");
    background-size: cover;
  }
  .login_card {
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    border-color: transparent;
    width: 460px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 30px;
      }
    }
  }
  /deep/ .el-form-item__label {
    color: #fff;
  }
}
</style>
