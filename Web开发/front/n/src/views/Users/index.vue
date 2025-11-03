<template>
  <div class="user-management">
    <a-page-header
      title="用户管理"
      sub-title="用户信息与权限管理"
    >
      <template #extra>
        <a-button type="primary" @click="showCreateModal">
          <template #icon><user-add-outlined /></template>
          新增用户
        </a-button>
      </template>
    </a-page-header>
    
    <a-card>
      <a-table
        :columns="columns"
        :data-source="users"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'role'">
            <a-tag :color="getRoleColor(record.role)">
              {{ getRoleName(record.role) }}
            </a-tag>
          </template>
          
          <template v-else-if="column.key === 'status'">
            <a-badge :status="record.is_active ? 'success' : 'error'" />
            {{ record.is_active ? '活跃' : '禁用' }}
          </template>
          
          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button size="small" @click="handleEdit(record)">编辑</a-button>
              <a-button size="small" @click="handleViewDevices(record)">设备</a-button>
              <a-popconfirm
                title="确定删除这个用户吗？"
                @confirm="handleDelete(record)"
              >
                <a-button size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <UserCreateModal 
      :open="createModalVisible"
      @update:open="setCreateModalVisible"
      @success="handleCreateSuccess"
    />
    
    <UserEditModal 
      :open="editModalVisible"
      :user="editingUser"
      @update:open="setEditModalVisible"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { UserAddOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UserInfo } from '@/types/auth'
import { useUserStore } from '@/stores/user'
import { useDeviceStore } from '@/stores/device'
import UserCreateModal from './components/UserCreateModal.vue'
import UserEditModal from './components/UserEditModal.vue'
import { useNotificationStore } from '@/stores/notification'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const deviceStroe = useDeviceStore()

// 定义角色枚举类型
enum UserRole {
  FAMILY = 'family',
  NURSE = 'nurse',
  DOCTOR = 'doctor'
}

// 定义角色映射对象
const ROLE_CONFIG: Record<UserRole, { name: string; color: string }> = {
  [UserRole.FAMILY]: { name: '家属', color: 'blue' },
  [UserRole.NURSE]: { name: '护士', color: 'green' },
  [UserRole.DOCTOR]: { name: '医生', color: 'red' }
}

const userStore = useUserStore()
const notificationStore = useNotificationStore()

const users = ref<UserInfo[]>([])
const loading = ref(false)
const createModalVisible = ref(false)
const editModalVisible = ref(false)
const editingUser = ref<UserInfo | null>(null)

// 使用computed优化分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条记录`
})

// 使用computed属性优化表格列定义
const columns = computed(() => [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '真实姓名',
    dataIndex: 'real_name',
    key: 'real_name'
  },
  {
    title: '角色',
    key: 'role'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '状态',
    key: 'status'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at'
  },
  {
    title: '操作',
    key: 'actions',
    width: 200
  }
])

// 获取角色名称的函数
const getRoleName = (role: string): string => {
  return ROLE_CONFIG[role as UserRole]?.name || role
}

// 获取角色颜色的函数
const getRoleColor = (role: string): string => {
  return ROLE_CONFIG[role as UserRole]?.color || 'default'
}

onMounted(() => {
  loadUsers()
})

// 加载用户数据
const loadUsers = async (): Promise<void> => {
  loading.value = true
  try {
    await userStore.fetchUsers()
    users.value = userStore.users
    pagination.value.total = users.value.length
  } catch (error) {
    message.error('加载用户数据失败')
  } finally {
    loading.value = false
  }
}

// 显示创建用户模态框
const showCreateModal = (): void => {
  createModalVisible.value = true
}

// 设置创建模态框可见状态
const setCreateModalVisible = (open: boolean): void => {
  createModalVisible.value = open
}

// 设置编辑模态框可见状态
const setEditModalVisible = (open: boolean): void => {
  editModalVisible.value = open
}

// 处理编辑用户
const handleEdit = (user: UserInfo): void => {
  editingUser.value = { ...user } // 创建副本避免直接修改
  editModalVisible.value = true
}

// 处理查看用户设备
const handleViewDevices = async (user: UserInfo) => {
  const response = await deviceStroe.fetchDeviceByUser(user.id)
  router.push({
    name: 'Devices',          // 对应你在路由表里给 Device.index.vue 起的 name
    query: {
      deviceName: response.device_name,
    }
  })
  message.info(`查看用户 ${user.username} 的设备`)
}

// 处理删除用户
const handleDelete = async (user: UserInfo): Promise<void> => {
  try {
    await userStore.deleteUser(user.id)
    message.success('用户删除成功')
    notificationStore.addNotification({
      type: 'success',
      title: '用户删除成功',
      message: `已成功删除用户 ${user.username}`
    })
    await loadUsers()
  } catch (error) {
    message.error('用户删除失败')
  }
}

// 处理创建成功事件
const handleCreateSuccess = (): void => {
  createModalVisible.value = false
  loadUsers()
}

// 处理编辑成功事件
const handleEditSuccess = (): void => {
  editModalVisible.value = false
  loadUsers()
}

// 处理表格分页变化
const handleTableChange = (pag: any): void => {
  // 实际项目中应处理分页逻辑
  console.log('分页变化:', pag)
}
</script>

<style scoped>
.user-management {
  padding: 24px;
}
</style>