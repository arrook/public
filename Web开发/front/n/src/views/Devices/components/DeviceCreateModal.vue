<template>
  <a-modal
    :open="open"

    title="创建设备"
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
      <a-form-item label="设备名称" name="device_name">
        <a-input v-model:value="formState.device_name" placeholder="请输入设备名称" />
      </a-form-item>
      
      <a-form-item label="绑定用户" name="owner_id">
        <a-select v-model:value="formState.owner_id" placeholder="请选择绑定用户" allow-clear>
          <a-select-option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.username }} ({{ user.real_name }})
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { UserInfo } from '@/types/auth'
import { useAdminStore } from '@/stores/admin'
import { useDeviceStore } from '@/stores/device'
import { useConfigStore } from '@/stores/config'

const deviceAPI = useDeviceStore()
const adminAPI = useAdminStore()
const configAPI = useConfigStore()

interface Props {
  open: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formRef = ref()
const confirmLoading = ref(false)
const users = ref<UserInfo[]>([])

const formState = reactive({
  device_name: '',
  owner_id: undefined as number | undefined
})

const rules: Record<string, Rule[]> = {
  device_name: [
    { required: true, message: '请输入设备名称', trigger: 'blur' }
  ]
}

onMounted(() => {
  loadUsers()
})

const loadUsers = async () => {
  try {
    // 调用获取用户列表API
    users.value = await adminAPI.fetchAllUsers()
  } catch (error) {
    console.error('加载用户列表失败:', error)
  }
}

const handleOk = async () => {
  try {
    await formRef.value.validate()
    confirmLoading.value = true
    
    // 调用创建设备API
    await deviceAPI.createDevice(formState)
    
    message.success('设备创建成功')
    emit('success')
    handleCancel()
  } catch (error) {
    message.error('创建设备失败');
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