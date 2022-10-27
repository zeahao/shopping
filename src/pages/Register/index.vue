<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">已有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <el-input
            class="input"
            v-model.lazy="user.phone"
            type="text"
            placeholder="输入手机号"
            size="default"
        />
        <span class="error-msg"
              v-if="!/^[1][3,4,5,7,8][0-9]{9}$/.test(user.phone) && user.phone !== ''">
          手机号格式错误
        </span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <el-input
            class="input"
            v-model.lazy="user.sendCode"
            placeholder="输入验证码"
            type="text"
            size="default"
        />
        <el-button type="info" round @click="getSendCode(user.phone)">获取验证码</el-button>
        <span class="error-msg" v-if="false">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <el-input
            class="input"
            v-model.lazy="user.password"
            type="password"
            placeholder="请输入密码"
            show-password
            size="default"
        />
        <span class="error-msg" v-if="user.password.length < 6">密码不能少于6位</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <el-input
            class="input"
            v-model="user.password1"
            type="password"
            placeholder="确认密码"
            show-password
        />
        <span class="error-msg"
              v-if="user.password !== user.password1 && user.password1 !== ''">
          密码不对劲
        </span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="user.agree">
        <span>同意协议并注册《校园购用户协议》</span>
        <span class="error-msg" v-if="false">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机校园购</li>
        <li>销售联盟</li>
        <li>校园购社区</li>
      </ul>
      <div class="address">地址：贵州工程应用技术学院公2 418</div>
      <div class="beian">xxxxxxxxxxxx号
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const user = reactive({
  phone: '',
  sendCode: '',
  password: '',
  password1: '',
  agree: true,
})

// 获取验证码
const getSendCode = async (phone) => {
  try {
    // 获取验证码并写入
    user.sendCode = await store.dispatch('user/getSendCode', phone);
  } catch (e) {
    alert(e.message)
  }
}

// 用户注册
const register = async () => {
  try {
    await store.dispatch('user/register', {
      phone: user.phone,
      password: user.password,
      code: user.sendCode
    })
    await router.push('login')
  } catch (e) {
    alert(e.message);
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      .input {
        margin-top: 0;
        height: 38px;
        left: 5px;
        width: 270px;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>