<template>
  <div ref="chartRef" :style="{ height: '400px', width: '100%' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface Props {
  data: any[]
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

watch(() => props.data, updateChart, { deep: true })

function updateChart() {
  if (!chart) return

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['心率', '血氧', '体温'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: [
      {
        type: 'value',
        name: '心率/体温',
        position: 'left'
      },
      {
        type: 'value',
        name: '血氧',
        position: 'right',
        min: 90,
        max: 100
      }
    ],
    series: [
      {
        name: '心率',
        type: 'line',
        data: [72, 75, 78, 70, 68, 76, 74],
        smooth: true,
        itemStyle: { color: '#f5222d' }
      },
      {
        name: '血氧',
        type: 'line',
        yAxisIndex: 1,
        data: [98, 97, 96, 98, 99, 97, 98],
        smooth: true,
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '体温',
        type: 'line',
        data: [36.5, 36.6, 36.7, 36.5, 36.4, 36.6, 36.5],
        smooth: true,
        itemStyle: { color: '#faad14' }
      }
    ]
  }

  chart.setOption(option)
}
</script>