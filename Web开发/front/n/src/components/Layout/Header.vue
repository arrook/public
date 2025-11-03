<template>
  <a-layout-header class="header">
    <div class="header-left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="toggleCollapsed"
      />
      <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
    </div>

    <div class="header-right">
      <a-tooltip title="全屏">
        <fullscreen-outlined class="header-action" @click="toggleFullscreen" />
      </a-tooltip>
      
      <NotificationDrawer :open="drawerOpen" @close="drawerOpen = false"/>

      <a-tooltip title="消息">
        <div class="notification-icon" @click="showMessageDrawer">
          <bell-outlined class="header-action" />
          <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
        </div>
      </a-tooltip>

      <a-dropdown :trigger="['click']">
        <span class="user-info">
          <user-outlined />
          <span class="username">{{ user?.username }}</span>
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="handleProfile">
              <user-outlined /> 个人信息
            </a-menu-item>
            <!-- <a-menu-item @click="handleSettings">
              <setting-outlined /> 设置
            </a-menu-item> -->
            <a-menu-divider />
            <a-menu-item @click="handleLogout">
              <logout-outlined /> 退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useNotificationStore } from '@/stores/notification'
import NotificationDrawer from './NotificationDrawer.vue'
import screenfull from 'screenfull'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const notificationStore = useNotificationStore()

const drawerOpen = ref(false)
const user = computed(() => authStore.user)
const collapsed = computed(() => appStore.collapsed)
const unreadCount = computed(() => notificationStore.unreadCount)

const toggleCollapsed = () => {
  appStore.toggleCollapsed()
}

const toggleFullscreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const showMessageDrawer = () => {
  drawerOpen.value = true
}

const handleProfile = () => {
  router.push('/profile')
}

const handleSettings = () => {
  // 处理设置
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-action {
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
}

.header-action:hover {
  color: #1890ff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.user-info:hover {
  background: #f5f5f5;
}

.username {
  font-weight: 500;
}
</style>