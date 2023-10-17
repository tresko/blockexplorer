<template>
  <ExplorerTitle :title="`Address #${route.params.address}`" />

  <Loader v-if="loading" />
  <div v-else>
    <table class="table-auto border-collapse w-full text-sm bg-white">
      <tr v-if="balance">
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Balance
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ convertBigNumberToEther(balance) }}
        </td>
      </tr>
    </table>
    <div class="mt-4">
      <NuxtLink to="/">Go to homepage</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {BigNumber} from 'alchemy-sdk'

const route = useRoute()
const alchemy = useAlchemy()

const loading = ref(true)
const balance = ref<BigNumber | null>(null)

onMounted(async () => {
  const {data} = await getBalance(route.params.address as string)
  balance.value = data.value
  loading.value = false

  alchemy.ws.on('block', blockNumber => console.log('The latest block number is', blockNumber))
})
</script>
```
