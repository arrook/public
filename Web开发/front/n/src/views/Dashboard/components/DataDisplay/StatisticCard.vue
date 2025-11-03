<template>
  <a-card class="statistic-card">
    <a-statistic
      :title="title"
      :value="value"
      :precision="precision"
      :value-style="valueStyle"
      :prefix="prefix"
      :suffix="suffix"
    />
    <div class="statistic-footer">
      <span :class="trendClass">
        <caret-up-outlined v-if="trend === 'up'" />
        <caret-down-outlined v-else />
        {{ trendValue }}
      </span>
      <span class="footer-text">{{ footerText }}</span>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

interface Props {
  title: string
  value: number
  precision?: number
  prefix?: string
  suffix?: string
  trend?: 'up' | 'down'
  trendValue?: string
  footerText?: string
}

const props = withDefaults(defineProps<Props>(), {
  precision: 0,
  trend: 'up',
  trendValue: '0%',
  footerText: '',
})

const valueStyle = computed(() => ({
  color: props.trend === 'up' ? '#3f8600' : '#cf1322',
}))

const trendClass = computed(() => [
  'trend',
  props.trend === 'up' ? 'trend-up' : 'trend-down',
])
</script>

<style lang="scss" scoped>
.statistic-card {
  :deep(.ant-card-body) {
    padding: 20px;
  }
}

.statistic-footer {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
}

.trend-up {
  color: #3f8600;
}

.trend-down {
  color: #cf1322;
}

.footer-text {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
</style>