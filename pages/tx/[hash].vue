<template>
  <ExplorerTitle title="Transaction Details" />

  <Loader v-if="loading" />
  <div v-else-if="!loading && transactionData && blockData">
    <table class="table-auto border-collapse w-full text-sm bg-white">
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Transaction Hash
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ transactionData.hash }}
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Status
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ transactionData.blockNumber ? 'Success' : 'Pending' }}
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Block
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          <template v-if="transactionData.blockNumber">
            <NuxtLink :to="`/block/${transactionData.blockNumber}`">{{
              transactionData.blockNumber
            }}</NuxtLink>
          </template>
          <template v-else>/</template>
        </td>
      </tr>
      <tr>
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
          From
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          <NuxtLink :to="`/address/${transactionData.from}`">{{ transactionData.from }}</NuxtLink>
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          To
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          <NuxtLink :to="`/address/${transactionData.to}`">{{ transactionData.to }}</NuxtLink>
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Confirmations
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ transactionData.confirmations }}
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Value
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ convertBigNumberToEther(transactionData.value) }}
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Fee
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ convertBigNumberToEther(transactionData.fee) }}
        </td>
      </tr>
      <tr>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          Gas Price
        </td>
        <td
          class="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          {{ transactionData.gasPrice?.toNumber()?.toLocaleString() }} Gwei ({{
            convertBigNumberToEther(transactionData.gasPrice)
          }})
        </td>
      </tr>
    </table>
    <div class="mt-4">
      <NuxtLink to="/">Go to homepage</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const transactionData = ref()
const blockData = ref()
const loading = ref(true)

onMounted(async () => {
  const {data: transactionDataResponse} = await getTransaction(route.params.hash)
  const {data: blockDataResponse} = await getBlock(transactionDataResponse.value.blockNumber)
  blockData.value = blockDataResponse.value
  transactionData.value = transactionDataResponse.value
  transactionData.value.fee = transactionData.value.gasLimit.mul(transactionData.value.gasPrice)

  loading.value = false
})
</script>
