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
  height: '300px'
})

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
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['在线', '离线'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: props.data.map(item => item.name)
    },
    series: [
      {
        name: '在线',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.online || 0),
        itemStyle: {
          color: '#52c41a'
        }
      },
      {
        name: '离线',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.offline || 0),
        itemStyle: {
          color: '#f5222d'
        }
      }
    ]
  }

  chart.setOption(option)
}
</script>