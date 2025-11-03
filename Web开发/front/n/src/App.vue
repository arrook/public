<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const locale = computed(() => {
  return appStore.language === 'zh-CN' ? zhCN : enUS
})
</script>

<style lang="scss">
@use '@/styles/index.scss';
@use '@/styles/antd.scss';
</style>