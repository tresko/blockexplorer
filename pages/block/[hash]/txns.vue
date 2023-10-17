<template>
  <ExplorerTitle :title="`Block #${route.params.hash} Transactions`" />
  <Loader v-if="loading" />
  <div v-else>
    <DataTable
      :value="transactions"
      paginator
      :rows="25"
      :rowsPerPageOptions="[25, 50, 100]"
      tableStyle="min-width: 50rem"
    >
      <Column field="hash" header="Transaction Hash">
        <template #body="slotProps">
          <ShortTransaction :transactionHash="slotProps.data.hash" />
        </template>
      </Column>
      <Column field="from" header="From">
        <template #body="slotProps"> <ShortAddress :address="slotProps.data.from" /> </template
      ></Column>
      <Column field="to" header="To">
        <template #body="slotProps">
          <ShortAddress :address="slotProps.data.to" />
        </template>
      </Column>
      <Column field="value" header="Value">
        <template #body="slotProps">
          {{ convertBigNumberToEther(slotProps.data.value) }}
        </template>
      </Column>
    </DataTable>
    <div class="my-4">
      <NuxtLink to="/">Go to homepage</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {TransactionResponse, BlockWithTransactions} from 'alchemy-sdk'
const route = useRoute()

const loading = ref(true)
const blockData = ref<BlockWithTransactions | null>(null)
const transactions = ref<TransactionResponse[]>([])

onMounted(async () => {
  const {data} = await getBlockWithTransactions(parseInt(route.params.hash as string, 10) as number)
  blockData.value = data.value
  if (blockData.value) {
    transactions.value = blockData.value.transactions
    console.log({...transactions.value[0]})
  }
  loading.value = false
})
</script>
