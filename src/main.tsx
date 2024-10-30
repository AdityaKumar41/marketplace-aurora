import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  AvatarComponent,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { auroraTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [auroraTestnet],
  [publicProvider()]
);

const metadata = {
  appName: "Farmer-Marketplace",
  learnMoreUrl: "https://reown.com/appkit",
};

const { connectors } = getDefaultWallets({
  appName: "Farmer-Marketplace",
  projectId: `d5d80d9e0a6195ffa06190a916a11629`,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme()}
          appInfo={metadata}
          avatar={() => (
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg"
              alt="avatar"
            />
          )}
        >
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
