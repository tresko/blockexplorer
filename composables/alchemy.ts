import {Utils} from 'alchemy-sdk'
import type {
  Block,
  BlockWithTransactions,
  BigNumber,
  BlockTag,
  TransactionResponse,
} from 'alchemy-sdk'

export function useAlchemy() {
  const {$alchemy} = useNuxtApp()
  return $alchemy
}

export interface ApiCallResult<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  loading: Ref<boolean>
  fetch: (...args: any[]) => Promise<void>
}

function createApiCall<T>(fn: (...args: any[]) => Promise<T>): ApiCallResult<T> {
  const loading = ref<boolean>(false)
  const error = ref(null) as Ref<null | string>
  const data = ref(null) as Ref<T | null>

  async function fetch(...args: any[]): Promise<void> {
    loading.value = true
    try {
      data.value = (await fn(...args)) as T
    } catch (e) {
      error.value = e as string
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    fetch,
  }
}

export async function getLatestBlockNumber(): Promise<ApiCallResult<number>> {
  const {data, loading, error, fetch} = createApiCall<number>(
    async () => await useAlchemy().core.getBlockNumber(),
  )

  await fetch()

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export async function getBlock(blockNumber: BlockTag): Promise<ApiCallResult<Block>> {
  const {data, loading, error, fetch} = createApiCall<Block>(
    async () => await useAlchemy().core.getBlock(blockNumber),
  )

  await fetch()

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export async function getTransaction(
  transactionHash: string | Promise<string>,
): Promise<ApiCallResult<TransactionResponse>> {
  const {data, loading, error, fetch} = createApiCall<TransactionResponse | null>(
    async () => await useAlchemy().transact.getTransaction(transactionHash),
  )

  await fetch()

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export async function getBlockWithTransactions(
  blockNumber: number,
): Promise<ApiCallResult<BlockWithTransactions>> {
  const {data, loading, error, fetch} = createApiCall<BlockWithTransactions>(
    async () => await useAlchemy().core.getBlockWithTransactions(blockNumber),
  )

  await fetch()

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export async function getBalance(address: string): Promise<ApiCallResult<BigNumber>> {
  const {data, loading, error, fetch} = createApiCall<BigNumber>(
    async () => await useAlchemy().core.getBalance(address),
  )

  await fetch()

  return {
    data,
    loading,
    error,
    fetch,
  }
}

export function convertBigNumberToEther(bn: BigNumber): string {
  return `${Utils.formatEther(bn.toString())} ETH`
}
