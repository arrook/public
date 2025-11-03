<template>
  <div class="profile-page">
    <a-page-header title="个人中心" sub-title="个人信息管理">
      <template #extra>
        <a-button type="primary" @click="showEditModal">编辑信息</a-button>
      </template>
    </a-page-header>

    <a-row :gutter="24">
      <a-col :span="8">
        <a-card title="基本信息">
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="用户名">
              {{ userInfo?.username || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="角色">
              <a-tag :color="getRoleColor(userInfo?.role)">
                {{ getRoleName(userInfo?.role) }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="真实姓名">
              {{ userInfo?.real_name || '未设置' }}
            </a-descriptions-item>
            <a-descriptions-item label="手机号">
              {{ userInfo?.phone || '未设置' }}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              {{ userInfo?.email || '未设置' }}
            </a-descriptions-item>
            <a-descriptions-item label="注册时间">
              {{ userInfo?.created_at ? formatTime(userInfo.created_at) : '-' }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>

      <a-col :span="16">
        <a-card title="操作记录" class="right-column-card"  style="margin-bottom: 16px">
          <a-timeline>
            <a-timeline-item v-for="log in processedOperationLogs" :key="log.id">
              {{ log.userName }} - {{ log.created_at }}
            </a-timeline-item>
          </a-timeline>
        </a-card>

        <a-card title="安全设置" class="right-column-card" >
          <a-list>
            <a-list-item>
              <a-list-item-meta title="更多信息...">
                <template #description>
                  更多信息...
                </template>
              </a-list-item-meta>
              <!-- <a-button type="link" @click="showDevicesModal">查看</a-button> -->
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>

    <ProfileEditModal 
      :open="editModalVisible"
      :user="userInfo"
      @update:open="setEditModalVisible"
      @success="handleUpdateSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatTime } from '@/utils/format'
import type { SystemLogInfo, UserInfo } from '@/types/auth'
import ProfileEditModal from './components/ProfileEditModal.vue'
import { parseJWT } from '@/utils/jwt'

// 定义角色枚举
enum UserRole {
  FAMILY = 'family',
  NURSE = 'nurse',
  DOCTOR = 'doctor'
}

// 角色配置映射
const ROLE_CONFIG: Record<UserRole, { name: string; color: string }> = {
  [UserRole.FAMILY]: { name: '家属', color: 'blue' },
  [UserRole.NURSE]: { name: '护士', color: 'green' },
  [UserRole.DOCTOR]: { name: '医生', color: 'red' }
}

const authStore = useAuthStore()
const editModalVisible = ref<boolean>(false)

// 使用计算属性获取用户信息
const userInfo = computed<UserInfo | null>(() => authStore.user)

// 操作日志数据
const operationLogs = ref<SystemLogInfo[]>()

// 获取角色名称
const getRoleName = (role: string | undefined): string => {
  if (!role) return '未知'
  return ROLE_CONFIG[role as UserRole]?.name || role
}

// 获取角色颜色
const getRoleColor = (role: string | undefined): string => {
  if (!role) return 'default'
  return ROLE_CONFIG[role as UserRole]?.color || 'default'
}

const processedOperationLogs = computed(() => {
  return operationLogs.value?.map(log => ({
    ...log,
    userName: log.token ? (parseJWT(log.token)?.sub || '未知用户') : '未知用户'
  })) || []
})

onMounted(async () => {
  // 组件挂载时不需要特殊处理，因为使用了计算属性
  const response = await authStore.getLog();
  operationLogs.value = response;
})

// 显示编辑模态框
const showEditModal = (): void => {
  editModalVisible.value = true
}

// 设置编辑模态框显示状态
const setEditModalVisible = (open: boolean): void => {
  editModalVisible.value = open
}

// 处理更新成功事件
const handleUpdateSuccess = (): void => {
  editModalVisible.value = false
  // 可以在这里刷新用户信息
  // authStore.getProfile()
}

// 显示修改密码模态框
const showPasswordModal = (): void => {
  // 显示修改密码弹窗
  console.log('显示修改密码弹窗')
}

// 显示设备管理模态框
const showDevicesModal = (): void => {
  // 显示设备管理弹窗
  console.log('显示设备管理弹窗')
}
</script>

<style scoped>
.profile-page {
  padding: 24px;
}

.fixed-height-col {
  height: 200px;
  overflow: auto;
}

.right-column-card {
  flex: 1;
  overflow-y: auto;
  max-height: 300px; /* 可选的最大高度 */
}
</style>