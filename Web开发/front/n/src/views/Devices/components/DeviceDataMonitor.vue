<template>
  <div class="device-data-monitor">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="实时数据">
          <RealTimeChart :data="sensorData" />
        </a-card>
      </a-col>
    </a-row>
    
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="8">
        <HealthStatusCard
          :heart-rate="latestData?.sensor_data?.max30102?.heart_rate"
          :spo2="latestData?.sensor_data?.max30102?.spo2"
          :temperature="latestData?.sensor_data?.dht11?.temperature"
        />
      </a-col>
      <a-col :span="16">
        <a-card title="传感器数据详情">
          <a-descriptions :column="2" bordered>
            <a-descriptions-item label="心率">
              {{ latestData?.sensor_data?.max30102?.heart_rate || '--' }} bpm
            </a-descriptions-item>
            <a-descriptions-item label="血氧">
              {{ latestData?.sensor_data?.max30102?.spo2 || '--' }} %
            </a-descriptions-item>
            <a-descriptions-item label="温度">
              {{ latestData?.sensor_data?.dht11?.temperature || '--' }} °C
            </a-descriptions-item>
            <a-descriptions-item label="湿度">
              {{ latestData?.sensor_data?.dht11?.humidity || '--' }} %
            </a-descriptions-item>
            <a-descriptions-item label="体温">
              {{ latestData?.sensor_data?.ds18b20?.temperature?.toFixed(2) || '--' }} °C
            </a-descriptions-item>
            <a-descriptions-item label="--">
              --
            </a-descriptions-item>
            <a-descriptions-item label="经度">
              {{ latestData?.sensor_data?.gps?.longitude?.toFixed(5) || '--' }} - E
            </a-descriptions-item>
            <a-descriptions-item label="维度">
              {{ latestData?.sensor_data?.gps?.latitude?.toFixed(5) || '--' }} - N
            </a-descriptions-item>
            <a-descriptions-item label="海拔">
              {{ latestData?.sensor_data?.gps?.altitude?.toFixed(5) || '--' }} - m
            </a-descriptions-item>
            <a-descriptions-item label="--">
              --
            </a-descriptions-item>
            <a-descriptions-item label="加速度  ±2 g">
              {{ norm(latestData?.sensor_data?.mpu6050?.ax, latestData?.sensor_data?.mpu6050?.ay, latestData?.sensor_data?.mpu6050?.az) || '--' }} g
            </a-descriptions-item>
            <a-descriptions-item label="角速度  ±250 °/s">
              {{ norm(latestData?.sensor_data?.mpu6050?.gx, latestData?.sensor_data?.mpu6050?.gy, latestData?.sensor_data?.mpu6050?.gz) || '--' }} °/s
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { DeviceInfo, SensorDataInfo } from '@/types'
import RealTimeChart from './components/Charts/RealTimeChart.vue'
import HealthStatusCard from './components/DataDisplay/HealthStatusCard.vue'
import { useDataStore } from '@/stores/data'


interface Props {
  device: DeviceInfo
}

const props = defineProps<Props>()

const dataStore = useDataStore()
const sensorData = ref<SensorDataInfo[]>([])
const latestData = ref<SensorDataInfo | null | undefined>(null)

// watch(
//   () => props.device,
//   () => {
//     loadSensorData()
//   }
// )

const norm = (x: number | undefined, y: number | undefined, z: number | undefined) => {
  if (!x || !y || !z) return '--'
  return Math.hypot(x, y, z)?.toFixed(5);   // = √(x²+y²+z²)
}


let timer: number | null = null
let maxTry = 5

const loadSensorData = async () => {
  try {
    const response = await dataStore.fetchSensorData(props.device.device_name, { limit: 2 })
    if (response && response[0]) {
      sensorData.value.push(...response)
      latestData.value = response[0]

      if (sensorData.value.length > 200) {
        sensorData.value = sensorData.value.slice(-200);
      }
    }
    timer = window.setTimeout(loadSensorData, 2500)
  } catch (error) {
    console.error(error)
    if( maxTry-- < 0) return;
    timer = window.setTimeout(loadSensorData, 5000)
  } finally {}
}

onMounted(loadSensorData) 
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.device-data-monitor {
  padding: 16px;
}
</style>