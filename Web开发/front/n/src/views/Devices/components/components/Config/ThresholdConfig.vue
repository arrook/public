<template>
  <a-form-item>
    <a-switch v-model:checked="model.enabled" disabled />
    <span style="margin-left: 8px">{{ label }}</span>
  </a-form-item>
  <div v-if="model.enabled" style="margin-left: 24px;">
    <a-input-number v-model:value="model.min" placeholder="最小值" style="width: 120px" />
    <a-input-number
      v-if="!hideMax"
      v-model:value="model.max"
      placeholder="最大值"
      style="width: 120px; margin-left: 8px"
    />
    <a-input
      v-model:value="model.voice_text"
      placeholder="语音提醒内容"
      style="margin-top: 8px"
      disabled
    />
    <a-select v-model:value="model.voice_music" style="width: 120px; margin-top: 8px" disabled>
      <a-select-option :value="1">语音1</a-select-option>
      <a-select-option :value="2">语音2</a-select-option>
      <a-select-option :value="3">语音3</a-select-option>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: any
  label: string
  hideMax?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>