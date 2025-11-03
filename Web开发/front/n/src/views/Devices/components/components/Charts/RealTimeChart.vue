<template>
  <div class="real-time-chart">
    <div ref="chartRef" :style="{ height: height, width: '100%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

interface Props {
  data: any[];
  height?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '400px',
  title: '数据',
});

const chartRef = ref<HTMLElement>();
let chart: echarts.ECharts;

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value);
    updateChart();
  }
});

onUnmounted(() => {
  if (chart) {
    chart.dispose();
  }
});

watch(() => props.data, updateChart, { deep: true });

function updateChart() {
  if (!chart) return;

  const option = {
    title: {
      text: props.title,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['心率', '血氧', '温度'],
    },
    xAxis: {
      type: 'category',
      data: props.data.map(item => 
        new Date(item.created_at).toLocaleTimeString()
      ),
    },
    yAxis: [
      {
        type: 'value',
        name: '心率',
        min: 0,
        max: 200,
      },
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 50,
      },
    ],
    series: [
      {
        name: '心率',
        type: 'line',
        data: props.data.map(item => 
          item.sensor_data.max30102?.heart_rate
        ),
        smooth: true,
      },
      {
        name: '血氧',
        type: 'line',
        // yAxisIndex: 1,
        data: props.data.map(item => 
          item.sensor_data.max30102?.spo2
        ),
        smooth: true,
      },
      {
        name: '温度',
        type: 'line',
        yAxisIndex: 1,
        data: props.data.map(item => 
          item.sensor_data.dht11?.temperature
        ),
        smooth: true,
      },
    ],
  };

  chart.setOption(option);
}
</script>