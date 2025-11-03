<template>
  <a-card size="small" title="电子围栏">
    <a-form-item>
      <a-switch v-model:checked="model.enabled" disabled />
      <span style="margin-left: 8px">启用围栏</span>
    </a-form-item>

    <template v-if="model.enabled">
      <a-form-item label="中心纬度">
        <a-input-number
          v-model:value="model.center_lat"
          :precision="6"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="中心经度">
        <a-input-number
          v-model:value="model.center_lon"
          :precision="6"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="半径 (米)">
        <a-input-number
          v-model:value="model.radius"
          :min="10"
          :max="5000"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="语音提醒">
        <a-input
          v-model:value="model.voice_text"
          placeholder="超出围栏时播放的语音内容"
          disabled
        />
      </a-form-item>

      <a-form-item label="语音编号">
        <a-select v-model:value="model.voice_music" disabled>
          <a-select-option :value="1">语音1</a-select-option>
          <a-select-option :value="2">语音2</a-select-option>
          <a-select-option :value="3">语音3</a-select-option>
        </a-select>
      </a-form-item>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GeoFenceConfig } from '@/types/config'

const props = defineProps<{
  modelValue: GeoFenceConfig
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: GeoFenceConfig): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>