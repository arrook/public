<template>
  <div ref="chartRef" :style="{ height, width: '100%' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface Props {
  data: any[]
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px',
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts

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

watch(() => props.data, updateChart, { deep: true })

function updateChart() {
  if (!chart) return

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['心率', '血氧', '体温'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.data.map((_, index) => `时间${index + 1}`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '心率',
        type: 'line',
        smooth: true,
        data: props.data.map(item => item.heartRate),
      },
      {
        name: '血氧',
        type: 'line',
        smooth: true,
        data: props.data.map(item => item.spo2),
      },
      {
        name: '体温',
        type: 'line',
        smooth: true,
        data: props.data.map(item => item.temperature),
      },
    ],
  }

  chart.setOption(option)
}
</script>