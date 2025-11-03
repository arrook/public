<template>
  <div class="device-config">
    <!-- 原来的 tabs -->
    <a-tabs>
      <a-tab-pane
        v-for="(cfg, key) in draftConfig"
        :key="key"
        :tab="key"
      >
        <!-- 1. 把配置双向绑定到本地草稿 -->
        <ConfigNode v-model="draftConfig[key]" :moduleKey="key" />
      </a-tab-pane>
    </a-tabs>

    <!-- 2. 底部保存栏 -->
    <a-affix :offsetBottom="24">
      <div class="config-actions">
        <a-button
          type="primary"
          :loading="saving"
          @click="handleSave"
        >
          保存并下发配置
        </a-button>
        <a-button style="margin-left: 8px" @click="handleReset">
          重置
        </a-button>
      </div>
    </a-affix>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useConfigStore } from '@/stores/config'
import type { DeviceInfo } from '@/types/device'
import type { DeviceConfigData } from '@/types/config'
import ConfigNode from './components/Config/ConfigNode.vue'

const props = defineProps<{ device: DeviceInfo }>()

/* -------------- 数据 -------------- */
const originalConfig = ref<DeviceConfigData>({})
const draftConfig    = ref<DeviceConfigData>({})
const saving         = ref(false)

const configStore = useConfigStore()

const load = async () => {
  const res = await configStore.fetchDeviceConfig(props.device.device_name)
  originalConfig.value = res?.config_data || {}
  draftConfig.value    = JSON.parse(JSON.stringify(originalConfig.value))
}

const emit = defineEmits<{
  saved: [data: DeviceConfigData]
}>()

onMounted(async () => {
  await load()
})

const handleSave = async () => {
  saving.value = true
  try {
    await configStore.updateDeviceConfig(props.device.device_name, {
      device_name: props.device.device_name,
      config_data: draftConfig.value
    })
    originalConfig.value = JSON.parse(JSON.stringify(draftConfig.value))
    message.success('配置已保存并下发')
    emit('saved', draftConfig.value)
  } catch (e) {
    message.error('保存失败：' + (e as Error).message)
  } finally {
    saving.value = false
  }
}

// 重置
const handleReset = async () => {
  await configStore.deaultDeviceConfig(props.device.device_name)
  await load()
  message.info('已重置为 server 版本')
}
</script>

<style scoped>
.config-actions {
  text-align: right;
  padding: 12px 0;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
</style>