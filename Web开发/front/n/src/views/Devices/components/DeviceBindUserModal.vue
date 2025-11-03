<template>
  <div class="device-bind-user-static">
    <a-card title="绑定用户" style="max-width: 600px; margin: 0 auto;">
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

        <a-form-item>
          <a-button type="primary" @click="handleOk" :loading="loading">
            修改绑定
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { useAdminStore } from '@/stores/admin'
import { useDeviceStore } from '@/stores/device'
import type { UserInfo } from '@/types/auth'
import type { DeviceInfo } from '@/types/device'

const props = defineProps<{
  device: DeviceInfo
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const adminAPI = useAdminStore()
const deviceStore = useDeviceStore()

const formRef = ref<FormInstance | null>(null)
const loading = ref(false)
const users = ref<UserInfo[]>([])

const formState = ref({
  device_name: '',
  owner_id: undefined as number | undefined
})

const rules = {
  device_name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
  owner_id: [{ required: true, message: '请选择用户', trigger: 'change' }]
}

onMounted(async () => {
  formState.value.device_name = props.device.device_name
  formState.value.owner_id = props.device.owner_id || undefined
  await loadUsers()
})

const loadUsers = async () => {
  try {
    users.value = await adminAPI.fetchAllUsers()
  } catch (error) {
    message.error('加载用户列表失败')
  }
}

const handleOk = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    loading.value = true
    await deviceStore.updateDevice({
      device_name: formState.value.device_name,
      owner_id: formState.value.owner_id
    })
    message.success('绑定成功')
    emit('success')
  } catch (error) {
    message.error('绑定失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.device-bind-user-static {
  padding: 24px;
}
</style>