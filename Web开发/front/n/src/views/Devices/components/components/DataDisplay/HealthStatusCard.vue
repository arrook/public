<template>
  <a-card :title="title" class="health-status-card">
    <a-row :gutter="16">
      <a-col :span="8">
        <div class="health-metric">
          <div class="metric-value" :class="getHeartRateStatus(heartRate)">
            {{ heartRate || '--' }}
          </div>
          <div class="metric-label">心率 (bpm)</div>
          <div class="metric-range">正常: 60-230</div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="health-metric">
          <div class="metric-value" :class="getSPO2Status(spo2)">
            {{ spo2 ? `${spo2}%` : '--' }}
          </div>
          <div class="metric-label">血氧饱和度</div>
          <div class="metric-range">正常: ≥95%</div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="health-metric">
          <div class="metric-value" :class="getTempStatus(temperature)">
            {{ temperature ? `${temperature}°C` : '--' }}
          </div>
          <div class="metric-label">体温</div>
          <div class="metric-range">正常: 36-37.5°C</div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  heartRate?: number;
  spo2?: number;
  temperature?: number;
}

withDefaults(defineProps<Props>(), {
  title: '健康状态',
});

const getHeartRateStatus = (hr: number | undefined) => {
  if (!hr) return 'unknown';
  if (hr < 60 || hr > 100) return 'abnormal';
  return 'normal';
};

const getSPO2Status = (spo2: number | undefined) => {
  if (!spo2) return 'unknown';
  if (spo2 < 95) return 'abnormal';
  return 'normal';
};

const getTempStatus = (temp: number | undefined) => {
  if (!temp) return 'unknown';
  if (temp < 36 || temp > 37.5) return 'abnormal';
  return 'normal';
};
</script>

<style scoped>
.health-status-card {
  margin-bottom: 16px;
}

.health-metric {
  text-align: center;
  padding: 16px 0;
}

.metric-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.metric-value.normal {
  color: #52c41a;
}

.metric-value.abnormal {
  color: #f5222d;
}

.metric-value.unknown {
  color: #d9d9d9;
}

.metric-label {
  color: #666;
  font-size: 14px;
}

.metric-range {
  color: #999;
  font-size: 12px;
}
</style>