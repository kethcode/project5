import { configureChains, createClient } from "wagmi";
import { optimismGoerli, goerli, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider, webSocketProvider } = configureChains(
  [
    optimismGoerli,
    mainnet,
    ...(import.meta.env?.MODE === "development" ? [goerli] : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.VITE_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ]
);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectLegacyConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
