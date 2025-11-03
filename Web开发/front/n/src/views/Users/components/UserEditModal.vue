<template>
  <a-modal
    :open="open"

    title="编辑用户"
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
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="角色" name="role">
        <a-select v-model:value="formState.role">
          <a-select-option value="family">家属</a-select-option>
          <a-select-option value="nurse">护士</a-select-option>
          <a-select-option value="doctor">医生</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="真实姓名" name="real_name">
        <a-input v-model:value="formState.real_name" />
      </a-form-item>

      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item label="账户状态" name="is_active">
        <a-switch v-model:checked="formState.is_active" checked-children="启用" un-checked-children="禁用"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { UserInfo } from '@/types/auth'
import { useAdminStore } from '@/stores/admin'

interface Props {
  open: boolean
  user: UserInfo | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const adminAPI = useAdminStore()

const formRef = ref()
const confirmLoading = ref(false)

const formState = reactive({
  id: 0,
  username: '',
  role: 'family' as const,
  real_name: '',
  phone: '',
  email: '',
  is_active: true
})

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

watch(
  () => props.user,
  (user) => {
    if (user) {
      Object.keys(formState).forEach(key => {
        if (key in user) {
          // @ts-ignore
          formState[key] = user[key]
        }
      })
    }
  },
  { immediate: true }
)

const handleOk = async () => {
  try {
    await formRef.value.validate()
    confirmLoading.value = true
    
    // 调用更新用户API
    await adminAPI.update(formState)
    
    message.success('用户更新成功')
    emit('success')
    handleCancel()
  } catch (error) {
    console.error('更新用户失败:', error)
    message.error('更新用户失败')
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