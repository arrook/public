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
  title: '饼图'
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      bottom: 0
    },
    series: [
      {
        name: '数据分布',
        type: 'pie',
        radius: '50%',
        data: props.data.length > 0 ? props.data : [
          { value: 0, name: '暂无数据' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {c} ({d}%)'
        }
      }
    ]
  }

  chart.setOption(option)
}
</script>