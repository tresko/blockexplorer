<template>
  <h1 class="py-8 text-3xl font-bold tracking-tight text-gray-900">
    {{ props.title }}
  </h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
