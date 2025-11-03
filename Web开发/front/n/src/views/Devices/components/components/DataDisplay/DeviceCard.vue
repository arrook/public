<template>
  <a-card class="device-card" :class="{ online: device.is_online }">
    <template #title>
      <div class="device-header">
        <desktop-outlined />
        <span class="device-name">{{ device.device_name }}</span>
        <a-tag :color="device.is_online ? 'green' : 'red'">
          {{ device.is_online ? '在线' : '离线' }}
        </a-tag>
      </div>
    </template>

    <div class="device-content">
      <div class="device-info">
        <div class="info-item">
          <span class="label">创建时间:</span>
          <span class="value">{{ formatTime(device.created_at) }}</span>
        </div>
        <div class="info-item">
          <span class="label">最后更新:</span>
          <span class="value">{{ formatTime(device.updated_at) }}</span>
        </div>
      </div>

      <div class="device-actions">
        <a-button type="link" size="small" @click="handleView">查看</a-button>
        <a-button type="link" size="small" @click="handleControl">控制</a-button>
        <a-button type="link" size="small" @click="handleConfig">配置</a-button>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import type { DeviceInfo } from '@/types'
import { formatTime } from '@/utils/format'

interface Props {
  device: DeviceInfo
}

const props = defineProps<Props>()

const emit = defineEmits<{
  view: [device: DeviceInfo]
  control: [device: DeviceInfo]
  config: [device: DeviceInfo]
}>()

const handleView = () => {
  emit('view', props.device)
}

const handleControl = () => {
  emit('control', props.device)
}

const handleConfig = () => {
  emit('config', props.device)
}
</script>

<style scoped>
.device-card {
  margin-bottom: 16px;
  transition: all 0.3s;
}

.device-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.device-card.online {
  border-left: 4px solid #52c41a;
}

.device-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.device-name {
  flex: 1;
  font-weight: 500;
}

.device-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.device-info {
  flex: 1;
}

.info-item {
  display: flex;
  margin-bottom: 4px;
}

.info-item .label {
  color: #666;
  margin-right: 8px;
  min-width: 80px;
}

.info-item .value {
  color: #333;
}

.device-actions {
  display: flex;
  gap: 4px;
}
</style>