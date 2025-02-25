"use client"
import { http, createConfig } from "wagmi";
import { mainnet, bsc, polygon, zetachain, base } from "wagmi/chains";
import {
  coinbaseWallet,
  metaMask,
  injected,
  safe,
  walletConnect,
} from "wagmi/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import dotenv from "dotenv"
dotenv.config()
const connector = getWagmiConnectorV2();

export const config = createConfig({
  chains: [mainnet, bsc, polygon, zetachain, base],
  ssr: true,
  connectors: [
    walletConnect({
      projectId: `${process.env.WAGMI_KEY}`,
    }),
    coinbaseWallet({
      appName: "EddyFinance",
    }),
    connector(),
    metaMask(),
    injected(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [zetachain.id]: http(),
    [base.id]: http(),
  },
});
