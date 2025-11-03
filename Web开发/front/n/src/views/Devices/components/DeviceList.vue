<template>
  <div class="device-list">
    <a-table
      :columns="columns"
      :data-source="devices"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'device_name'">
          <span class="device-name">
            <desktop-outlined />
            {{ record.device_name }}
          </span>
        </template>
        
        <template v-else-if="column.key === 'status'">
          <a-tag :color="record.is_online ? 'green' : 'red'">
            {{ record.is_online ? '在线' : '离线' }}
          </a-tag>
        </template>
        
        <template v-else-if="column.key === 'created_at'">
          {{ formatTime(record.created_at) }}
        </template>
        
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-button size="small" @click="emit('view', record)">查看</a-button>
            <a-button size="small" @click="emit('edit', record)">编辑</a-button>
            <a-popconfirm
              title="确定删除这个设备吗？"
              @confirm="emit('delete', record)"
            >
              <a-button size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DesktopOutlined } from '@ant-design/icons-vue'
import type { DeviceInfo } from '@/types/device'
import { formatTime } from '@/utils/format'

interface Props {
  devices: DeviceInfo[]
  loading: boolean
}

interface Emits {
  (e: 'view', device: DeviceInfo): void
  (e: 'edit', device: DeviceInfo): void
  (e: 'delete', device: DeviceInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

const columns = [
  {
    title: '设备名称',
    dataIndex: 'device_name',
    key: 'device_name',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'created_at',
    width: 200,
  },
  {
    title: '最后更新',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 200,
    customRender: ({ text }: { text: string }) => formatTime(text)
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
  },
]

const handleTableChange = (pag: any) => {
  pagination.value = { ...pagination.value, ...pag }
}
</script>

<style scoped>
.device-list {
  background: #fff;
}

.device-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
</style>