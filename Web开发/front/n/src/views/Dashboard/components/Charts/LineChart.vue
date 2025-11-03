<template>
  <div ref="chartRef" :style="{ height, width: '100%' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface Props {
  data: any[]
  height?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px',
  title: '折线图'
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
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['数据趋势'],
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
      boundaryGap: false,
      data: props.data.map((_, index) => `时间${index + 1}`)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '数据趋势',
        type: 'line',
        smooth: true,
        data: props.data.map(item => item.value || 0),
        itemStyle: {
          color: '#1890ff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
          ])
        }
      }
    ]
  }

  chart.setOption(option)
}
</script>