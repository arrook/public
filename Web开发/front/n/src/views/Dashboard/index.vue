<template>
  <div class="dashboard">
    <a-row :gutter="16" class="stats-row">
      <a-col :span="6">
        <StatisticCard 
          title="总用户数" 
          :value="stats.totalUsers" 
          icon="user"
          color="#1890ff"
        />
      </a-col>
      <a-col :span="6">
        <StatisticCard 
          title="总设备数" 
          :value="stats.totalDevices" 
          icon="desktop"
          color="#52c41a"
        />
      </a-col>
      <a-col :span="6">
        <StatisticCard 
          title="在线设备" 
          :value="stats.onlineDevices" 
          icon="wifi"
          color="#13c2c2"
        />
      </a-col>
      <a-col :span="6">
        <StatisticCard 
          title="激活用户" 
          :value="stats.todayData" 
          icon="line-chart"
          color="#722ed1"
        />
      </a-col>
    </a-row>

    <a-row :gutter="16" class="charts-row">
      <a-col :span="12">
        <ChartCard title="设备在线状态">
          <PieChart :data="deviceStatusData" />
        </ChartCard>
      </a-col>
      <a-col :span="12">
        <ChartCard title="健康数据趋势">
          <LineChart :data="healthTrendData" />
        </ChartCard>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="24">
        <ChartCard title="实时数据监控">
          <RealTimeMonitor :devices="devices" />
        </ChartCard>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useDeviceStore } from '@/stores/device';
import { useAuthStore } from '@/stores/auth';
import { useAdminStore } from '@/stores/admin';
import type {DeviceInfo} from '@/types/device'

import StatisticCard from './components/DataDisplay/StatisticCard.vue';
import ChartCard from './components/Charts/ChartCard.vue';
import PieChart from './components/Charts/PieChart.vue';
import LineChart from './components/Charts/LineChart.vue';
import RealTimeMonitor from './components/Charts/RealTimeMonitor.vue';

const deviceStore = useDeviceStore()
const authStore = useAuthStore()
const adminStore = useAdminStore()
const stats = ref({
  totalUsers: 0,
  totalDevices: 0,
  onlineDevices: 0,
  todayData: 0,
});

const devices = ref<Array<DeviceInfo>>([]);

onMounted(async () => {
  await deviceStore.fetchDevices();
  await adminStore.fetchTotalUsers();
  updateStats();
});

const deviceStatusData = computed(() => [
  { value: deviceStore.onlineDevices.length,  name: '在线设备' },
  { value: deviceStore.offlineDevices.length, name: '离线设备' }
])

const healthTrendData = ref([
  { value: 0 }
])

function updateStats() {
  stats.value = {
    totalUsers: adminStore.activeUsers.length,
    totalDevices: deviceStore.devices.length,
    onlineDevices: deviceStore.onlineDevices.length,
    todayData: adminStore.deactiveUsers.length,
  };

  devices.value = deviceStore.devices
}

</script>

<style scoped>
.dashboard {
  padding: 24px;
}

.stats-row {
  margin-bottom: 24px;
}

.charts-row {
  margin-bottom: 24px;
}
</style>