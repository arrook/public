<template>
  <a-card class="chart-card" :title="title">
    <div class="chart-container">
      <slot></slot>
    </div>
    <template v-if="$slots.extra" #extra>
      <slot name="extra"></slot>
    </template>
  </a-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style scoped>
.chart-card {
  margin-bottom: 16px;
}

.chart-container {
  /* height: 300px; */
}
</style>