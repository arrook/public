<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h1>医疗物联网平台</h1>
        <p>智能健康监测管理系统</p>
      </div>

      <a-form
        :model="formState"
        name="login"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" size="large" placeholder="用户名" autocomplete="username">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" size="large" placeholder="密码" autocomplete="new-password">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button 
            type="primary" 
            html-type="submit" 
            size="large" 
            :loading="loading"
            block
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-footer">
        <p>还没有账号？<a @click="showRegister">立即注册</a></p>
      </div>
    </div>

    <RegisterModal 
      :open="registerVisible"

      @update:open="setRegisterVisible"

      @success="handleRegisterSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import RegisterModal from './components/RegisterModal.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const registerVisible = ref(false)

const formState = reactive({
  username: '',
  password: '',
})

const onFinish = async (values: any) => {
  loading.value = true
  try {
    await authStore.login(values.username, values.password)
    message.success('登录成功')
    router.push('/dashboard')
  } catch (error: any) {
    message.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

const showRegister = () => {
  registerVisible.value = true
}

const setRegisterVisible = (open: boolean) => {
  registerVisible.value = open
}

const handleRegisterSuccess = () => {
  registerVisible.value = false
  message.success('注册成功，请登录')
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  margin: 0 0 8px 0;
  color: #1890ff;
}

.login-header p {
  margin: 0;
  color: #666;
}

.login-footer {
  text-align: center;
  margin-top: 16px;
}
</style>