<template>
  <a-form
    :model="formState"
    :layout="layout"
    class="search-form"
    @finish="onSearch"
  >
    <a-row :gutter="24">
      <slot></slot>
      
      <a-col :span="layout === 'inline' ? undefined : 24" style="text-align: right">
        <a-form-item>
          <a-space>
            <a-button @click="onReset">重置</a-button>
            <a-button type="primary" html-type="submit">查询</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  layout?: 'horizontal' | 'vertical' | 'inline'
}

withDefaults(defineProps<Props>(), {
  layout: 'inline',
})

const emit = defineEmits<{
  search: [formData: any]
  reset: []
}>()

const formState = reactive<Record<string, any>>({})

const onSearch = (values: any) => {
  emit('search', values)
}

const onReset = () => {
  Object.keys(formState).forEach(key => {
    formState[key] = undefined
  })
  emit('reset')
}
</script>

<style scoped>
.search-form {
  margin-bottom: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
}
</style>