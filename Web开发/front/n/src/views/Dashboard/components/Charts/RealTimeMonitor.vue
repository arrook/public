<template>
  <div class="real-time-monitor">
    <a-row :gutter="16">
      <a-col :span="24">
        <div ref="chartRef" :style="{ height: '400px', width: '100%' }"></div>
      </a-col>
    </a-row>
    
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="8" v-for="device in devices" :key="device.device_name">
        <a-card size="small" :class="{ online: device.is_online }">
          <template #title>
            <desktop-outlined />
            {{ device.device_name }}
          </template>
          <a-tag :color="device.is_online ? 'green' : 'red'">
            {{ device.is_online ? '在线' : '离线' }}
          </a-tag>
          <div class="device-stats">
            <div>最后更新: {{ formatTime(device.updated_at) }}</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { DeviceInfo } from '@/types'
import { formatTime } from '@/utils/format'

interface Props {
  devices: DeviceInfo[]
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    updateChart()
  }
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
})

watch(() => props.devices, updateChart, { deep: true })

function updateChart() {
  if (!chart) return

  const onlineCount = props.devices.filter(d => d.is_online).length
  const offlineCount = props.devices.length - onlineCount

  const option = {
    title: {
      text: '设备状态监控',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: onlineCount, name: '在线设备', itemStyle: { color: '#52c41a' } },
          { value: offlineCount, name: '离线设备', itemStyle: { color: '#f5222d' } }
        ]
      }
    ]
  }

  chart.setOption(option)
}
</script>

<style scoped>
.real-time-monitor {
  padding: 16px;
}

.device-stats {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

:deep(.online) {
  border-left: 3px solid #52c41a;
}
</style>