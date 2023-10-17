<template>
  <ExplorerTitle :title="`Block #${route.params.hash}`" />
  <Loader v-if="loading" />
  <table v-else class="table-auto border-collapse w-full text-sm bg-white">
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Block
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ blockData?.number }}
      </td>
    </tr>
    <tr v-if="blockData?.timestamp">
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Timestamp
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ getRelativeDate(fromUnixTimestampToDate(blockData.timestamp)) }} -
        {{ fromUnixTimestampToDate(blockData.timestamp) }}
      </td>
    </tr>
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Transactions
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        <NuxtLink :to="`/block/${blockData?.number}/txns`"
          >{{ blockData?.transactions?.length }} transactions</NuxtLink
        >
      </td>
    </tr>
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Miner
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ blockData?.miner }}
      </td>
    </tr>
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Difficulty
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ blockData?.difficulty }}
      </td>
    </tr>
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Gas Used
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ blockData?.gasUsed?.toNumber()?.toLocaleString() }}
      </td>
    </tr>
    <tr>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        Gas Limit
      </td>
      <td
        class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        {{ blockData?.gasLimit?.toNumber()?.toLocaleString() }}
      </td>
    </tr>
  </table>
  <div class="mt-4">
    <NuxtLink to="/">Go to homepage</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type {Block, BlockTag} from 'alchemy-sdk'
const route = useRoute()

const loading = ref(true)
const blockData = ref<Block | null>(null)

onMounted(async () => {
  const {data} = await getBlock(route.params.hash as BlockTag)
  blockData.value = data.value
  loading.value = false
})
</script>
