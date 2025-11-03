<template>
  <a-layout class="layout">
    <!-- 顶部 Header -->
    <a-layout-header class="header">
      <Header />
    </a-layout-header>
    
    <a-layout>
      <!-- 左侧 Sidebar -->
      <a-layout-sider width="200" class="sider">
        <Sidebar />
      </a-layout-sider>
      
      <!-- 右侧内容区域 -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getProfile()
});

</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 0;
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sider {
  background: #fff;
}

.content {
  margin: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 112px);
  overflow: auto;
}
</style>