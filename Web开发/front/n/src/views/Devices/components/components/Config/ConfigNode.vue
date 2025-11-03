<template>
  <div>
    <!-- max30102 -->
    <template v-if="moduleKey === 'max30102'">
      <a-form-item label="采样周期 (ms)">
        <a-input-number v-model:value="config.sample_period" :min="10" :max="1000" disabled/>
      </a-form-item>
      <ThresholdConfig v-model="config.heart_rate" label="心率监测" />
      <ThresholdConfig v-model="config.spo2" label="血氧监测" :hideMax="true" />
    </template>

    <!-- dht11 -->
    <template v-else-if="moduleKey === 'dht11'">
      <a-form-item label="采样周期 (ms)">
        <a-input-number v-model:value="config.sample_period" :min="100" :max="5000" disabled/>
      </a-form-item>
      <ThresholdConfig v-model="config.temperature" label="温度监测" />
      <ThresholdConfig v-model="config.humidity" label="湿度监测" />
    </template>

    <!-- ds18b20 -->
    <template v-else-if="moduleKey === 'ds18b20'">
      <a-form-item label="采样周期 (ms)">
        <a-input-number v-model:value="config.sample_period" :min="100" :max="5000" />
      </a-form-item>
      <ThresholdConfig v-model="config.temperature" label="温度监测" />
    </template>

    <!-- mpu6050 -->
    <template v-else-if="moduleKey === 'mpu6050'">
      <a-form-item label="采样周期 (ms)">
        <a-input-number v-model:value="config.sample_period" :min="50" :max="1000" disabled/>
      </a-form-item>
      <a-form-item label="加速度计量程">
        <a-select v-model:value="config.accel_range" disabled>
          <a-select-option :value="0">±2g</a-select-option>
          <a-select-option :value="1">±4g</a-select-option>
          <a-select-option :value="2">±8g</a-select-option>
          <a-select-option :value="3">±16g</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="陀螺仪量程">
        <a-select v-model:value="config.gyro_range" disabled>
          <a-select-option :value="0">±250°/s</a-select-option>
          <a-select-option :value="1">±500°/s</a-select-option>
          <a-select-option :value="2">±1000°/s</a-select-option>
          <a-select-option :value="3">±2000°/s</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数字低通滤波器">
        <a-select v-model:value="config.dlpf" disabled>
          <a-select-option :value="0">260Hz</a-select-option>
          <a-select-option :value="1">184Hz</a-select-option>
          <a-select-option :value="2">94Hz</a-select-option>
          <a-select-option :value="3">44Hz</a-select-option>
        </a-select>
      </a-form-item>
      <ThresholdConfig v-model="config.fall_detection" label="跌倒检测" :hideMax="true" />
    </template>

    <!-- gps -->
    <template v-else-if="moduleKey === 'gps'">
      <a-form-item label="采样周期 (ms)">
        <a-input-number v-model:value="config.sample_period" :min="100" :max="10000" disabled/>
      </a-form-item>
      <GeoFenceConfig v-model="config.fence" />
    </template>

    <!-- relay -->
    <template v-else-if="moduleKey === 'relay'">
      <PillboxConfig v-model="config.pillbox" />
    </template>

    <!-- syn6288 -->
    <template v-else-if="moduleKey === 'syn6288'">
      <StartTextConfig v-model="config.start_text" />
    </template>

    <!-- rgb_led -->
    <template v-else-if="moduleKey === 'rgb_led'">
      <a-empty description="RGB LED 无需配置" />
    </template>

    <template v-else>
      <a-empty description="未知模块" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DeviceConfigData } from '@/types/config'
import ThresholdConfig from './ThresholdConfig.vue'
import GeoFenceConfig from './GeoFenceConfig.vue'
import PillboxConfig from './PillboxConfig.vue'
import StartTextConfig from './StartTextConfig.vue'

const props = defineProps<{
  moduleKey: string
  modelValue: any
}>()

const emit = defineEmits<{
  'update:modelValue': [val: any]
}>()

// 内部使用 computed 做双向绑定
const config = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

</script>