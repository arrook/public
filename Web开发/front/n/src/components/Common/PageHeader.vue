<template>
  <div class="page-header">
    <div class="header-content">
      <div class="header-title">
        <h2>{{ title }}</h2>
        <p v-if="subTitle" class="sub-title">{{ subTitle }}</p>
      </div>
      <div class="header-extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div v-if="$slots.content" class="header-content-slot">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subTitle?: string
}

defineProps<Props>()
</script>

<style scoped>
.page-header {
  margin-bottom: 16px;
  padding: 16px 24px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-title h2 {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
}

.sub-title {
  margin: 4px 0 0 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.5715;
}

.header-extra {
  display: flex;
  gap: 8px;
  align-items: center;
}

.header-content-slot {
  margin-top: 16px;
}
</style>