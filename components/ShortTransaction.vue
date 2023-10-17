<template>
  <NuxtLink :to="`/tx/${props.transactionHash}`">
    {{ props.transactionHash.substring(0, 10) }}...
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  transactionHash: string
}>()
</script>
