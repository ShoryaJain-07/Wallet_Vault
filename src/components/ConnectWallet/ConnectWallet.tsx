import {
  useWeb3ModalTheme,
  createWeb3Modal,
  defaultConfig,
} from "web3modal-web3js/react";


const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
];

const web3Config = defaultConfig({
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal Laboratory",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  defaultChainId: 1,
  rpcUrl: "https://cloudflare-eth.com",
});

export const modal=createWeb3Modal({
  web3Config,
  chains,
  projectId,
  enableAnalytics: true,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
});

export const ConnectWallet=()=> {
    const { themeMode, setThemeMode } = useWeb3ModalTheme();
    setThemeMode('dark')
  return (
    <>
      <w3m-button />
      
    </>
  );
}
