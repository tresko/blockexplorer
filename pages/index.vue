<template>
  <ExplorerTitle title="Dashboard" />
  <Loader class="md:flex md:gap-4" v-if="loading" />
  <div class="md:flex md:gap-4" v-else>
    <table class="border-collapse table-auto w-full text-sm">
      <thead class="bg-white dark:bg-slate-800">
        <tr>
          <th
            class="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left"
            colspan="3"
          >
            Latest blocks
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="block in blocks" :key="block.hash">
          <td
            class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
          >
            <div>
              <NuxtLink :to="`/block/${block.number}`">{{ block.number }}</NuxtLink>
            </div>
            <div>
              {{ getRelativeDate(fromUnixTimestampToDate(block.timestamp)) }}
            </div>
          </td>
          <td
            class="border-b border-slate-200 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
          >
            <NuxtLink :to="`/block/${block.number}/txns`">
              {{ block.transactions.length }} txns</NuxtLink
            >
          </td>
          <td
            class="border-b border-slate-200 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"
          >
            1961
          </td>
        </tr>
      </tbody>
      <tfoot class="bg-white dark:bg-slate-800">
        <tr>
          <th
            colspan="3"
            class="text-center border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 bg-zinc-50"
          >
            More blocks >
          </th>
        </tr>
      </tfoot>
    </table>

    <table class="mt-4 md:mt-0 border-collapse table-auto w-full text-sm">
      <thead class="bg-white dark:bg-slate-800">
        <tr>
          <th
            class="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left"
            colspan="3"
          >
            Latest transactions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="tx in transactions" :key="tx.hash">
          <td
            class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
          >
            <div>
              <ShortTransaction :transactionHash="tx.hash" />
            </div>
            <div>
              {{ getRelativeDate(fromUnixTimestampToDate(blocks[0].timestamp)) }}
            </div>
          </td>
          <td
            class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
          >
            <div>
              From
              <ShortAddress :address="tx.from" />
            </div>
            <div>
              To
              <ShortAddress :address="tx.to" />
            </div>
          </td>
          <td
            class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"
          >
            {{ convertBigNumberToEther(tx.value) }}
          </td>
        </tr>
      </tbody>
      <tfoot class="bg-white dark:bg-slate-800">
        <tr>
          <th
            colspan="3"
            class="text-center border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 bg-zinc-50"
          >
            More transactions >
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {Block, BlockWithTransactions, TransactionResponse} from 'alchemy-sdk'
const alchemy = useAlchemy()

type HomepageBlock = Block | BlockWithTransactions
const loading = ref(true)
const blocks = ref([]) as Ref<HomepageBlock[]>
const transactions = ref([]) as Ref<TransactionResponse[]>

async function fetchData(blockNumber: number) {
  const TABLE_LIMIT = 5

  const blockNumberStart = blockNumber - TABLE_LIMIT + 1 >= 0 ? blockNumber - TABLE_LIMIT + 1 : 0
  const blocksPromisesArray = []

  for (let i = blockNumber; i >= blockNumberStart; i--) {
    if (i === blockNumber) {
      blocksPromisesArray.push(getBlockWithTransactions(i))
    } else {
      blocksPromisesArray.push(getBlock(i))
    }
  }

  const data = await Promise.all(blocksPromisesArray)
  const blocksArray: HomepageBlock[] = []
  data.forEach(block => {
    if (!block) {
      return
    }

    blocksArray.push(block.data.value as HomepageBlock)
  })
  blocks.value = blocksArray
  transactions.value = blocks.value[0].transactions.splice(0, TABLE_LIMIT) as TransactionResponse[]
}

onMounted(async () => {
  const {data: blockNumber} = await getLatestBlockNumber()
  if (!blockNumber.value) {
    return
  }
  await fetchData(blockNumber.value)
  loading.value = false
  alchemy.ws.on('block', fetchData)
})

onBeforeUnmount(() => {
  alchemy.ws.off('block', fetchData)
})
</script>
