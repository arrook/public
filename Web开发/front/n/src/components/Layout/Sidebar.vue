<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :width="220"
    class="sidebar"
  >
    <router-link to="/" class="logo-link">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Logo" />
        <span v-if="!collapsed">医疗物联网</span>
      </div>
    </router-link>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      :items="menuItems"
      @click="handleMenuClick"
    />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import type { MenuProps } from 'ant-design-vue'
import { h } from 'vue'
import {
  DashboardOutlined,
  DesktopOutlined,
  TeamOutlined,
  BarChartOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const selectedKeys = ref<string[]>([])

const collapsed = computed(() => appStore.collapsed)

const menuItems = computed(() => {
  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: () => h(DashboardOutlined),
      label: '数据大屏',
    },
    {
      key: 'devices',
      icon: () => h(DesktopOutlined),
      label: '设备管理',
    },
  ]

  if (authStore.user?.role === 'doctor') {
    items.push({
      key: 'users',
      icon: () => h(TeamOutlined),
      label: '用户管理',
    })
  }

  items.push(
    // {
    //   key: 'analysis',
    //   icon: () => h(BarChartOutlined),
    //   label: '数据分析',
    // },
    {
      key: 'profile',
      icon: () => h(UserOutlined),
      label: '个人中心',
    }
  )

  return items
})

watch(
  () => route.name,
  (name) => {
    selectedKeys.value = [name as string]
  },
  { immediate: true }
)

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  router.push(`/${key}`)
}
</script>

<style scoped>
.sidebar {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid #434343;
}

.logo img {
  height: 32px;
  margin-right: 8px;
}

.logo span {
  font-size: 16px;
  white-space: nowrap;
}
</style>