<template>
  <div class="abnormal-detection">
    <a-list :data-source="abnormalData">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a-tag :color="getLevelColor(item.level)">{{ item.level }}</a-tag>
              {{ item.message }}
            </template>
            <template #description>
              {{ item.time }} - {{ item.device }}
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  data: any[]
}

const props = defineProps<Props>()

const abnormalData = ref([
  {
    level: '高危',
    message: '心率异常：150 bpm',
    time: '2024-01-15 14:30',
    device: '设备001'
  },
  {
    level: '中危',
    message: '血氧过低：92%',
    time: '2024-01-15 13:45',
    device: '设备002'
  },
  {
    level: '低危',
    message: '体温偏高：37.8°C',
    time: '2024-01-15 12:20',
    device: '设备003'
  }
])

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    '高危': 'red',
    '中危': 'orange',
    '低危': 'yellow'
  }
  return colors[level] || 'blue'
}
</script>