<template>
  <a-card size="small" title="药盒提醒">
    <a-form-item>
      <a-switch v-model:checked="model.enabled" disabled />
      <span style="margin-left: 8px">启用提醒</span>
    </a-form-item>

    <template v-if="model.enabled">
      <a-form-item label="提醒时间 (小时)">
        <a-select
          v-model:value="model.reminder_times"
          mode="tags"
          placeholder="输入数字后回车，可多个"
        />
      </a-form-item>

      <a-form-item label="提醒持续 (秒)">
        <a-input-number
          v-model:value="model.reminder_duration"
          :min="30"
          :max="3600"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="漏服阈值 (秒)">
        <a-input-number
          v-model:value="model.miss_threshold"
          :min="60"
          :max="7200"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="语音内容">
        <a-input
          v-model:value="model.voice_text"
          placeholder="服药提醒语音内容"
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
import type { PillboxConfig } from '@/types/config'

const props = defineProps<{
  modelValue: PillboxConfig
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: PillboxConfig): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>