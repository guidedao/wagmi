import "@/styles/globals.css";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { WagmiConfig, createConfig, sepolia } from "wagmi";

const infuraId = "fd4ce4d1d7324ef9b6fa94984bcc8bfd";
const walletConnectProjectId = "fa3d47652eedc84834020e7540cf0ed6";

const chains = [sepolia];

const config = createConfig(
  getDefaultConfig({
    infuraId,
    walletConnectProjectId,
    appName: "liquidity-lark",
    chains,
  })
);

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
