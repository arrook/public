<template>
  <a-modal
    :open="open"

    title="编辑个人信息"
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

      <a-form-item label="真实姓名" name="real_name">
        <a-input v-model:value="formState.real_name" />
      </a-form-item>

      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { UserInfo } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'

interface Props {
  open: boolean
  user: UserInfo | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const authStore = useAuthStore()

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formRef = ref()
const confirmLoading = ref(false)

const formState = reactive({
  id: props.user?.id || 0,
  username: props.user?.username || '',
  real_name: props.user?.real_name || '',
  phone: props.user?.phone || '',
  email: props.user?.email || ''
})

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
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
    
    await authStore.update(formState)
    
    message.success('更新成功')
    emit('success')
    handleCancel()
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