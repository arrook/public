<template>
  <div class="analysis-page">
    <a-page-header title="数据分析" sub-title="健康数据深度分析">
      <template #extra>
        <a-range-picker @change="onDateChange" />
        <a-select v-model:value="analysisType" style="width: 200px">
          <a-select-option value="health">健康指标分析</a-select-option>
          <a-select-option value="device">设备使用分析</a-select-option>
          <a-select-option value="trend">趋势分析</a-select-option>
        </a-select>
      </template>
    </a-page-header>

    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="健康数据趋势">
          <HealthTrendChart :data="healthData" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="12">
        <a-card title="异常检测">
          <AbnormalDetection :data="abnormalData" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="设备使用统计">
          <DeviceUsageChart :data="deviceUsageData" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HealthTrendChart from './components/HealthTrendChart.vue'
import AbnormalDetection from './components/AbnormalDetection.vue'
import DeviceUsageChart from './components/DeviceUsageChart.vue'
import type { HealthDataItem, AbnormalItem, DeviceUsageItem } from '@/types/data'
import { dataAPI } from '@/api/data'

const analysisType = ref('health')
const healthData = ref<HealthDataItem[]>([])
const abnormalData = ref<AbnormalItem[]>([])
const deviceUsageData = ref<DeviceUsageItem[]>([])

const onDateChange = async (dates: [Date, Date] | null) => {
  if (dates) {
    const [start, end] = dates;
    try {
      // 根据分析类型获取对应数据
      if (analysisType.value === 'health') {
        healthData.value = await dataAPI.getHealthTrendData({
          start_time: start.toISOString(),
          end_time: end.toISOString()
        });
      } else if (analysisType.value === 'device') {
        deviceUsageData.value = await dataAPI.getDeviceUsageData({
          start_time: start.toISOString(),
          end_time: end.toISOString()
        });
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  }
}
</script>

<style scoped>
.analysis-page {
  padding: 24px;
}
</style>