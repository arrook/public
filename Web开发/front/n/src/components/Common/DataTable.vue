<template>
  <div class="data-table">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      :row-selection="rowSelection"
      :scroll="{ x: 800 }"
      @change="handleTableChange"
    >
      <template #headerCell="{ column }">
        <span>{{ column.title }}</span>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
        
        <slot
          v-else-if="column.key && $slots[column.key]"
          :name="column.key"
          :record="record"
          :column="column"
          :index="index"
        ></slot>
        
        <template v-else-if="column.key && record[column.key]">
          {{ record[column.key] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  columns: any[]
  dataSource: any[]
  loading?: boolean
  pagination?: any
  rowSelection?: any
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: () => ({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条`,
  }),
})

const emit = defineEmits<{
  change: [pagination: any, filters: any, sorter: any]
  selectionChange: [selectedRowKeys: any[], selectedRows: any[]]
}>()

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  emit('change', pagination, filters, sorter)
}

const rowSelection = computed(() => {
  if (!props.rowSelection) return undefined
  
  return {
    ...props.rowSelection,
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      emit('selectionChange', selectedRowKeys, selectedRows)
    },
  }
})
</script>

<style scoped>
.data-table {
  background: #fff;
  border-radius: 6px;
}
</style>