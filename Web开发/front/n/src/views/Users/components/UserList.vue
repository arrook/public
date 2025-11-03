<template>
  <a-table
    :columns="columns"
    :data-source="users"
    :loading="loading"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'actions'">
        <a-space>
          <a-button size="small" @click="emit('edit', record)">编辑</a-button>
          <a-popconfirm
            title="确定删除这个用户吗？"
            @confirm="emit('delete', record)"
          >
            <a-button size="small" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfo } from '@/types/auth'
import { formatTime } from '@/utils/format'

interface Props {
  users: UserInfo[]
  loading: boolean
}

interface Emits {
  (e: 'edit', user: UserInfo): void
  (e: 'delete', user: UserInfo): void
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
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
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