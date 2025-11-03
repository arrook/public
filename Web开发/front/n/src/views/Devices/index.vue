<template>
  <div class="device-management">
    <a-page-header
      title="设备管理"
      sub-title="设备监控与管理"
    >
      <template #extra>
        <a-button type="primary" @click="showCreateModal" v-if="isDoctor">
          <template #icon><plus-outlined /></template>
          创建设备
        </a-button>
      </template>
    </a-page-header>

    <a-card>
      <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
        <a-tab-pane key="list" tab="设备列表">
          <DeviceList 
            :devices="devices"
            :loading="loading"
            @edit="handleEdit"
            @view="handleView"
            @delete="handleDelete"
          />
        </a-tab-pane>
        
        <a-tab-pane key="data" tab="数据监控" v-if="currentDevice">
          <DeviceDataMonitor :device="currentDevice" />
        </a-tab-pane>
        
        <a-tab-pane key="control" tab="设备控制" v-if="currentDevice">
          <DeviceControlPanel :device="currentDevice" />
        </a-tab-pane>
        
        <a-tab-pane key="config" tab="设备配置" v-if="currentDevice && isDoctor">
          <DeviceConfig :device="currentDevice" />
        </a-tab-pane>

        <a-tab-pane key="bind" tab="设备绑定" v-if="currentDevice && isDoctor">
          <DeviceBindUserModal :device="currentDevice" />
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <DeviceCreateModal 
      v-model:open="createModalVisible"

      @success="handleCreateSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useDeviceStore } from '@/stores/device';
import { useAuthStore } from '@/stores/auth';
import { useDataStore } from '@/stores/data';
import type { DeviceInfo } from '@/types/device';
import DeviceList from './components/DeviceList.vue';
import DeviceDataMonitor from './components/DeviceDataMonitor.vue';
import DeviceControlPanel from './components/DeviceControlPanel.vue';
import DeviceConfig from './components/DeviceConfig.vue';
import DeviceCreateModal from './components/DeviceCreateModal.vue';
import DeviceBindUserModal from './components/DeviceBindUserModal.vue'
import { useNotificationStore } from '@/stores/notification'

const route = useRoute()
const router = useRouter()


const deviceStore = useDeviceStore();
const authStore = useAuthStore();
const dataStore = useDataStore();
const notificationStore = useNotificationStore();

const activeTab = ref('list');
const createModalVisible = ref(false);
const currentDevice = ref<any>(null);
const loading = ref(false);

const isDoctor = computed(() => authStore.user?.role === 'doctor');
const devices = computed(() => deviceStore.devices);

// 监听设备变化，加载对应数据
watch(
  () => currentDevice.value,
  (newDevice) => {
    if (newDevice) {
      loadDeviceData(newDevice.device_name);
    }
  }
);

onMounted(async () => {
  await loadDevices()
  initFromQuery()
});

function initFromQuery() {
  const { deviceName } = route.query
  if (deviceName) {
    // 从列表里找到对应设备
    const target = devices.value.find(d => d.device_name === deviceName)
    if (target) {
      currentDevice.value = target
      activeTab.value = 'data'
    }
  }
}

async function loadDevices() {
  loading.value = true;
  try {
    await deviceStore.fetchDevices();
  } catch (error) {
    message.error('加载设备列表失败');
    console.error('加载设备失败:', error);
  } finally {
    loading.value = false;
  }
}

async function loadDeviceData(deviceName: string) {
  try {
    // 加载设备最新传感器数据
    await dataStore.fetchLatestSensorData(deviceName);
  } catch (error) {
    message.error('加载设备数据失败');
  }
}

function showCreateModal() {
  createModalVisible.value = true;
}

function handleCreateSuccess() {
  createModalVisible.value = false;
  loadDevices();
}

function handleEdit(device: DeviceInfo) {
  currentDevice.value = device;
  activeTab.value = 'bind';
}

function handleView(device: DeviceInfo) {
  currentDevice.value = device;
  activeTab.value = 'data';
}

async function handleDelete(device: DeviceInfo) {
  try {
    loading.value = true;
    await deviceStore.deleteDevice(device.device_name);
    
    // 如果删除的是当前正在查看的设备，重置状态
    if (currentDevice.value && currentDevice.value.device_name === device.device_name) {
      currentDevice.value = null;
      activeTab.value = 'list';
    }
    
    message.success('设备删除成功');
    notificationStore.addNotification({
      type: 'success',
      title: '设备删除成功',
      message: `已成功删除设备 ${device.device_name}`
    })
  } catch (error) {
    message.error('设备删除失败');
  } finally {
    loading.value = false;
  }
}

function handleTabChange(key: string) {
  // 当切换到列表页时可以清空当前设备
  if (key === 'list') {
    currentDevice.value = null;
  }
}

</script>