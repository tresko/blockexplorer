import {Alchemy, Network} from 'alchemy-sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const settings = {
    apiKey: config.public.alchemyApiKey,
    network: Network.ETH_MAINNET,
  }

  return {
    provide: {
      alchemy: new Alchemy(settings),
    },
  }
})
