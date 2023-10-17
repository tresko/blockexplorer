<template>
  <NuxtLink :to="`/address/${props.address}`">{{ transformEthAddress(props.address) }}</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string
}>()

function transformEthAddress(address: string) {
  const firstPart = address.slice(0, 7)
  const lastPart = address.slice(-5)

  return `${firstPart}...${lastPart}`
}
</script>
