<template>
  <a-modal
    :open="open"

    title="用户注册"
    width="500px"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    @update:open="handleVisibleChange"

  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" placeholder="请输入用户名" autocomplete="username">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" autocomplete="new-password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="formState.confirmPassword" placeholder="请确认密码" autocomplete="new-password">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item label="角色" name="role">
        <a-select v-model:value="formState.role" placeholder="请选择角色">
          <a-select-option value="family">家属</a-select-option>
          <a-select-option value="nurse">护士</a-select-option>
          <a-select-option value="doctor">医生</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="真实姓名" name="real_name">
        <a-input v-model:value="formState.real_name" placeholder="请输入真实姓名" />
      </a-form-item>

      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" placeholder="请输入手机号" />
      </a-form-item>

      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useAuthStore } from '@/stores/auth'

interface Props {
  open: boolean
}

const router = useRouter()
const authStore = useAuthStore()

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formRef = ref()
const confirmLoading = ref(false)

enum Role {
  family = 'family',
  nurse = 'nurse',
  doctor = 'doctor'
}

const formState = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: Role.family,
  real_name: '',
  phone: '',
  email: ''
})

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else if (value.length < 6) {
    return Promise.reject('密码长度不能少于6位')
  } else {
    return Promise.resolve()
  }
}

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请确认密码')
  } else if (value !== formState.password) {
    return Promise.reject('两次输入的密码不一致')
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'change' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'change' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

const handleOk = async () => {
  try {
    await formRef.value.validate()
    confirmLoading.value = true
    
    await authStore.register(formState)
    
    message.success('注册成功')
    emit('success')
    handleCancel()
    router.push('/dashboard')
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    confirmLoading.value = false
  }
}

const handleCancel = () => {
  formRef.value.resetFields()
  emit('update:open', false)
}

const handleVisibleChange = (open: boolean) => {
  emit('update:open', open)
}
</script>