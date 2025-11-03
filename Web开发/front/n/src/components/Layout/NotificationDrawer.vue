<template>
  <a-drawer
    :open="props.open"
    title="消息中心"
    placement="right"
    width="400"
    @close="emit('close')"
  >
    <a-spin :spinning="loading">
      <a-empty v-if="notifications.length === 0" description="暂无消息" />
      <a-list
        v-else
        bordered
        :data-source="notifications"
        style="max-height: calc(100vh - 160px); overflow-y: auto"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <div class="meta">
                  <span>{{ item.title }}</span>
                  <a-tag :color="colorMap[item.type]">{{ item.type }}</a-tag>
                </div>
              </template>
              <template #description>
                <div>
                  <div>{{ item.message }}</div>
                  <div class="time">{{ formatTime(item.timestamp) }}</div>
                </div>
              </template>
            </a-list-item-meta>

            <template #actions>
              <a v-if="!item.read" @click="markRead(item.id)">标为已读</a>
              <a @click="remove(item.id)">删除</a>
            </template>
          </a-list-item>
        </template>
      </a-list>

      <div class="footer">
        <a-button size="small" @click="markAllRead">全部标为已读</a-button>
        <a-button size="small" danger @click="clearAll">清空</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const notificationStore = useNotificationStore()
const loading = computed(() => false) // 如需异步再改
const notifications = computed(() => notificationStore.notifications)

const colorMap: Record<string, string> = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
}

const formatTime = (d: Date) => dayjs(d).fromNow()

const markRead = (id: string) => notificationStore.markAsRead(id)
const remove = (id: string) => notificationStore.removeNotification(id)
const markAllRead = () => notificationStore.markAllAsRead()
const clearAll = () => notificationStore.clearAllNotifications()
</script>

<style scoped>
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
</style>